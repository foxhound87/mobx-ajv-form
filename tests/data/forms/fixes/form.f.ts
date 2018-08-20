import { Form } from '../../../../src';

const fields = [
  'ids[]',
  'inventoryLevel',
  'inventoryLevel.value',
  'places[]',
  'skills[]',
  'date[]',
  'members[].hobbies[]',
];

const values = {
  date: new Date(1976, 5, 2),
  inventoryLevel: {
    value: 2,
  },
  places: [
    'NY',
    'NJ',
  ],
};

class NewForm extends Form {

  hooks() {
    return {
      onInit(form) {
        form.update({ ids: [1, 2, 3] });
        form.update({ places: ['NY', 'NJ', 'AR'] });
        form.update({ places: ['NY', 'NJ'] });
        form.update({ skills: [] });
        form.update({ date: new Date(1976, 6, 3) });

        form.update({
          members: [{
            hobbies: ['Soccer', 'Baseball', 'Basket'],
          }, {
            hobbies: [],
          }],
        });
      },
    };
  }
}

export default new NewForm({ fields, values }, { name: 'Fixes-F' });
