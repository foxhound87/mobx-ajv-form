import _ from 'lodash';

/**
  Declarative Validation Rules

    const plugins = {
      dvr: {
        package: validatorjs,
        extend: callback,
      },
    };

*/
export default class DVR {

  promises = [];

  asyncRules = [];

  validators = {};

  validator = null;

  extend = null;

  options;

  constructor(plugin, obj = {}) {
    this.assignInitData(plugin, obj);
    this.extendValidator();
  }

  assignInitData(plugin, { options = {}, promises = [] }) {
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

  validateField(field, form, changeState) {
    // get form fields data
    const data = {};
    form.each($field => (data[$field.path] = $field.value));
    this.validateFieldAsync(field, form, changeState, data);
    this.validateFieldSync(field, form, changeState, data);
  }

  validateFieldSync(field, form, changeState, data) {
    const $rules = this.rules(field.rules, 'sync');
    // exit if no rules found
    if (_.isEmpty($rules[0])) return;
    // get field rules
    const rules = { [field.path]: $rules };
    // create the validator instance
    const Validator = this.validator;
    const validation = new Validator(data, rules);
    // set label into errors messages instead key
    validation.setAttributeNames({ [field.path]: field.label });
    // check validation
    if (validation.passes() || !changeState) return;
    // the validation is failed, set the field errorbre
    field.invalidate(_.first(validation.errors.get(field.path)));
  }

  validateFieldAsync(field, form, changeState, data) {
    const $rules = this.rules(field.rules, 'async');
    // exit if no rules found
    if (_.isEmpty($rules[0])) return;
    // get field rules
    const rules = { [field.path]: $rules };
    // create the validator instance
    const Validator = this.validator;
    const validation = new Validator(data, rules);
    // set label into errors messages instead key
    validation.setAttributeNames({ [field.path]: field.label });

    const $p = new Promise((resolve) => {
      validation.checkAsync(
        () => this.handleAsyncPasses(field, resolve, changeState),
        () => this.handleAsyncFails(field, validation, resolve, changeState),
      );
    });

    this.promises.push($p);
  }

  handleAsyncPasses(field, resolve, changeState) {
    if (changeState) {
      field.setValidationAsyncData(true);
      field.showAsyncErrors();
    }
    resolve();
  }

  handleAsyncFails(field, validation, resolve, changeState) {
    if (changeState) {
      field.setValidationAsyncData(false, _.first(validation.errors.get(field.path)));
      this.executeAsyncValidation(field);
      field.showAsyncErrors();
    }
    resolve();
  }

  executeAsyncValidation(field) {
    if (field.validationAsyncData.valid === false) {
      field.invalidate(field.validationAsyncData.message, true);
    }
  }

  registerAsyncRule(key, callback) {
    this.asyncRules.push(key);
    this.validator.registerAsync(key, callback);
  }

  rules(rules, type) {
    let diff = [];
    const $rules = _.isString(rules) ? _.split(rules, '|') : rules;
    if (type === 'sync') diff = _.difference($rules, this.asyncRules);
    if (type === 'async') diff = _.intersection($rules, this.asyncRules);
    return diff;
  }
}
