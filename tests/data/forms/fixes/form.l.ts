import validatorjs = require('validatorjs');
import { expect } from 'chai';
import { Form } from '../../../../src';

const fields = [
  'email',
];

const values = {
  email: 's.jobs@apple.com',
};

const rules = {
  email: 'required|email',
};

class NewForm extends Form {

  plugins() {
    return {
      dvr: validatorjs,
    }
  };


  options() {
    return {
      validateOnChange: false,
    };
  }

  hooks() {
    return {
      onInit(form:any) {
        form.$('email').set('type', 'email'); // #415
        form.$('email').set('value', 'notAnEmail');

        describe('Form $L onInit() checks', () => {
          it('$L state.options "validateOnChange" should be false', () =>
            expect(form.state.options.get('validateOnChange')).to.be.false);

          it('$L email value should be equal to "notAnEmail"', () =>
            expect(form.$('email').value).to.be.equal('notAnEmail'));

          it('$L email hasError should be false', () =>
            expect(form.$('email').hasError).to.be.false);

          it('$L form hasError should be false', () =>
            expect(form.hasError).to.be.false);

          it('$L form isValid should be true', () =>
            expect(form.isValid).to.be.true);
        });
      },
    };
  }
}

export default new NewForm({ fields, values, rules }, { name: 'Fixes-L' });
