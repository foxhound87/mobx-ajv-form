import { Form } from '../../../../src';
import { shouldBeEqualTo } from '../../extension/vjf';

const fields = [
  'singleFieldArray',
  'singleFieldEmptyArray',
  'singleFieldEmptyObject',
  'items[].name',
  'items[].alternateName',
];

const labels = {
  'items[].name': 'Name Label',
  'items[].alternateName': 'Alternate Name Label',
};

const values = {
  items: [{
    name: 'Item #A',
    alternateName: 'Alternate Name #AA',
  }, {
    name: 'Item #B',
  }],
};

class NewForm extends Form {

  hooks() {
    return {
      onInit(form) {
        form.update({
          items: [
            ...form.$('items').values(),
            {
              name: 'Item #3',
              alternateName: 'Alternate Name #3',
            },
          ],
        });


        form.$('singleFieldArray').set(['x']);
        form.$('singleFieldEmptyArray').set([]);
        form.$('singleFieldEmptyObject').set({});

        form.$('items').$(0).$('name').set('validators', [shouldBeEqualTo('items[0].alternateName')]);
        form.$('items').$(0).$('name').set('related', ['items[0].alternateName']);
        form.$('items').$(0).$('name').set('extra', ['a', 'b', 'c']);
      },
    };
  }
}

export default new NewForm({ fields, labels, values }, { name: 'Fixes-H' });
