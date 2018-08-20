import MobxReactForm, { Field } from '../../../../src';
import { isEmail, shouldBeEqualTo } from '../../extension/vjf';

const fields = {
  email: {
    label: 'Username',
    value: 's.jobs@apple.com',
    validators: [isEmail],
    related: ['emailConfirm'],
  },
  emailConfirm: {
    label: 'Email',
    value: 's.jobs@apple.com',
    validators: [isEmail, shouldBeEqualTo('email')],
  },
};

class NewField extends Field {

  newFieldProp = false;

  constructor(data) {
    super(data);

    this.newFieldProp = true;
  }
}

class NewForm extends MobxReactForm {

  makeField(data) {
    return new NewField(data);
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
          email: 'invalid',
        });
      },
    };
  }
}


export default new NewForm({ fields }, { name: 'Flat-R' });
