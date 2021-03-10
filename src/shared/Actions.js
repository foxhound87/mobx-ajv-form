import { action, makeObservable } from 'mobx';
import _ from 'lodash';
import utils from '../utils';
import parser from '../parser';
import Initializer from './Initializer';

/**
  Field Actions
*/
export default class Actions extends Initializer {
  constructor() {
    super();

    makeObservable(this);
  }

  validate(opt = {}, obj = {}) {
    const $opt = _.merge(opt, { path: this.path });
    return this.state.form.validator.validate($opt, obj);
  }

  /**
    Submit
  */
  @action
  submit(o = {}) {
    this.$submitting = true;
    this.$submitted += 1;

    const exec = isValid => isValid
      ? this.execHook('onSuccess', o)
      : this.execHook('onError', o);

    const validate = () =>
      this.validate({
        showErrors: this.state.options.get('showErrorsOnSubmit', this),
      })
        .then(({ isValid }) => {
          const handler = exec(isValid);
          if (isValid) return handler;
          const $err = this.state.options.get('defaultGenericError', this);
          const $throw = this.state.options.get('submitThrowsError', this);
          if ($throw && $err) this.invalidate();
          return handler;
        })
        // eslint-disable-next-line
        .then(action(() => (this.$submitting = false)))
        .catch(action((err) => {
          this.$submitting = false;
          throw err;
        }))
        .then(() => this);


    return utils.isPromise(exec)
      ? exec.then(() => validate())
      : validate();
  }

  /**
   Check Field Computed Values
   */
  check(prop, deep = false) {
    utils.allowedProps('booleans', [prop]);

    return deep
      ? utils.checkPropType({
        type: utils.props.types[prop],
        data: this.deepCheck(utils.props.types[prop], prop, this.fields),
      })
      : this[prop];
  }

  deepCheck(type, prop, fields) {
    const $fields = utils.getObservableMapValues(fields);
    return _.transform($fields, (check, field) => {
      if (!field.fields.size || utils.props.exceptions.includes(prop)) {
        check.push(field[prop]);
      }

      const $deep = this.deepCheck(type, prop, field.fields);
      check.push(utils.checkPropType({ type, data: $deep }));
      return check;
    }, []);
  }

  /**
   Update Field Values recurisvely
   OR Create Field if 'undefined'
   */
  update(fields) {
    if (!_.isPlainObject(fields)) {
      throw new Error('The update() method accepts only plain objects.');
    }

    return this.deepUpdate(parser.prepareFieldsData({ fields }));
  }

  @action
  deepUpdate(fields, path = '', recursion = true) {
    _.each(fields, (field, key) => {
      const $key = _.has(field, 'name') ? field.name : key;
      const $path = _.trimStart(`${path}.${$key}`, '.');
      const $field = this.select($path, null, false);
      const $container = this.select(path, null, false)
        || this.state.form.select(this.path, null, false);


      if (!_.isNil($field) && !_.isUndefined(field)) {
        if (_.isArray($field.values())) {
          let n = _.max(_.map(field.fields, (f, i) => Number(i)))
          if (n === undefined) n = -1 // field's value is []
          _.each(utils.getObservableMapValues($field.fields), $f => {
            if (Number($f.name) > n)
              $field.fields.delete($f.name)
          });
        }
        if (_.isNull(field) || _.isNil(field.fields)) {
          $field.$value = parser.parseInput($field.$input, {
            separated: field
          });
          return;
        }
      }

      if (!_.isNil($container) && _.isNil($field)) {
        // get full path when using update() with select() - FIX: #179
        const $newFieldPath = _.trimStart([this.path, $path].join('.'), '.');
        // init field into the container field
        $container.initField($key, $newFieldPath, field, true);
      }
      else if (recursion) {
        if (_.has(field, 'fields') && !_.isNil(field.fields)) {
          // handle nested fields if defined
          this.deepUpdate(field.fields, $path);
        }
        else {
          // handle nested fields if undefined or null
          const $fields = parser.pathToFieldsTree(this.state.struct(), $path);
          this.deepUpdate($fields, $path, false);
        }
      }
    });
  }

  /**
    Get Fields Props
   */
  get(prop = null, strict = true) {
    if (_.isNil(prop)) {
      return this.deepGet([
        ...utils.props.booleans,
        ...utils.props.field,
        ...utils.props.validation,
      ], this.fields);
    }

    utils.allowedProps('all', _.isArray(prop) ? prop : [prop]);

    if (_.isString(prop)) {
      if (strict && this.fields.size === 0) {
        return parser.parseCheckOutput(this, prop);
      }

      const value = this.deepGet(prop, this.fields);
      return parser.parseCheckArray(this, value, prop);
    }

    return this.deepGet(prop, this.fields);
  }

