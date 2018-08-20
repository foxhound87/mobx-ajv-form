import ajv = require('ajv');
import validator =  require('validator');
import validatorjs = require('validatorjs');

import { Form } from '../../../../src';
import svkExtend from '../../extension/svk';
import { isEmailByValidator } from '../../extension/vjf';

/* ------------------------
  This form should be VALID
  ------------------------- */

const plugins = {
  vjf: validator,
  dvr: validatorjs,
  svk: {
    package: ajv,
    extend: svkExtend,
  },
};

const fields = {
  username: {
    label: 'Username',
    value: 'SteveJobs',
    rules: 'alpha|between:6,20',
    placeholder: 'Username Placeholder',
  },
  email: {
    label: 'Email',
    value: 's.jobs@apple.com',
    validators: [isEmailByValidator],
  },
  password: {
    label: 'Password',
    value: 'thinkdifferent',
    rules: 'confirmed',
  },
  password_confirmation: {
    label: 'Password Confirmation',
    value: 'thinkdifferent',
  },
  passwordConfirmation1: {
    label: 'Password Confirmation 1',
    value: 'thinkdifferent',
    rules: 'required|same:password', // target: password_confirmation
  },
  passwordConfirmation2: {
    label: 'Password Confirmation 2',
    rules: 'required',
    value: null, // should invalidate the field
    disabled: true, // should not validate the field
  },
  terms: {
    label: 'Accept Terms',
    value: true,
  },
  devSkills: {
    label: 'Dev Skills',
    value: 5,
    input: value => value.toString(), // (user to store)
    output: value => Number(value), // (store to user)
  },
  revenue: {
    label: 'Revenue (Billion $)',
    value: '233.715',
  },
  assets: {
    label: 'Assets (Billion $)',
    value: 305.277,
  },
};

const schema = {
  type: 'object',
  properties: {
    // username: { type: 'string', minLength: 6, maxLength: 20 },
    email: {
      type: 'string', format: 'email', minLength: 5, maxLength: 20,
    },
    password: { type: 'string', minLength: 6, maxLength: 20 },
    terms: { enum: [true, false] },
    devSkills: { range: [5, 10] },
    revenue: { type: 'number' },
    assets: { type: 'number' },
  },
};

export default new Form({ fields, schema }, { plugins, name: 'Flat-A' });
