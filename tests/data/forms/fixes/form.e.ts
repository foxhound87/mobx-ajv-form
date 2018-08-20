import { Form } from '../../../../src';

const fields = [
  'places[]',
];

const extra = {
  places: ['a', 'b', 'c'],
};

const values = {
  places: [
    'NY',
    'NJ',
  ],
};

class NewForm extends Form {

  hooks() {
    return {
      onInit(form) {
        form.$('places').clear();
      },
    };
  }
}

export default new NewForm({ fields, values, extra }, { name: 'Fixes-E' });
