# Index

- [Defining the Form Fields](https://github.com/foxhound87/mobx-react-form/blob/master/docs/DefiningFields.md)
- [Validation Plugins](https://github.com/foxhound87/mobx-react-form/blob/master/DOCUMENTATION.md#validation-plugins)
- [Form Constructor](https://github.com/foxhound87/mobx-react-form/blob/master/DOCUMENTATION.md#form-constructor)
- [Form Options](https://github.com/foxhound87/mobx-react-form/blob/master/DOCUMENTATION.md#form-options)
- [Form API List](https://github.com/foxhound87/mobx-react-form/blob/master/docs/FormApi.md#form-api)
- [Fields API List](https://github.com/foxhound87/mobx-react-form/blob/master/docs/FormApi.md#fields-api)
- [Supported Validation Packages](https://github.com/foxhound87/mobx-react-form/blob/master/DOCUMENTATION.md#supported-validation-packages)
- [Remove AJV Warnings from webpack](https://github.com/foxhound87/mobx-react-form/blob/master/DOCUMENTATION.md#remove-ajv-warnings-from-webpack)


<br>

## Validation Plugins

| Modes | Result | Provider Library |
|---|---|---|
| **VJF** | Enable Vanilla Javascript Validation Functions | **default** |
| **JVK** | Enable json-schema Validation and Keywords | epoberezkin's **ajv** |
| **DVR** | Enable Declarative Validation Rules | skaterdav85's **validatorjs** |

> Some plugins can be extended with custom functionalities, you'll find out how by reading this documentation.

- [Enabling JsonSchema Validation Keywords (JVK)](https://github.com/foxhound87/mobx-react-form/blob/master/docs/EnablingJVKValidation.md)
- [Enabling Declarative Validation Rules (DVR)](https://github.com/foxhound87/mobx-react-form/blob/master/docs/EnablingDVRValidation.md)
- [Custom JsonSchema Validation Keywords (extend)](https://github.com/foxhound87/mobx-react-form/blob/master/docs/CustomValidationKeywords.md)
- [Custom Declarative Validation Rules (extend)](https://github.com/foxhound87/mobx-react-form/blob/master/docs/CustomValidationRules.md)
- [Custom Vanilla Javascript Validation Functions](https://github.com/foxhound87/mobx-react-form/blob/master/docs/CustomValidationFunctions.md)
- [Async JsonSchema Validation Keywords](https://github.com/foxhound87/mobx-react-form/blob/master/docs/CustomValidationKeywords.md#async-validation-keywords)
- [Async Declarative Validation Rules](https://github.com/foxhound87/mobx-react-form/blob/master/docs/CustomValidationRules.md#async-validation-rules)
- [Async Vanilla Javascript Validation Functions](https://github.com/foxhound87/mobx-react-form/blob/master/docs/CustomValidationFunctions.md#async-validation-functions)

---

<br>

# FORM

<br>

## Form Constructor

**Usage:** `new Form({ fields, options, plugins, schema });`

| Property | Description | Help |
|---|---|---|
| **fields**    | Object which represents the fields: name, label, value. | [defining fields](https://github.com/foxhound87/mobx-react-form/blob/master/docs/DefiningFields.md) |
| **options**   | Options used by the `form` or the imported `plugins` which may alter the validation behavior. | [form options](https://github.com/foxhound87/mobx-react-form/blob/master/DOCUMENTATION.md#form-options) |
| **plugins**   | Enable additional functionalities using external libraries. | [validation plugins](https://github.com/foxhound87/mobx-react-form/blob/master/DOCUMENTATION.md#validation-plugins) |
| **schema**    | The json-schema for the validation. | [json schema](http://json-schema.org) |

<br>

## Form Options

| Option | Type | Default | Info |
|---|---|---|---|
| **validateOnInit** | boolean | true | Validate of the whole form on initilization. |
| **showErrorsOnInit** | boolean | false | Show or hide error messages for `validateOnInit`. |
| **defaultGenericError** | string | null | Set e default message to show when a generic error occurs. |
| **loadingMessage** | string | null | Set a global loading message to show during async calls. |
| **allowRequired** | false | boolean | The json-schema `required` property can work only if the object does not contain the field key/value pair, `allowRequired` can remove it when needed to make `required` work properly. Be careful because enabling it will make `minLength` uneffective when the `string` is `empty`. |
| **ajv** | object | - | Additional options for AJV. See all the details of [ajv options](https://github.com/epoberezkin/ajv#options) on the official github page of AJV. |


<br>

## Supported Validation Packages

The validation functionalities are optional and you can choose which kind of library to import to achieve it, based on your own style preferences or needs. You can even mix these styles to achieve more flexibility.

All package listed below are not included in the `mobx-react-form` and must be installed and passed to the [Form Constructor](https://github.com/foxhound87/mobx-react-form/blob/master/DOCUMENTATION.md#form-constructor) using the `plugins` object.


| Package | Author | | | Description |
|---|---|---|---|---|
| **ajv** | epoberezkin | [GitHub&#10140;](https://github.com/epoberezkin/ajv) | [NPM&#10140;](https://www.npmjs.com/package/ajv) | A v5 compliant JSON Schema Validator with custom validation keywords support and automatic error messages |
| **validatorjs** | skaterdav85 | [GitHub&#10140;](https://github.com/skaterdav85/validatorjs) | [NPM&#10140;](https://www.npmjs.com/package/validatorjs) | Validation library inspired by Laravel's Validator with readable and declarative validation rules and error messages with multilingual support |
| **validator** | chriso | [GitHub&#10140;](https://github.com/chriso/validator.js) | [NPM&#10140;](https://www.npmjs.com/package/validator) | String validation and sanitization, useful for enhance custom validation functions |


<br>

## Remove AJV Warnings from webpack

Add this line to your webpack config in the `plugins` array:

```javascript
new webpack.IgnorePlugin(/regenerator|nodent|js\-beautify/, /ajv/)
```
