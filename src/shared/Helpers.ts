import { CommonProperties } from './CommonProps';

/**
  Field Helpers
*/
class SharedHelpers implements CommonProperties {
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
   Fields Selector (alias of select)
   */
  // tslint:disable-next-line:function-name
  $(key) { return this.select(key); }

  /**
   Fields Values (recursive with Nested Fields)
   */
  values() { return this.get('value'); }

  /**
   Fields Errors (recursive with Nested Fields)
   */
  errors() { return this.get('error'); }

  /**
   Fields Labels (recursive with Nested Fields)
   */
  labels() { return this.get('label'); }

  /**
   Fields Placeholders (recursive with Nested Fields)
   */
  placeholders() { return this.get('placeholder'); }

  /**
   Fields Default Values (recursive with Nested Fields)
   */
  defaults() { return this.get('default'); }

  /**
   Fields Initial Values (recursive with Nested Fields)
   */
  initials() { return this.get('initial'); }

  /**
   Fields Types (recursive with Nested Fields)
   */
  types() { return this.get('type'); }
}

export default SharedHelpers;
