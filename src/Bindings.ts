import * as _ from 'lodash';
import { $try } from './utils';

export default class Bindings {

  templates = {
    // default: ({ field, props, keys, $try }) => ({
    //   [keys.id]: $try(props.id, field.id),
    // }),
  };

  rewriters = {
    default: {
      id: 'id',
      name: 'name',
      type: 'type',
      value: 'value',
      checked: 'checked',
      label: 'label',
      placeholder: 'placeholder',
      disabled: 'disabled',
      onChange: 'onChange',
      onBlur: 'onBlur',
      onFocus: 'onFocus',
      autoFocus: 'autoFocus',
    },
  };

  load(field, name = 'default', props) {
    if (_.has(this.rewriters, name)) {
      const $bindings = {};

      _.each(this.rewriters[name], ($v, $k) =>
        _.merge($bindings, { [$v]: $try(props[$k], field[$k]) }));

      return $bindings;
    }

    return this.templates[name]({
      keys: this.rewriters[name],
      // tslint:disable-next-line:object-shorthand-properties-first
      $try,
      // tslint:disable-next-line:object-shorthand-properties-first
      field,
      // tslint:disable-next-line:object-shorthand-properties-first
      props,
    });
  }

  register(bindings) {
    _.each(bindings, (val, key) => {
      if (_.isFunction(val)) _.merge(this.templates, { [key]: val });
      if (_.isPlainObject(val)) _.merge(this.rewriters, { [key]: val });
    });

    return this;
  }
}
