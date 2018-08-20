import { action, observable } from 'mobx';
import * as _ from 'lodash';

import { $try } from './utils';

// tslint:disable-next-line:import-name
import vjf from './validators/VJF'; // Vanilla JavaScript Functions
// tslint:disable-next-line:import-name
import svk from './validators/SVK'; // Json Schema Validation Keywords
// tslint:disable-next-line:import-name
import dvr from './validators/DVR'; // Declarative Validation Rules

export default class Validator {

  promises = [];

  form:any = {};

  options = {};

  schema = {};

  plugins = {
    vjf: true,
    dvr: false,
    svk: false,
  };

  drivers:any = {};

  @observable error:any;

  constructor(obj:any = {}) {
    _.merge(this.plugins, obj.plugins);
    this.form = obj.form;
    this.schema = obj.schema || {};
    this.initDrivers({ vjf, dvr, svk });
    this.checkSVKValidationPlugin();
  }

  initDrivers(drivers:any) { // eslint-disable-next-line

    // tslint:disable-next-line:no-this-assignment
    const self = this;
    // tslint:disable-next-line:variable-name
    _.map(drivers, (Class, key) => {
      if (self.plugins[key]) {
        self.drivers[key] = new Class(self.plugins[key], {
          schema: (key === 'svk') ? this.schema : null,
          options: self.form.state.options,
          promises: self.promises,
        });
      }
    });
  }

  @action
  validate(opt:any = {}, obj:any = {}) {
    const path = $try(opt.path, opt);
    const field = $try(opt.field, this.form.select(path, null, null));
    const related = $try(opt.related, obj.related, true);
    const showErrors = $try(opt.showErrors, obj.showErrors, false);
    const instance = field || this.form;
    instance.$validating = true;
    this.error = null;

    return new Promise((resolve) => {
      // validate instance (form or filed)
      if (instance.path || _.isString(path)) {
        this.validateField({
          field: instance,
          // tslint:disable-next-line:object-shorthand-properties-first
          showErrors,
          // tslint:disable-next-line:object-shorthand-properties-first
          related,
          // tslint:disable-next-line:object-shorthand-properties-first
          path,
        });
      }

      // validate nested fields
      instance.each($field =>
        this.validateField({
          path: $field.path,
          field: $field,
          // tslint:disable-next-line:object-shorthand-properties-first
          showErrors,
          // tslint:disable-next-line:object-shorthand-properties-first
          related,
        }));

      // wait all promises
      resolve(Promise.all(this.promises));
    })
      .then(action(() => {
        instance.$validating = false;
        instance.$clearing = false;
        instance.$resetting = false;
      }))
      .catch(action((err) => {
        instance.$validating = false;
        instance.$clearing = false;
        instance.$resetting = false;
        throw err;
      }))
      .then(() => instance);
  }

  @action
  validateField({
    field = null, path, showErrors = false, related = false,
  }) {
    const instance = field || this.form.select(path);
    // check if the field is a valid instance
    if (!instance.path) throw new Error('Validation Error: Invalid Field Instance');
    // do not validate disabled fields
    if (instance.disabled && !this.form.state.options.get('validateDisabledFields')) return;
    // reset field validation
    instance.resetValidation();
    // validate with all drivers
    _.each(this.drivers, (driver:any) =>
      driver.validateField(instance, this.form));
    // send error to the view
    instance.showErrors(showErrors);
    // related validation
    if (related) this.relatedFieldValidation(instance, showErrors);
  }

  /**
    Validate 'related' fields if specified
    and related validation allowed (recursive)
  */
  relatedFieldValidation(field, showErrors) {
    if (!field.related || !field.related.length) return;

    _.each(field.related, path =>
      this.validateField({ path, showErrors, related: false }));
  }

  checkSVKValidationPlugin() {
    if (_.isNil(this.drivers.svk) && !_.isEmpty(this.schema)) {
      // eslint-disable-next-line
      console.warn(
        'The SVK validation schema is defined',
        'but no plugin provided (SVK).',
      );
    }
  }
}
