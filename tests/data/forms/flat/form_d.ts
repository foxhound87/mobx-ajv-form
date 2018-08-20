import ajv = require('ajv');
import { Form } from '../../../../src';
import svkExtend from '../../extension/svk';

const fields = {
  username: 'SteveJobs',
  email: 's.jobs@apple.com',
  password: 'thinkdifferent',
  terms: true,
  devSkills: 10, // 10 should fail with exclusiveRange on
  revenue: '233.715',
  assets: 305.277,
};

const labels = {
  username: 'Username',
  email: 'E-mail',
  password: 'Password',
  terms: 'Accept Terms of Service',
};

const schema = {
  type: 'object',
  properties: {
    username: { type: 'string', minLength: 6, maxLength: 20 },
    email: {
      type: 'string', format: 'email', minLength: 5, maxLength: 20,
    },
    password: { type: 'string', minLength: 6, maxLength: 20 },
    terms: { enum: [true, false] },
    devSkills: { range: [1, 10], exclusiveRange: true },
    revenue: { type: 'number' },
    assets: { type: 'number' },
  },
};

class NewForm extends Form {

  plugins() {
    return {
      svk: {
        package: ajv,
        extend: svkExtend,
      },
    };
  }
  

  options() {
    return {
      validateOnChange: true,
    };
  }

  hooks() {
    return {
      onInit(form) {
        form.update({
          username: 'JonathanIve',
          terms: false,
          assets: 0,
          revenue: 'aaa',
          undefined: true, // this field does not exists (strictUpdate)
        });
      },
    };
  }
}

export default new NewForm({ fields, labels, schema }, { name: 'Flat-D' });
