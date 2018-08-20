import { observe } from 'mobx';
import * as _ from 'lodash';

import Options from './Options';
import Bindings from './Bindings';
import * as utils from './utils';

export default class State {

  strict = false;

  form;

  mode;

  options;

  bindings;

  $extra;

  disposers = {
    interceptor: {},
    observer: {},
  };

  $struct = [];

  initial = {
    props: {},
    fields: {},
  };

  current = {
    props: {},
    fields: {},
  };

  constructor({
    form, initial, options, bindings,
  }) {
    this.set('form', form);
    this.initProps(initial);
    this.options = new Options();
    this.options.set(options);
    this.bindings = new Bindings();
    this.bindings.register(bindings);
    this.observeOptions();
  }

  initProps(initial) {
    const initialProps = _.pick(initial, [
      ...utils.props.separated,
      ...utils.props.validation,
      ...utils.props.function,
      ...utils.props.handlers,
    ]);

    this.set('initial', 'props', initialProps);

    const $unified = utils.hasUnifiedProps(initial);
    const $separated = utils.hasSeparatedProps(initial);

    if ($unified && $separated) {
      console.warn( // eslint-disable-line
        'WARNING: Your mobx-react-form instance ', this.form.name,
        ' is running in MIXED Mode (Unified + Separated) as fields properties definition.',
        'This mode is experimental, use it at your own risk, or use only one mode.',
      );
    }

    if (($separated || utils.isStruct(initial.fields)) && !$unified) {
      const struct = utils.$try(initial.struct || initial.fields);
      this.struct(struct);
      this.strict = true;
      this.mode = 'separated';
      return;
    }

    this.struct(initial.struct);
    this.mode = 'unified';
  }

  /**
    Get/Set Fields Structure
  */
  struct(data = null) {
    if (data) this.$struct = data;
    return this.$struct;
  }

  /**
    Get Props/Fields
  */
  get(type, subtype) {
    return this[type][subtype];
  }

  /**
    Set Props/Fields
  */
  set(type, subtype, state = null) {
    if (type === 'form') {
      // subtype is the form here
      this.form = subtype;
    }

    if (type === 'initial') {
      Object.assign(this.initial[subtype], state);
      Object.assign(this.current[subtype], state);
    }

    if (type === 'current') {
      Object.assign(this.current[subtype], state);
    }
  }

  extra(data = null) {
    if (_.isString(data)) return _.get(this.$extra, data);
    if (data === null) return this.$extra;
    this.$extra = data;
    return null;
  }

  observeOptions() {
    // Fix Issue #201
    observe(this.options.options, utils.checkObserve([{
      // start observing fields validateOnChange
      type: 'update',
      key: 'validateOnChange',
      to: true,
      exec: () => this.form.each(field => field.observeValidationOnChange()),
    }, {
      // stop observing fields validateOnChange
      type: 'update',
      key: 'validateOnChange',
      to: false,
      exec: () => this.form.each(field => field.disposeValidationOnChange()),
    }, {
      // start observing fields validateOnBlur
      type: 'update',
      key: 'validateOnBlur',
      to: true,
      exec: () => this.form.each(field => field.observeValidationOnBlur()),
    }, {
      // stop observing fields validateOnBlur
      type: 'update',
      key: 'validateOnBlur',
      to: false,
      exec: () => this.form.each(field => field.disposeValidationOnBlur()),
    }]));
  }
}
