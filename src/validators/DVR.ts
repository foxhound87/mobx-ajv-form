import * as _ from 'lodash';
import { ValidatorDriver, ValidatorPlugin } from './ValidatorDriver';

/**
  Declarative Validation Rules

    const plugins = {
      dvr: {
        package: validatorjs,
        extend: callback,
      },
    };

*/
export default class DVR implements ValidatorDriver {

  promises = [];

  asyncRules = [];

  validators = {};

  validator = null;

  extend = null;

  options;

  constructor(plugin:ValidatorPlugin, obj = {}) {
    this.assignInitData(plugin, obj);
    this.extendValidator();
  }

  assignInitData(plugin:ValidatorPlugin, { options = {}, promises = [] }) {
    this.options = options;
    this.promises = promises;
    this.extend = plugin.extend;
    this.validator = plugin.package || plugin;
  }

  extendValidator() {
    // extend the validator with custom "registerAsyncRule" method
    _.extend(this.validator, {
      registerAsyncRule: (key, callback) => this.registerAsyncRule(key, callback),
    });
    // extend using "extend" callback
    if (_.isFunction(this.extend)) this.extend(this.validator);
  }

  validateField(field, form) {
    // get form fields data
    const data = {}; // eslint-disable-next-line
    form.each($field => (data[$field.path] = $field.validatedValue));
    this.validateFieldAsync(field, form, data);
    this.validateFieldSync(field, form, data);
  }

  validateFieldSync(field, form, data) {
    const $rules = this.rules(field.rules, 'sync');
    // exit if no rules found
    if (_.isEmpty($rules[0])) return;
    // get field rules
    const rules = { [field.path]: $rules };
    // create the validator instance
    // tslint:disable-next-line:variable-name
    const Validator = this.validator;
    const validation = new Validator(data, rules);
    // set label into errors messages instead key
    validation.setAttributeNames({ [field.path]: field.label });
    // check validation
    if (validation.passes()) return;
    // the validation is failed, set the field error
    field.invalidate(_.first(validation.errors.get(field.path)));
  }

  validateFieldAsync(field, form, data) {
    const $rules = this.rules(field.rules, 'async');
    // exit if no rules found
    if (_.isEmpty($rules[0])) return;
    // get field rules
    const rules = { [field.path]: $rules };
    // create the validator instance
    // tslint:disable-next-line:variable-name
    const Validator = this.validator;
    const validation = new Validator(data, rules);
    // set label into errors messages instead key
    validation.setAttributeNames({ [field.path]: field.label });

    const $p = new Promise(resolve =>
      validation.checkAsync(
        () => this.handleAsyncPasses(field, resolve),
        () => this.handleAsyncFails(field, validation, resolve),
      ));

    this.promises.push($p);
  }

  handleAsyncPasses(field, resolve) {
    field.setValidationAsyncData(true);
    field.showAsyncErrors();
    resolve();
  }

  handleAsyncFails(field, validation, resolve) {
    field.setValidationAsyncData(false, _.first(validation.errors.get(field.path)));
    this.executeAsyncValidation(field);
    field.showAsyncErrors();
    resolve();
  }

  executeAsyncValidation(field) {
    if (field.validationAsyncData.valid === false) {
      field.invalidate(field.validationAsyncData.message, true);
    }
  }

  registerAsyncRule(key, callback) {
    console.error('registerAsyncRule');
    this.asyncRules.push(key);
    this.validator.registerAsync(key, callback);
  }

  rules(rules, type) {
    const $rules = _.isString(rules) ? _.split(rules, '|') : rules;
    if (type === 'sync') return _.difference($rules, this.asyncRules);
    if (type === 'async') return _.intersection($rules, this.asyncRules);
    return [];
  }
}
