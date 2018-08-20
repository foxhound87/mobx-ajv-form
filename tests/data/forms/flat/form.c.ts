import ajv = require('ajv');
import { Form } from '../../../../src';
import svkExtend from '../../extension/svk';

const plugins = {
  svk: {
    package: ajv,
    extend: svkExtend,
  },
};

const fields = {
  username: {
    label: 'Username',
    value: '',
  },
  email: {
    label: 'Email',
    value: '',
  },
  password: {
    label: 'Password',
    value: '',
  },
  devSkills: {
    label: 'Dev Skills',
    value: 1,
  },
};

const schema = {
  type: 'object',
  properties: {
    username: { type: 'string', minLength: 6, maxLength: 20 },
    email: {
      type: 'string', format: 'email', minLength: 5, maxLength: 20,
    },
    password: { type: 'string', minLength: 6, maxLength: 20 },
    devSkills: { range: [1, 10] },
  },
};

class NewForm extends Form {

  hooks() {
    return {
      onInit(form:any) {
        form.invalidate('The user already exist');
      },
    };
  }
}

export default new NewForm({ fields, schema }, { plugins, name: 'Flat-C' });
