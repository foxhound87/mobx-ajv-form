import { action, observable, computed, isObservableArray, toJS, asMap } from 'mobx';
import _ from 'lodash';

import fieldInitializer from './FieldInit';
import fieldParser from './FieldParser';
import fieldHelpers from './FieldHelpers';

export default class Field {

  fields = asMap({});
  state;
  path;
  key;
  name;

  $rules;
  $validate;
  $related;

  @observable $label;
  @observable $value;
  @observable $default;
  @observable $initial = undefined;
  @observable $disabled = false;
  @observable $focus = false;
  @observable $touched = false;

  @observable errorSync = null;
  @observable errorAsync = null;

  @observable showError = true;

  @observable validationErrorStack = [];
  @observable validationFunctionsData = [];
  @observable validationAsyncData = {};

  constructor(key, path, field = {}, state, props = {}, update = false) {
    this.state = state;

    this.extend();
    this.setupField(key, path, field, props, update);
    this.initNestedFields(field, update);
  }

  extend() {
    Object.assign(this, fieldParser(this));
    Object.assign(this, fieldHelpers(this));
    Object.assign(this, fieldInitializer(this));
  }

  @action
  initNestedFields(field, update) {
    const fields = _.isNil(field) ? '' : field.fields;
    this.initFields({ fields }, update);
  }

  @action
  setupField($key, $path, $field, {
    $value = null,
    $label = null,
    $default = null,
    $disabled = null,
    $related = null,
    $validate = null,
    $rules = null,
  } = {}, update) {
    this.key = $key;
    this.path = $path;

    if (_.isNil($field)) $field = ''; // eslint-disable-line

    if (
    _.isBoolean($field) ||
    _.isArray($field) ||
    _.isString($field) ||
    _.isNumber($field)) {
      /* The field IS the value here */
      this.name = $key;
      this.$initial = this.parseInitialValue($field, $value);
      this.$default = update ? '' : this.parseDefaultValue($field.default, $default);
      this.$value = this.$initial;
      this.$label = $label || $key;
      this.$rules = $rules || null;
      this.$disabled = $disabled || false;
      this.$related = $related || [];
      this.$validate = toJS($validate || null);
      return;
    }

    if (_.isObject($field)) {
      const { name, label, disabled, rules, validate, related } = $field;
      this.$initial = this.parseInitialValue($field.value, $value);
      this.$default = update ? '' : this.parseDefaultValue($field.default, $default);
      this.name = name || $key;
      this.$value = this.$initial;
      this.$label = $label || label || this.name;
      this.$rules = $rules || rules || null;
      this.$disabled = $disabled || disabled || false;
      this.$related = $related || related || [];
      this.$validate = toJS($validate || validate || null);
      return;
    }
  }

  parseInitialValue(unified, separated) {
    if (separated === 0) return separated;
    const $value = separated || unified;
    // handle boolean
    if (_.isBoolean($value)) return $value;
    // handle others types
    return !_.isNil($value) ? $value : '';
  }

  parseDefaultValue(initial, separated) {
    if (separated === 0) return separated;
    const $value = separated || initial;
    return !_.isNil($value) ? $value : this.$initial;
  }

  /* ------------------------------------------------------------------ */
  /* INDEX / KEYS */

  hasIntKeys() {
    return _.every(this.parseIntKeys(), _.isInteger);
  }

  parseIntKeys() {
    return _.map(this.fields.keys(), _.ary(parseInt, 1));
  }

  maxKey() {
    const max = _.max(this.parseIntKeys());
    return _.isUndefined(max) ? 0 : max;
  }

  /* ------------------------------------------------------------------ */
  /* ACTIONS */

  /**
    Add Field
  */
  @action
  add(path = null) {
  // add(path = null, val = null) {
    // if (path && val) {
    //   // path is the key here
    //   console.log('this.path', this.path);
    //   this.initField(path, [this.path, path].join('.'));
    //   return;
    // }

    if (_.isString(path)) {
      this.select(path).add();
      return;
    }

    const $n = this.maxKey() + 1;
    this.initField($n, [this.path, $n].join('.'));
  }

  /**
    Del Field
  */
  @action
  del(key = null) {
    this.fields.delete(key);
  }

  @action
  setInvalid(message, async = false) {
    if (async === true) {
      this.errorAsync = message;
      return;
    }

    if (_.isArray(message)) {
      this.validationErrorStack = message;
      return;
    }

    this.validationErrorStack.unshift(message);
  }

  @action
  setValidationAsyncData(obj = {}) {
    this.validationAsyncData = obj;
  }

  @action
  resetValidation(deep = false) {
    this.showError = true;
    this.errorSync = null;
    this.errorAsync = null;
    this.validationAsyncData = {};
    this.validationFunctionsData = [];
    this.validationErrorStack = [];

    // recursive resetValidation
    if (deep) this.deepAction('resetValidation', this.fields);
  }

