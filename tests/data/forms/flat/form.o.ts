import { Form } from '../../../../src';

const values = {
  username: 'SteveJobs',
  email: 's.jobs@apple.com',
  terms: true,
};

const labels = {
  username: 'Username',
  email: 'Email',
  password: 'Password',
  passwordConfirm: 'Confirm Password',
  terms: 'Accept Terms of Service',
};

class NewForm extends Form {

  options() {
    return {
      validateOnChange: true,
    };
  }

  hooks() {
    return {
      onInit(form) {
        form.invalidate();

        form.update({
          undefined: 'undefined',
          username: 'TestUser',
        });

        form.set('label', {
          undefined: 'undefined',
          email: 'E-mail',
        });
      },
    };
  }
}

export default new NewForm({ values, labels }, { name: 'Flat-O' });
