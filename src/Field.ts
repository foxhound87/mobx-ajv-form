import { observable, observe, action, computed, isObservableArray, toJS
  , untracked,
  ObservableMap,
  IAction} from 'mobx';
// we need this for casting mobx to any for adapting to different versions
// tslint:disable-next-line:no-duplicate-imports
import * as mobx from 'mobx';

import * as _ from 'lodash';
import Base from './Base';

import {
  $try,
  $hasFiles,
  $isBool,
  $isEvent } from './utils';

import {
  parseInput,
  defaultClearValue } from './parser';

const mobxAny = mobx as any;

const setupFieldProps = (instance, props, data) =>
  Object.assign(instance, {
    $value: instance.$initial,
    $label: props.$label || data.label || '',
    $placeholder: props.$placeholder || data.placeholder || '',
    $disabled: props.$disabled || data.disabled || false,
    $bindings: props.$bindings || data.bindings || 'default',
    $related: props.$related || data.related || [],
    $validators: toJS(props.$validators || data.validators || null),
    $validatedWith: props.$validatedWith || data.validatedWith || 'value',
    $rules: props.$rules || data.rules || null,
    $observers: props.$observers || data.observers || null,
    $interceptors: props.$interceptors || data.interceptors || null,
    $extra: props.$extra || data.extra || null,
    $options: props.$options || data.options || {},
    $hooks: props.$hooks || data.hooks || {},
    $handlers: props.$handlers || data.handlers || {},
  });

const setupDefaultProp = (instance, data, props, update, {
  isEmptyArray, checkArray,
}) => parseInput(instance.$input, {
  isEmptyArray,
  type: instance.type,
  unified: update ? '' : checkArray(data.default),
  separated: checkArray(props.$default),
  initial: checkArray(instance.$initial),
});

export default class Field extends Base {

  fields:ObservableMap<any> = observable.map ?
    observable.map({}) :
    mobxAny.asMap({});

  hasInitialNestedFields = false;
  incremental = false;

  id;
  key;
  name;
  path;
  state;

  $observers;
  $interceptors;

  $hooks = {};
  $handlers = {};

  $input = $ => $;
  $output = $ => $;

  @observable $options;
  @observable $value;
  @observable $type;
  @observable $label;
  @observable $placeholder;
  @observable $default;
  @observable $initial;
  @observable $bindings;
  @observable $extra;
  @observable $related;
  @observable $validatedWith;

  @observable $validators;
  @observable $rules;

  @observable $disabled = false;
  @observable $focused = false;
  @observable $touched = false;
  @observable $changed = false;

  @observable $submitting = false;
  @observable $validating = false;
  @observable $clearing = false;
  @observable $resetting = false;

  @observable autoFocus = false;
  @observable showError = false;

  @observable errorSync = null;
  @observable errorAsync = null;

  @observable validationErrorStack = [];
  @observable validationFunctionsData = [];
  @observable validationAsyncData:any = {};

  @observable files;

  debouncedValidation:any;
  disposeValidationOnBlur:any;
  disposeValidationOnChange: any;

  constructor({
    key, path, data = {}, props = {}, update = false, state,
  }) {
    super();

    this.state = state;

    this.setupField(key, path, data, props, update);
    this.checkDVRValidationPlugin();
    this.initNestedFields(data, update);

    this.incremental = (this.hasIncrementalKeys !== 0);

    this.debouncedValidation = _.debounce(
      this.validate,
      this.state.options.get('validationDebounceWait', this),
      this.state.options.get('validationDebounceOptions', this),
    );

    this.observeValidationOnBlur();
    this.observeValidationOnChange();

    this.initMOBXEvent('observers');
    this.initMOBXEvent('interceptors');

    this.execHook('onInit');
  }

  /* ------------------------------------------------------------------ */
  /* COMPUTED */

  @computed get checkValidationErrors() {
    return ((this.validationAsyncData.valid === false)
      && !_.isEmpty(this.validationAsyncData))
      || !_.isEmpty(this.validationErrorStack)
      || _.isString(this.errorAsync)
      || _.isString(this.errorSync);
  }

  @computed get checked() {
    return (this.type === 'checkbox') ? this.value : undefined;
  }

  @computed get value() {
    return this.getComputedProp('value');
  }

  set value(newVal) {
    if (this.$value === newVal) return;
    // handle numbers
    if (this.state.options.get('autoParseNumbers', this) === true) {
      if (_.isNumber(this.$initial)) {
        if (new RegExp('^-?\\d+(,\\d+)*(\\.\\d+([eE]\\d+)?)?$', 'g').exec(newVal)) {
          this.$value = _.toNumber(newVal);
          return;
        }
      }
    }
    // handle parse value
    this.$value = newVal;
  }

  @computed get initial() {
    return this.getComputedProp('initial');
  }

  set initial(val) {
    this.$initial = parseInput(this.$input, { separated: val });
  }

  @computed get default() {
    return this.getComputedProp('default');
  }

  set default(val) {
    this.$default = parseInput(this.$input, { separated: val });
  }

