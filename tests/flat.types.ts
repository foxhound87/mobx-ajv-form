import * as _ from 'lodash';
import { expect, assert } from 'chai';

import $forms from './data/_.flat'; // FORMS


const checkHelperIsObject = helper =>
  _.each($forms, (form, key) => it(`${key} ${helper}() is object`, () =>
    assert.isObject(form[helper](), `${key}.${helper}() is not object`)));

const checkComputedIsBoolean = computed =>
  _.each($forms, (form, key) => it(`${key} ${computed} is boolean`, () =>
    assert.isBoolean(form[computed], `${key}.${computed} is not boolean`)));


describe('Check validate() returns promise that resolves to boolean', () => {
  _.each($forms, (form, key) => (
    it(`${key} validate() is promise that resolves to boolean`, () => {
      const promise = form.validate();
      expect(promise).to.be.a('promise');
      return promise.then(result => expect(result.isValid).to.be.a('boolean'));
    })
  ));
});

describe('Check FORM validate(key) returns promise that resolves to boolean', () => (
  _.each($forms, (form, formKey) => describe(`${formKey} form`, () => (
    form.each(field => (
      it(`validate('${field.path}') is promise that resolves to boolean`, () => {
        const promise = form.validate(field.path);
        expect(promise).to.be.a('promise');
        return promise.then(result => expect(result.isValid).to.be.a('boolean'));
      })
    ))
  )))
));

describe('Check FIELD validate(key) returns promise that resolves to boolean', () => (
  _.each($forms, (form, formKey) => describe(`${formKey} form`, () => (
    form.each(field => (
      it(`validate('${field.path}') is promise that resolves to boolean`, () => {
        const promise = field.validate();
        expect(promise).to.be.a('promise');
        return promise.then(result => expect(result.isValid).to.be.a('boolean'));
      })
    ))
  )))
));

describe('Check form helpers returns object', () => {
  checkHelperIsObject('types');
  checkHelperIsObject('get');
  checkHelperIsObject('values');
  checkHelperIsObject('errors');
  checkHelperIsObject('labels');
  checkHelperIsObject('placeholders');
  checkHelperIsObject('defaults');
  checkHelperIsObject('initials');
});

describe('Check form computed returns boolean', () => {
  checkComputedIsBoolean('validating');
  checkComputedIsBoolean('hasError');
  checkComputedIsBoolean('isDirty');
  checkComputedIsBoolean('isPristine');
  checkComputedIsBoolean('isDefault');
  checkComputedIsBoolean('isValid');
  checkComputedIsBoolean('isEmpty');
  checkComputedIsBoolean('focused');
  checkComputedIsBoolean('touched');
  checkComputedIsBoolean('changed');
  checkComputedIsBoolean('disabled');
});
