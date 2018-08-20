import validatorjs = require('validatorjs');
import { Form } from '../../../../src';
import dvrExtend from '../../extension/dvr';
import { shouldBeEqualTo } from '../../extension/vjf';

const fields = ['username', 'email', 'password', 'passwordConfirm', 'terms'];

const values = {
  username: 'SteveJobs',
  email: 's.jobs@apple.com',
  terms: true,
};

const defaults = {
  username: 'TestUser',
};

const labels = {
  passwordConfirm: 'Confirm Password',
};

const validators = {
  email: shouldBeEqualTo('username'), // should fail
};

const rules = {
  username: 'email', // should fail
};

const disabled = {
  terms: true,
};

class NewForm extends Form {

  plugins()  {
    return {
   
      dvr: {
        package: validatorjs,
        extend: dvrExtend,
      },
    };
  }

  hooks() {
    return {
      onInit(form) {
        form.$('username').set('label', 'UserName');
        form.reset();
      },
    };
  }
}


export default new NewForm({

  fields, values, defaults, labels, disabled, validators, rules,

}, { name: 'Flat-P' });
