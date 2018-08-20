import { Form } from '../../../../src';

const fields = ['qwerty'];

const values = { qwerty: 0 };

class NewForm extends Form {

  hooks() {
    return {
      onInit(form) {
        form.state.options.set({
          loadingMessage: 'Custom Loading Message...',
        });
      },
    };
  }
}

export default new NewForm({ fields, values }, { name: 'Fixes-A' });
