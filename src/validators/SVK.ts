import * as _ from 'lodash';
import * as utils from '../utils';
import Options from '../Options';
import { ValidatorDriver, ValidatorPlugin } from './ValidatorDriver';

/**
  Schema Validation Keywords

    const plugins = {
      svk: {
        package: ajv,
        extend: callback,
      },
    };

*/
export default class SVK implements ValidatorDriver {

  validate = null;

  extend = null;

  promises = [];

  schema = {};

  options;

  constructor(plugin:ValidatorPlugin, obj:any = {}) {
    this.assignInitData(plugin, obj);
    this.initAJV(plugin);
  }

  assignInitData(plugin:ValidatorPlugin,
                 {
                    options = new Options(),
                    schema = {},
                    promises = [],
    }:{options:Options, schema:any, promises:any[]}) {
    options.set({
      ajv: {
        v5: true,
        allErrors: true,
        coerceTypes: true,
        errorDataPath: 'property',
      },
    });

    this.options = options;
    this.schema = schema;
    this.promises = promises;
    this.extend = plugin.extend;
  }

  initAJV(plugin) {
    if (!this.schema) return;
    // get ajv package
    const AJV = plugin.package || plugin;
    // create ajv instance
    const ajvInstance = new AJV(this.options.get('ajv'));
    // extend ajv using "extend" callback
    if (_.isFunction(this.extend)) this.extend(ajvInstance);
    // create ajvInstance validator (compiling rules)
    this.validate = ajvInstance.compile(this.schema);
  }

  validateField(field) {
    const data = { [field.path]: field.validatedValue };
    const validate = this.validate(this.parseValues(data));
    // check if is $async schema
    if (utils.isPromise(validate)) {
      const $p = validate
        .then(() => field.setValidationAsyncData(true))
        .catch(err => err && this.handleAsyncError(field, err.errors))
        .then(() => this.executeAsyncValidation(field))
        .then(() => field.showAsyncErrors());

      // push the promise into array
      this.promises.push($p);
      return;
    }
    // check sync errors
    this.handleSyncError(field, this.validate.errors);
  }

  handleSyncError(field, errors) {
    const fieldErrorObj = this.findError(field.key, errors);
    // if fieldErrorObj is not undefined, the current field is invalid.
    if (_.isUndefined(fieldErrorObj)) return;
    // the current field is now invalid
    // add additional info to the message
    const msg = `${field.label} ${fieldErrorObj.message}`;
    // invalidate the current field with message
    field.invalidate(msg);
  }

  handleAsyncError(field, errors) {
    // find current field error message from ajv errors
    const fieldErrorObj = this.findError(field.path, errors);
    // if fieldErrorObj is not undefined, the current field is invalid.
    if (_.isUndefined(fieldErrorObj)) return;
    // the current field is now invalid
    // add additional info to the message
    const msg = `${field.label} ${fieldErrorObj.message}`;
    // set async validation data on the field
    field.setValidationAsyncData(false, msg);
  }

  findError(path, errors) {
    return _.find(errors, ({ dataPath }) => {
      let $dataPath;
      $dataPath = _.trimStart(dataPath, '.');
      $dataPath = _.trim($dataPath, '[\'');
      $dataPath = _.trim($dataPath, '\']');
      return _.includes($dataPath, `${path}`);
    });
  }

  executeAsyncValidation(field) {
    if (field.validationAsyncData.valid === false) {
      field.invalidate(field.validationAsyncData.message, true);
    }
  }

  parseValues(values) {
    if (this.options.get('allowRequired') === true) {
      return _.omitBy(values, (_.isEmpty || _.isNull || _.isUndefined || _.isNaN));
    }
    return values;
  }
}