  @computed get actionRunning() {
    return (this.submitting || this.clearing || this.resetting);
  }

  @computed get submitting() {
    return toJS(this.$submitting);
  }

  @computed get validating() {
    return toJS(this.$validating);
  }

  @computed get type() {
    return toJS(this.$type);
  }

  @computed get label() {
    return toJS(this.$label);
  }

  @computed get placeholder() {
    return toJS(this.$placeholder);
  }

  @computed get extra() {
    return toJS(this.$extra);
  }

  @computed get options() {
    return toJS(this.$options);
  }

  @computed get bindings() {
    return toJS(this.$bindings);
  }

  @computed get related() {
    return toJS(this.$related);
  }

  @computed get disabled() {
    return toJS(this.$disabled);
  }

  @computed get rules() {
    return toJS(this.$rules);
  }

  @computed get validators() {
    return toJS(this.$validators);
  }

  @computed get validatedValue() {
    return this[this.$validatedWith];
  }

  @computed get error() {
    // tslint:disable-next-line:no-boolean-literal-compare
    if (this.showError === false) return null;
    return (this.errorAsync || this.errorSync || null);
  }

  @computed get hasError() {
    return this.checkValidationErrors
      || this.check('hasError', true);
  }

  @computed get isValid() {
    return !this.checkValidationErrors
      && this.check('isValid', true);
  }

  @computed get isDirty() {
    return this.hasNestedFields
      ? this.check('isDirty', true)
      : !_.isEqual(this.$default, this.value);
  }

  @computed get isPristine() {
    return this.hasNestedFields
      ? this.check('isPristine', true)
      : _.isEqual(this.$default, this.value);
  }

  @computed get isDefault() {
    return this.hasNestedFields
      ? this.check('isDefault', true)
      : _.isEqual(this.$default, this.value);
  }

  @computed get resetting() {
    return this.hasNestedFields
      ? this.check('resetting', true)
      : this.$resetting;
  }

  @computed get clearing() {
    return this.hasNestedFields
      ? this.check('clearing', true)
      : this.$clearing;
  }

  @computed get isEmpty() {
    if (this.hasNestedFields) return this.check('isEmpty', true);
    if (_.isBoolean(this.value)) return !!this.$value;
    if (_.isNumber(this.value)) return false;
    if (_.isDate(this.value)) return false;
    return _.isEmpty(this.value);
  }

  @computed get focused() {
    return this.hasNestedFields
      ? this.check('focused', true)
      : this.$focused;
  }

  @computed get touched() {
    return this.hasNestedFields
      ? this.check('touched', true)
      : this.$touched;
  }

  @computed get changed() {
    return this.hasNestedFields
      ? this.check('changed', true)
      : this.$changed;
  }

  /* ------------------------------------------------------------------ */
  /* EVENTS HANDLERS */

  sync:IAction = action((e:any, v = null) => {
    this.$changed = true;

    const $get = $ => $isBool($, this.value)
      ? $.target.checked
      : $.target.value;

    // assume "v" or "e" are the values
    if (_.isNil(e) || _.isNil(e.target)) {
      if (!_.isNil(v) && !_.isNil(v.target)) {
        // tslint:disable-next-line:no-parameter-reassignment
        v = $get(v);
      }

      this.value = $try(e, v);
      return;
    }

    if (!_.isNil(e.target)) {
      this.value = $get(e);
      return;
    }

    this.value = e;
  });

  onChange = (...args) => (this.type === 'file')
    ? this.onDrop(...args)
    : this.execHandler('onChange', args, this.sync)

  onToggle = (...args) =>
    this.execHandler('onToggle', args, this.sync)

  onBlur = (...args) =>
    this.execHandler('onBlur', args,
                     action(() => {
                       this.$focused = false;
                     }))

  onFocus = (...args) =>
    this.execHandler('onFocus', args,
                     action(() => {
                       this.$focused = true;
                       this.$touched = true;
                     }))

  onDrop = (...args) =>
    this.execHandler('onDrop', args,
                     action(() => {
                       const e = args[0];
                       let files = null;

                       if ($isEvent(e) && $hasFiles(e)) {
                         files = _.map(e.target.files);
                       }

                       this.files = files || args;
                     }))
 /**prototypes */

