import { observe, intercept } from 'mobx';
import * as _ from 'lodash';
import * as utils from '../utils';
import * as parser from '../parser';
import { CommonProperties } from './CommonProps';

/**
  Field Events
*/
class SharedEvents implements CommonProperties{
  path: any;
  state: any;
  fields: any;
  $submitting: boolean;
  hasNestedFields: boolean;
  container: (path?: string) => any;
  select: (path: any, fields?: any, isStrict?: boolean) => any;
  execHook: (hook: string, o: any) => any;
  invalidate: (message?: any, async?: boolean) => any;
  validator: any;
  validate: (o: any) => any;
  initField: (key: any, path: any, data: any, update?: boolean) => any;
  get: (path: string) => any;

  /**
   MobX Event (observe/intercept)
   */
  // tslint:disable-next-line:function-name
  MOBXEvent({
    path = null, key = 'value', call, type,
  }) {
    const $instance = this.select(path || this.path, null, null) || this;

    const $call = change => call.apply(null, [{
      change,
      form: this.state.form,
      path: $instance.path || null,
      field: $instance.path ? $instance : null,
    }]);

    let fn;
    let ffn;

    if (type === 'observer') {
      fn = observe;
      ffn = $instance.fields.observe;
    }

    if (type === 'interceptor') {
      // tslint:disable-next-line:no-parameter-reassignment
      key = `$${key}`;
      fn = intercept;
      ffn = $instance.fields.intercept;
    }

    const $dkey = $instance.path
      ? `${key}@${$instance.path}`
      : key;

    _.merge(this.state.disposers[type], {
      [$dkey]: (key === 'fields')
        ? ffn.apply(change => $call(change))
        : fn($instance, key, change => $call(change)),
    });
  }

  /**
   Dispose MOBX Events
   */
  dispose(opt = null) {
    if (this.path && opt) return this.disposeSingle(opt);
    return this.disposeAll();
  }

  /**
   Dispose All Events (observe/intercept)
   */
  disposeAll() {
    const dispose = disposer => disposer.apply();
    _.each(this.state.disposers.interceptor, dispose);
    _.each(this.state.disposers.observer, dispose);
    this.state.disposers = { interceptor: {}, observer: {} };
    return null;
  }

  /**
   Dispose Single Event (observe/intercept)
   */
  disposeSingle({ type, key = 'value', path = null }) {
    const $path = parser.parsePath(utils.$try(path, this.path));
    // tslint:disable-next-line:no-parameter-reassignment
    if (type === 'interceptor') key = `$${key}`; // target observables
    this.state.disposers[type][`${key}@${$path}`].apply();
    delete this.state.disposers[type][`${key}@${$path}`];
  }

}

export default SharedEvents;
