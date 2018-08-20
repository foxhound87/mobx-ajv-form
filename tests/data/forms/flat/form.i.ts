import ajv = require('ajv');
import { Form } from '../../../../src';

const plugins = { svk: ajv };

const fields = {
  username: {
    label: 'Username',
    value: 'SteveJobs',
  },
  email: {
    label: 'Email',
    value: 's.jobs@apple.com',
  },
  password: {
    label: 'Password',
    value: 'thinkdifferent',
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
  },
};

class NewForm extends Form {

  options() {
    return {
      strictUpdate: true,
    };
  }

  hooks() {
    return {
      onInit(form) {
        form.update({ username: 'JonathanIve' });
        form.reset(); // to default or initial values
      },
    };
  }
}

export default new NewForm({ fields, schema }, { plugins, name: 'Flat-I' });
