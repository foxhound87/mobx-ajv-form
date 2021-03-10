import { action, makeObservable } from 'mobx';
import _ from 'lodash';
import utils from '../utils';
import parser from '../parser';

/**
  Field Initializer
*/
export default class Initializer {
  constructor() {
    makeObservable(this);
  }

  initFields(initial, update) {
    const fallback = this.state.options.get('fallback');
    const $path = key => _.trimStart([this.path, key].join('.'), '.');

    let fields;
    fields = parser.prepareFieldsData(initial, this.state.strict, fallback);
    fields = parser.mergeSchemaDefaults(fields, this.validator);

    // create fields
    _.forIn(fields, (field, key) => {
      const path = $path(key);
      const $f = this.select(path, null, false);
      if (_.isNil($f)) {
        if (fallback) {
          this.initField(key, path, field, update);
        }
        else {
          const structPath = utils.pathToStruct(path);
          const struct = this.state.struct();
          const found  = struct.filter(s => s.startsWith(structPath))
            .find(s => s.charAt(structPath.length) === '.'
            || s.substr(structPath.length, 2) === '[]'
            || s === structPath)

          if (found)
            this.initField(key, path, field, update);
        }
      }
    })
  }

  @action
  initField(key, path, data, update = false) {
    const initial = this.state.get('current', 'props');
    const struct = utils.pathToStruct(path);
    // try to get props from separated objects
    const $try = prop => {
      const t = _.get(initial[prop], struct);
      if ((prop === 'input' || prop === 'output') && typeof t !== 'function') return undefined
      return t;
    }

    const props = {
      $value: _.get(initial['values'], path),
      $label: $try('labels'),
      $placeholder: $try('placeholders'),
      $default: $try('defaults'),
      $initial: $try('initials'),
      $disabled: $try('disabled'),
      $bindings: $try('bindings'),
      $type: $try('types'),
      $options: $try('options'),
      $extra: $try('extra'),
      $related: $try('related'),
      $hooks: $try('hooks'),
      $handlers: $try('handlers'),
      $validatedWith: $try('validatedWith'),
      $validators: $try('validators'),
      $rules: $try('rules'),
      $observers: $try('observers'),
      $interceptors: $try('interceptors'),
      $input: $try('input'),
      $output: $try('output'),
    };

    const field = this.state.form.makeField({
      key, path, data, props, update, state: this.state,
    });

    this.fields.merge({ [key]: field });

    return field;
  }

};