  @action
  setupField($key, $path, $data, $props, update):any {
    this.key = $key;
    this.path = $path;
    this.id = this.state.options.get('uniqueId').apply(this, [this]);
    const isEmptyArray = (_.has($data, 'fields') && _.isArray($data.fields));
    const checkArray = val => isEmptyArray ? [] : val;

    const {
      $value,
      $type,
      $input,
      $output,
    } = $props;

    // tslint:disable-next-line:no-parameter-reassignment
    if (_.isNil($data)) $data = '';

    if (_.isPlainObject($data)) {
      const {
        value,
        type,
        input,
        output,
      } = $data;

      this.name = _.toString($data.name || $key);
      this.$type = $type || type || 'text';
      this.$input = $try($input, input, this.$input);
      this.$output = $try($output, output, this.$output);

      this.$initial = parseInput(this.$input, {
        isEmptyArray,
        type: this.type,
        unified: checkArray(value),
        separated: checkArray($props.$initial),
        initial: checkArray($data.initial),
      });

      this.$default = setupDefaultProp(this, $data, $props, update, {
        isEmptyArray, checkArray,
      });

      setupFieldProps(this, $props, $data);
      return;
    }

    /* The field IS the value here */
    this.name = _.toString($key);
    this.$type = $type || 'text';
    this.$input = $try($input, this.$input);
    this.$output = $try($output, this.$output);

    this.$initial = parseInput(this.$input, {
      isEmptyArray,
      type: this.type,
      unified: checkArray($data),
      separated: checkArray($value),
    });

    this.$default = setupDefaultProp(this, $data, $props, update, {
      isEmptyArray, checkArray,
    });

    setupFieldProps(this, $props, $data);
  }

  getComputedProp(key) {
    if (this.incremental || this.hasNestedFields) {
      const $val = (key === 'value')
        ? this.get(key, false)
        : untracked(() => this.get(key, false));

      return !_.isEmpty($val) ? $val : [];
    }

    const val = this[`$${key}`];

    if (_.isArray(val) || isObservableArray(val)) {
      return [].slice.call(val);
    }

    return toJS(val);
  }

  checkDVRValidationPlugin() {
    const { drivers } = this.state.form.validator;
    if (_.isNil(drivers.dvr) && !_.isNil(this.rules)) {
      // eslint-disable-next-line
      console.warn(
        'The DVR validation rules are defined',
        'but no plugin provided (DVR). Field:',
        this.path,
      );
    }
  }

  @action
  initNestedFields(field, update) {
    const fields = _.isNil(field) ? null : field.fields;

    if (_.isArray(fields) && !_.isEmpty(fields)) {
      this.hasInitialNestedFields = true;
    }

    this.initFields({ fields }, update);
  }

  @action
  invalidate(message, async = false) {
    if (async) {
      this.errorAsync = message;
      return;
    }

    if (_.isArray(message)) {
      this.validationErrorStack = message;
      this.showErrors(true);
      return;
    }

    this.validationErrorStack.unshift(message);
    this.showErrors(true);
  }

  @action
  setValidationAsyncData(valid = false, message = '') {
    this.validationAsyncData = { valid, message };
  }

  @action
  resetValidation(deep = false) {
    this.showError = true;
    this.errorSync = null;
    this.errorAsync = null;
    this.validationAsyncData = {};
    this.validationFunctionsData = [];
    this.validationErrorStack = [];
    if (deep) this.each(field => field.resetValidation());
  }

  @action
  clear(deep = true) {
    this.$clearing = true;
    this.$touched = false;
    this.$changed = false;

    this.$value = defaultClearValue({ value: this.$value });
    this.files = undefined;

    if (deep) this.each(field => field.clear(true, false));

    this.validate({
      showErrors: this.state.options.get('showErrorsOnClear', this),
    });
  }

  @action
  reset(deep = true) {
    this.$resetting = true;
    this.$touched = false;
    this.$changed = false;

    const useDefaultValue = (this.$default !== this.$initial);
    if (useDefaultValue) this.value = this.$default;
    if (!useDefaultValue) this.value = this.$initial;
    this.files = undefined;

    if (deep) this.each(field => field.reset(true, false));

    this.validate({
      showErrors: this.state.options.get('showErrorsOnReset', this),
    });
  }

  @action
  focus() {
    // eslint-disable-next-line
    this.state.form.each(field => (field.autoFocus = false));
    this.autoFocus = true;
  }

  @action
  showErrors(show = true) {
    this.showError = show;
    this.errorSync = _.head(this.validationErrorStack);
    this.each(field => field.showErrors(show));
  }

  @action
  showAsyncErrors() {
    if (this.validationAsyncData.valid === false) {
      this.errorAsync = this.validationAsyncData.message;
      return;
    }
    this.errorAsync = null;
  }

  observeValidationOnBlur() {
    const opt = this.state.options;
    if (opt.get('validateOnBlur', this)) {
      this.disposeValidationOnBlur = observe(this, '$focused', change =>
        (change.newValue === false) &&
          this.debouncedValidation({
            showErrors: opt.get('showErrorsOnBlur', this),
          }));
    }
  }

  observeValidationOnChange() {
    const opt = this.state.options;
    if (opt.get('validateOnChange', this)) {
      this.disposeValidationOnChange = observe(this, '$value', () =>
        !this.actionRunning &&
          this.debouncedValidation({
            showErrors: opt.get('showErrorsOnChange', this),
          }));
    }
  }

  initMOBXEvent(type) {
    if (!_.isArray(this[`$${type}`])) return;

    let fn;
    if (type === 'observers') fn = this.observe;
    if (type === 'interceptors') fn = this.intercept;
    this[`$${type}`].map(obj => fn(_.omit(obj, 'path')));
  }

  bind(props = {}) {
    return this.state.bindings.load(this, this.bindings, props);
  }

}
