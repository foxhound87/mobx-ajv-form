export interface ValidatorDriver
{
  validateField(field, form);
}

export interface ValidatorPlugin {
  package?:any;
  extend?:any;
}
