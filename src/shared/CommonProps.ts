export interface CommonProperties{
  path:any;
  state:any;
  fields:any;

  readonly $submitting:boolean;

  readonly hasNestedFields: boolean;

  container: (path?:string) => any;
  select: (path: any, fields?: any, isStrict?: boolean) => any;
  execHook:(hook:string, o:any) => any;

  invalidate: (message?: any, async?: boolean) => any;

  validator:any;

  validate:(o:any) => any;

  initField:(key: any, path: any, data: any, update?: boolean) => any;

  get: (path:string) => any;

}
