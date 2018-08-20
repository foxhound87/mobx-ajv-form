import ajv = require('ajv');
import validatorjs = require('validatorjs');

import { Form } from '../../../../src';
import svkExtend from '../../extension/svk';

const options = {
  alwaysShowDefaultError: true,
  defaultGenericError: 'Custom Generic Error',
};

const plugins = {
  dvr: validatorjs,
  svk: {
    package: ajv,
    extend: svkExtend,
  },
};

const fields = {
  username: {
    label: 'Username',
  },
  email: {
    label: 'Email',
    rules: 'required|email|between:5,20',
  },
  password: {
    label: 'Password',
  },
  devSkills: {
    label: 'Dev Skills',
  },
};

const schema = {
  type: 'object',
  properties: {
    username: { type: 'string', minLength: 6, maxLength: 20 },
    // email: { type: 'string', format: 'email', minLength: 5, maxLength: 20 },
    password: { type: 'string', minLength: 6, maxLength: 20 },
    devSkills: { range: [1, 10] },
  },
};

export default new Form({ fields, schema }, { options, plugins, name: 'Flat-B' });