  @action
  clear(deep = true) {
    this.resetValidation();
    if (isObservableArray(this.$value)) this.$value = [];
    if (_.isBoolean(this.$value)) this.$value = false;
    if (_.isNumber(this.$value)) this.$value = 0;
    if (_.isString(this.$value)) this.$value = '';

    // recursive clear fields
    if (deep && this.fields.size) {
      this.deepAction('clear', this.fields);
    }
  }

  @action
  reset(deep = true) {
    const useDefaultValue = (this.$default !== this.$initial);
    if (useDefaultValue) this.value = this.$default;
    if (!useDefaultValue) this.value = this.$initial;

    // recursive clear fields
    if (deep && this.fields.size) {
      this.deepAction('reset', this.fields);
    }
  }

  @action
  showErrors(showErrors = true) {
    if (showErrors === false) {
      this.showError = false;
      return;
    }

    this.errorSync = _.head(this.validationErrorStack);
    this.validationErrorStack = [];
  }

  @action
  showAsyncErrors() {
    if (this.validationAsyncData.valid === false) {
      this.errorAsync = this.validationAsyncData.message;
      return;
    }
    this.errorAsync = null;
  }

  /* ------------------------------------------------------------------ */
  /* COMPUTED */

  @computed
  get incremental() {
    return (this.hasIntKeys() && this.fields.size);
  }

  @computed
  get value() {
    if (this.incremental) {
      return this.get('value');
    }

    if (isObservableArray(this.$value)) {
      return [].slice.call(this.$value);
    }

    return this.$value;
  }

  set value(newVal) {
    if (this.$value === newVal) return;
    // handle numbers
    if (_.isNumber(this.$initial)) {
      const numericVal = _.toNumber(newVal);
      if (!_.isString(numericVal) && !_.isNaN(numericVal)) {
        this.$value = numericVal;
        return;
      }
    }
    // handle other types
    this.$value = newVal;
  }

  @computed
  get label() {
    return this.$label;
  }

  @computed
  get related() {
    return this.$related;
  }

  @computed
  get disabled() {
    return this.$disabled;
  }

  @computed
  get default() {
    return this.$default;
  }

  @computed
  get initial() {
    return this.$initial;
  }

  @computed
  get focus() {
    return this.$focus;
  }

  @computed
  get touched() {
    return this.$touched;
  }

  @computed
  get rules() {
    return this.$rules;
  }

  @computed
  get validate() {
    return this.$validate;
  }

  @computed
  get error() {
    if (this.showError === false) return null;
    return (this.errorAsync || this.errorSync);
  }

  @computed
  get hasError() {
    return ((this.validationAsyncData.valid === false)
      && !_.isEmpty(this.validationAsyncData))
      || !_.isEmpty(this.validationErrorStack)
      || _.isString(this.errorAsync)
      || _.isString(this.errorSync);
  }

  @computed
  get isValid() {
    return !this.hasError;
  }

  @computed
  get isDirty() {
    return !_.isEqual(this.$default, this.value);
  }

  @computed
  get isPristine() {
    return _.isEqual(this.$default, this.value);
  }

  @computed
  get isDefault() {
    return _.isEqual(this.$default, this.value);
  }

  @computed
  get isEmpty() {
    if (_.isNumber(this.$value)) return false;
    if (_.isBoolean(this.$value)) return !this.$value;
    return _.isEmpty(this.$value);
  }

  /* ------------------------------------------------------------------ */
  /* EVENTS */

  sync = (e) => {
    // assume "e" is the value
    if (_.isNil(e.target)) {
      this.value = e;
      return;
    }

    // checkbox
    if (_.isBoolean(this.$value) && _.isBoolean(e.target.checked)) {
      this.value = e.target.checked;
      return;
    }

    // text
    this.value = e.target.value;
    return;
  };

  onChange = (e) => {
    this.sync(e);
  };

  onToggle = (e) => {
    this.sync(e);
  }

  onFocus = action(() => {
    this.$focus = true;
    this.$touched = true;
  });

  onBlur = action(() => {
    this.$focus = false;
  });


  /**
    Event: On Clear
  */
  onClear = (e) => {
    e.preventDefault();
    this.clear(true);
  };

  /**
    Event: On Reset
  */
  onReset = (e) => {
    e.preventDefault();
    this.reset(true);
  };

  /**
    Event: On Add
  */
  onAdd = (e, key) => {
    e.preventDefault();
    this.add(key);
  };

  /**
    Event: On Del
  */
  onDel = (e, key) => {
    e.preventDefault();
    this.del(key);
  };
}
