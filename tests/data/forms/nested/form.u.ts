import { expect } from 'chai';
import { Form } from '../../../../src';
import { isEmail, shouldBeEqualTo } from '../../extension/vjf';

const fields = [
  'user',
  // TO FIX
  // 'user.email',
  // 'user.emailConfirm',
];

const labels = {
  user: {
    email: 'Email',
    emailConfirm: 'Confirm Email',
  },
};

const values = {
  user: {
    email: 's.jobs@apple.com',
    emailConfirm: 's.jobs@apple.com',
  },
};

const validators = {
  'user.email': isEmail,
  'user.emailConfirm': [isEmail, shouldBeEqualTo('user.email')],
};

const related = {
  'user.email': ['user.emailConfirm'],
};

class NewForm extends Form {

  options() {
    return {
      validateOnChange: true,
      showErrorsOnChange: false,
    };
  }

  hooks() {
    return {
      onInit(form) {
        // this.$('user.email')
        //   .on('update', ({ path, event, change }) => {
        //     describe('Check Nested-U $("user.email").on("update") hook', () => {
        //       it('event should be equal to change.name', () =>
        //           expect(event).to.be.equal(change.name));
        //       it('event should be equal to change.name', () =>
        //           expect(path).to.be.equal('user.email'));
        //     });
        //   });

        form.observe({
          path: 'user.email',
          key: 'value',
          call: ({ change }) => describe('Check Nested-U observer', () =>
            it('change.newValue should be equal to "notAnEmail"', () =>
              expect(change.newValue).to.be.equal('notAnEmail'))),
        });

        form.update({ user: { email: 'notAnEmail' } });
      },
    };
  }
}

export default new NewForm({
  fields, values, labels, validators, related,
}, { name: 'Nested-U' });

