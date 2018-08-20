import { Form } from '../../../../src';

const struct = [
  'tags[]',
  'tags[].id',
  'tags[].name',
];

const fields = [{
  name: 'tags',
  label: 'Tags!!!',
}, {
  name: 'other',
  label: 'Other!!!',
  fields: [{
    name: 'nested',
    value: 'nested-value',
  }],
}];

class NewForm extends Form {

  hooks() {
    return {
      onInit(form:any) {
        form.$('tags').add([{
          id: 'x',
          name: 'y',
        }]);

        // EQUIVALENT
        // this.$('tags').add();
        // this.$('tags[0]').set({
        //   id: 'x',
        //   name: 'y',
        // });

        // EQUIVALENT
        // this.update({
        //   tags: [{
        //     id: 'x',
        //     name: 'y',
        //   }],
        // });
      },
    };
  }

}

export default new NewForm({ struct, fields }, { name: 'Fixes-Q1' });
