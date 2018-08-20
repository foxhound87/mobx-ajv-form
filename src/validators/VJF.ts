import * as _ from 'lodash';
import { toJS } from 'mobx';
import * as utils from '../utils';
import { ValidatorDriver, ValidatorPlugin } from './ValidatorDriver';

/**
  Vanilla JavaScript Functions
*/
export default class VJF implements ValidatorDriver {

  options:any;
  promises:any[];

  validator = null;
  constructor(plugin:ValidatorPlugin, { promises = [], options = {} }) {
    if (_.isPlainObject(plugin)) {
      this.validator = plugin;
    }

    this.promises = promises;
    this.options = options;
  }

  validateField(field, form) {
    // exit if field does not have validation functions
    if (!field.validators) return;

    // get validators from validate property
    const $fn = toJS(field.validators);

    // map only if is an array of validator functions
    if (_.isArray($fn)) {
      $fn.map(fn => this.collectData(fn, field, form));
    }

    // it's just one function
    if (_.isFunction($fn)) {
      this.collectData($fn, field, form);
    }

    // execute the function validation
    this.executeValidation(field);
  }

  collectData($fn, field, form) {
    const res = this.handleFunctionResult($fn, field, form);

    // check and execute only if is a promise
    if (utils.isPromise(res)) {
      const $p = res
        .then($res => field.setValidationAsyncData($res[0], $res[1]))
        .then(() => this.executeAsyncValidation(field))
        .then(() => field.showAsyncErrors());

      // push the promise into array
      this.promises.push($p);
      return;
    }

    // is a plain function
    field.validationFunctionsData.unshift({
      valid: res[0],
      message: res[1],
    });
  }

  executeValidation(field) {
    // otherwise find an error message to show
    field.validationFunctionsData
      .map(rule => (rule.valid === false)
        && field.invalidate(rule.message));
  }

  executeAsyncValidation(field) {
    if (field.validationAsyncData.valid === false) {
      field.invalidate(field.validationAsyncData.message, true);
    }
  }

  handleFunctionResult($fn, field, form) {
    // executre validation function
    const res = $fn({ field, form, validator: this.validator });

    /**
      Handle "array"
    */
    if (_.isArray(res)) {
      const isValid = res[0] || false;
      const message = res[1] || 'Error';
      return [isValid, message];
    }

    /**
      Handle "boolean"
    */
    if (_.isBoolean(res)) {
      return [res, 'Error'];
    }

    /**
      Handle "string"
    */
    if (_.isString(res)) {
      return [false, res];
    }

    /**
      Handle "object / promise"
    */
    if (utils.isPromise(res)) {
      return res; // the promise
    }

    /**
      Handle other cases
    */
    return [false, 'Error'];
  }
}