  /**
    Get Fields Props Recursively
   */
  deepGet(prop, fields) {
    return _.transform(utils.getObservableMapValues(fields), (obj, field) => {
      const $nested = $fields => ($fields.size !== 0)
        ? this.deepGet(prop, $fields)
        : undefined;

      Object.assign(obj, {
        [field.key]: { fields: $nested(field.fields) },
      });

      if (_.isString(prop)) {
        const removeValue = (prop === 'value') &&
         ((this.state.options.get('retrieveOnlyDirtyValues', this) && field.isPristine) ||
          (this.state.options.get('retrieveOnlyEnabledFields', this) && field.disabled) ||
          (this.state.options.get('softDelete', this) && field.deleted));

        if (field.fields.size === 0) {
          delete obj[field.key]; // eslint-disable-line
          if (removeValue) return obj;
          return Object.assign(obj, {
            [field.key]: parser.parseCheckOutput(field, prop),
          });
        }

        let value = this.deepGet(prop, field.fields);
        if (prop === 'value') value = field.$output(value);

        delete obj[field.key]; // eslint-disable-line
        if (removeValue) return obj;

        return Object.assign(obj, {
          [field.key]: parser.parseCheckArray(field, value, prop),
        });
      }

      _.each(prop, $prop =>
        Object.assign(obj[field.key], {
          [$prop]: field[$prop],
        }));

      return obj;
    }, {});
  }

  /**
   Set Fields Props
   */
  @action
  set(prop, data) {
    // UPDATE CUSTOM PROP
    if (_.isString(prop) && !_.isUndefined(data)) {
      utils.allowedProps('field', [prop]);
      const deep = (_.isObject(data) && prop === 'value') || _.isPlainObject(data);
      if (deep && this.hasNestedFields) this.deepSet(prop, data, '', true);
      else _.set(this, `$${prop}`, data);
      return;
    }

    // NO PROP NAME PROVIDED ("prop" is value)
    if (_.isNil(data)) {
      if (this.hasNestedFields) this.deepSet('value', prop, '', true);
      else this.set('value', prop);
    }
  }

  /**
    Set Fields Props Recursively
   */
  deepSet($, data, path = '', recursion = false) {
    const err = 'You are updating a not existent field:';
    const isStrict = this.state.options.get('strictUpdate', this);

    if (_.isNil(data)) {
      this.each(field => field.clear(true));
      return;
    }
    
    _.each(data, ($val, $key) => {
        const $path = _.trimStart(`${path}.${$key}`, '.');
        // get the field by path joining keys recursively
        const field = this.select($path, null, isStrict);
        // if no field found when is strict update, throw error
        if (isStrict) utils.throwError($path, field, err);
        // update the field/fields if defined
        if (!_.isUndefined(field)) {
          // update field values or others props
          if (!_.isUndefined($val)) {
            field.set($, $val, recursion);
          }
          // update values recursively only if field has nested
          if (field.fields.size && _.isObject($val)) {
            this.deepSet($, $val, $path, recursion);
          }
        }
      });
  }

  /**
   Add Field
   */
  @action
  add(obj) {
    if (utils.isArrayOfObjects(obj)) {
      return _.each(obj, values => this.update({
        [utils.maxKey(this.fields)]: values,
      }));
    }

    let key; // eslint-disable-next-line
    if (_.has(obj, 'key')) key = obj.key;
    if (_.has(obj, 'name')) key = obj.name;
    if (!key) key = utils.maxKey(this.fields);

    const $path = $key => _.trimStart([this.path, $key].join('.'), '.');
    const tree = parser.pathToFieldsTree(this.state.struct(), this.path, 0, true);
    return this.initField(key, $path(key), _.merge(tree[0], obj));
  }

  /**
   Del Field
   */
  @action
  del($path = null) {
    const isStrict = this.state.options.get('strictDelete', this);
    const path = parser.parsePath(utils.$try($path, this.path));
    const fullpath = _.trim([this.path, path].join('.'), '.');
    const container = this.container($path);
    const keys = _.split(path, '.');
    const last = _.last(keys);

    if (isStrict && !container.fields.has(last)) {
      const msg = `Key "${last}" not found when trying to delete field`;
      utils.throwError(fullpath, null, msg);
    }

    if (this.state.options.get('softDelete', this)) {
      return this.select(fullpath).set('deleted', true);
    }

    return container.fields.delete(last);
  }

};
