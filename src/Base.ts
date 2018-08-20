import { computed } from 'mobx';
import * as _ from 'lodash';

import {
  $try,
  $isEvent,
  hasIntKeys } from './utils';
import Actions from './shared/Actions';
import Events from './shared/Events';
import Helpers from './shared/Helpers';
import Initializer from './shared/Initializer';
import Utils from './shared/Utils';

export default abstract class Base implements Actions, Events, Helpers, Initializer, Utils {
  abstract invalidate(message?: any, async?: boolean):any;
  state: any;
  $submitting: boolean;
  validator: any;

  /** shared actions */
  validate: (opt?: {}, obj?: {}) => any;
  submit: (o?: {})  => any;
  check: (prop: any, deep?: boolean)  => any;
  deepCheck: (type: any, prop: any, fields: any) => any[];
  update: (fields: any) => void;
  deepUpdate: (fields: any, path?: string, recursion?: boolean) => void;
  get: (prop?: any, strict?: boolean) => any;
  deepGet: (prop: any, fields: any) => any;
  set: (prop: any, data: any) => void;
  deepSet: ($: any, data: any, path?: string, recursion?: boolean) => void;
  add:(obj: any) => any;
  del:($path?: any) => void;

  /** shared events */
  // tslint:disable-next-line:variable-name
  MOBXEvent: (
    { path, key, call, type }:
      { path?: any; key?: string; call: any; type: any; }) => void;

  dispose: (opt?: any) => any;

  disposeAll: () => any;

  disposeSingle: (
    { type, key, path }:
      { type: any; key?: string; path?: any; }) => void;

  /** helpers */
  $:(key: any) => any;
  values: () => any;
  errors: () => any;
  labels: () => any;
  placeholders: () => any;
  defaults: () => any;
  initials: () => any;
  types: () => any;

  /** Initializers */

  initFields: (initial: any, update?: any) => any;
  initField:(key: any, path: any, data: any, update?: boolean) => any;

  /** Utils */
  select: (path: any, fields?: any, isStrict?: boolean) => any;
  container: ($path?: any) => any;
  has: (path: any) => boolean;
  map:(cb: any) => any;
  each: (iteratee: any, fields?: any, depth?: number) => void;

  noop = () => {};

  $handlers:any;
  $hooks:any;

  fields:any;
  handlers:any;

  path:any;

  hooks?():any;
  abstract clear(deep:boolean): void;
  abstract reset(deep:boolean): void;

  execHook = (name, fallback = {}) => $try(
    fallback[name],
    this.$hooks[name],
    this.hooks && this.hooks.apply(this, [this])[name],
    this.noop,
  ).apply(this, [this])

  execHandler = (name, args, fallback = null) => [$try(
    this.$handlers[name] && this.$handlers[name].apply(this, [this]),
    this.handlers && this.handlers.apply(this, [this])[name].apply(this, [this]),
    fallback,
    this.noop,
  ).apply(this, [...args]), this.execHook(name)]

  @computed get hasIncrementalKeys():any {
    return (this.fields.size && hasIntKeys(this.fields));
  }

  @computed get hasNestedFields():any {
    return (this.fields.size !== 0);
  }

  @computed get size() {
    return this.fields.size;
  }

  /**
   Interceptor
   */
  intercept = opt =>
    this.MOBXEvent(
      _.isFunction(opt)
        ? { type: 'interceptor', call: opt }
        : { type: 'interceptor', ...opt },
    )

  /**
   Observer
   */
  observe = opt =>
    this.MOBXEvent(
      _.isFunction(opt)
        ? { type: 'observer', call: opt }
        : { type: 'observer', ...opt },
    )

  /**
    Event Handler: On Clear
  */
  onClear = (...args) =>
    this.execHandler('onClear', args, (e) => {
      e.preventDefault();
      this.clear(true);
    })

  /**
    Event Handler: On Reset
  */
  onReset = (...args) =>
    this.execHandler('onReset', args, (e) => {
      e.preventDefault();
      this.reset(true);
    })

  /**
    Event Handler: On Submit
   */
  onSubmit = (...args) =>
    this.execHandler('onSubmit', args, (e, o = {}) => {
      e.preventDefault();
      this.submit(o);
    })

  /**
    Event Handler: On Add
  */
  onAdd = (...args) =>
    this.execHandler('onAdd', args, (e, val) => {
      e.preventDefault();
      this.add($isEvent(val) ? null : val);
    })

  /**
    Event Handler: On Del
  */
  onDel = (...args) =>
    this.execHandler('onDel', args, (e, path) => {
      e.preventDefault();
      this.del($isEvent(path) ? this.path : path);
    })
}
