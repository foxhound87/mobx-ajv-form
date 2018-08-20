import { Form } from '../../../../src';
import { isEmail, shouldBeEqualTo } from '../../extension/vjf';

const fields = [{
  name: 'user',
  label: 'User',
  fields: [{
    name: 'email',
    label: 'Email',
    validators: isEmail,
    related: ['user.emailConfirm'],
  }, {
    name: 'emailConfirm',
    label: 'Confirm Email',
    value: 's.jobs@apple.com',
    validators: [isEmail, shouldBeEqualTo('user.email')],
  }, {
    name: 'password',
    label: 'Password',
    value: 'thinkdifferent',
  }, {
    name: 'devSkills',
    label: 'Dev Skills',
    value: 5,
  }],
}];

const input = {
  'user.devSkills': value => value.toString(),
};

const output = {
  'user': () => {},
  'user.devSkills': value => Number(value),
};

class NewForm extends Form {

  hooks() {
    return {
      onInit(form) {
        form.state.extra({ foo: 'bar' });
        form.update({ user: { email: 'notAnEmail' } });
        form.set('label', { user: { emailConfirm: 'Confirm User Email' } });
        form.set('default', { user: { emailConfirm: 'Default Value' } });
        form.$('user.password').invalidate('Password Invalid');
      },
    };
  }
}

export default new NewForm({ fields, input, output }, { name: 'Nested-A' });
