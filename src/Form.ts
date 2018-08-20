import { action, computed, observable, ObservableMap,
} from 'mobx';

// we need this for casting mobx to any for adapting to different versions
// tslint:disable-next-line:no-duplicate-imports
import * as mobx from 'mobx';
import * as _ from 'lodash';

import Base from './Base';
import Validator from './Validator';
import State from './State';
import Field from './Field';

const mobxAny = mobx as any;

interface FormOptions{
  name?:string;
  options?:any;
  plugins?:any;
  bindings?:any;
  hooks?:any;
  handlers?:any;
}

export default class Form extends Base {

  name:string;
  state:any;
  validator:Validator;

  debouncedValidation:any;

  $hooks = {};
  $handlers = {};

  @observable $submitting = false;
  @observable $validating = false;

  @observable fields:ObservableMap<any> = observable.map ?
          observable.map({}) :
          mobxAny.asMap({});

  $touched:boolean;
  $changed:boolean;

  constructor(setup:any = {}, formOptions:FormOptions = {}) {
    super();

    this.name = formOptions.name;
    this.$hooks = formOptions.hooks || {};
    this.$handlers = formOptions.handlers || {};

    const initial = _.each(
      {setup, options: formOptions.options || {},
        plugins:formOptions.plugins || {},
        bindings: formOptions.bindings || {},
      },
      (val, key) => _.isFunction(this[key])
      ? _.merge(val, this[key].apply(this, [this]))
      : val);

    this.state = new State({
      form: this,
      initial: initial.setup,
      options: initial.options,
      bindings: initial.bindings,
    });

    this.validator = new Validator({
      form: this,
      plugins: initial.plugins,
      schema: initial.setup.schema,
    });

    this.initFields(initial.setup);

    this.debouncedValidation = _.debounce(
      this.validate,
      this.state.options.get('validationDebounceWait'),
      this.state.options.get('validationDebounceOptions'),
    );

    // execute validation on form initialization
    if (this.state.options.get('validateOnInit') === true) {
      this.validator.validate({ showErrors: this.state.options.get('showErrorsOnInit') });
    }

    this.execHook('onInit');
  }

  /* ------------------------------------------------------------------ */
  /* COMPUTED */

  @computed get submitting() {
    return this.$submitting;
  }

  @computed get validating() {
    return this.$validating;
  }

  @computed get clearing() {
    return this.check('clearing', true);
  }

  @computed get resetting() {
    return this.check('resetting', true);
  }

  @computed get error() {
    return this.validator.error;
  }

  @computed get hasError() {
    return !!this.validator.error
     || this.check('hasError', true);
  }

  @computed get isValid() {
    return !this.validator.error
      && this.check('isValid', true);
  }

  @computed get isDirty() {
    return this.check('isDirty', true);
  }

  @computed get isPristine() {
    return this.check('isPristine', true);
  }

  @computed get isDefault() {
    return this.check('isDefault', true);
  }

  @computed get isEmpty() {
    return this.check('isEmpty', true);
  }

  @computed get focused() {
    return this.check('focused', true);
  }

  @computed get touched() {
    return this.check('touched', true);
  }

  @computed get changed() {
    return this.check('changed', true);
  }

  @computed get disabled() {
    return this.check('disabled', true);
  }
/**
  Prototypes
*/

  makeField(data:any) {
    return new Field(data);
  }

  /**
   Init Form Fields and Nested Fields
   */
  @action
  init($fields:any = null) {
    _.set(this, 'fields', observable.map
      ? observable.map({})
      : mobxAny.asMap({}),
    );

    this.state.initial.props.values = $fields; // eslint-disable-line
    this.state.current.props.values = $fields; // eslint-disable-line

    this.initFields({
      fields: $fields || this.state.struct(),
    });
  }

  @action
  invalidate(message:string = null) {
    this.validator.error = message
      || this.state.options.get('defaultGenericError')
      || true;
  }

  showErrors(show:boolean = true) {
    this.each((field:any) => field.showErrors(show));
  }

  /**
    Clear Form Fields
  */
  @action clear() {
    this.$touched = false;
    this.$changed = false;
    this.each((field:any) => field.clear(true));
  }

  /**
    Reset Form Fields
  */
  @action reset() {
    this.$touched = false;
    this.$changed = false;
    this.each((field:any) => field.reset(true));
  }

}
