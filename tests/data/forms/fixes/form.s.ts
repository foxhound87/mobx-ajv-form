import { Form } from '../../../../src';

const struct = [
  'array',
];

class NewForm extends Form {

  hooks() {
    return {
      onInit(form:any) {
        form.$('array').add({ name: 'item_to_delete' });
        form.del('array.item_to_delete');

        form.$('array').add({ name: 'item_to_delete2' });
        form.$('array').del('item_to_delete2');

        form.add({ name: 'item_to_delete_3' });
        form.del('item_to_delete_3');
      },
    };
  }
}

export default new NewForm({ struct }, { name: 'Fixes-S' });
