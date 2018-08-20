import { Form } from '../../../../src';

const fields = [
  'hobbies[]',
  'member.data[]',
  'member.hobbies[]',
  'member.info[]',
  'member.info[].firstname',
  'member.info[].lastname',
  'member.info[].hasError',
  'member.info[].type',
  'member.info[].label',
  'member.info[].bindings',
  'notIncrementalFields[]',
];

class NewForm extends Form {

  hooks() {
    return {
      onInit(form) {
        form.$('hobbies').add({ value: 'AAA' });
        form.$('hobbies').add({ value: 'BBB' });
        form.$('hobbies').add({ value: 'CCC' });
        form.$('hobbies').add({ value: 'DDD' });
        form.$('hobbies').add({ value: 'EEE' });
        // hobbies[] length: 5

        form.del('hobbies[0]');
        form.del('hobbies[2]');
        form.$('hobbies').del(3);
        // hobbies[] length should be 2

        // form.add('member.hobbies'); // OLD
        form.$('member.hobbies').add({ value: 'AAA' }); // 1
        form.$('member.hobbies').add({ value: 'BBB' }); // 2
        form.$('member.hobbies').add({ value: 'CCC' }); // 3
        form.$('member.hobbies').add({ value: 'DDD' }); // 4
        form.$('member.hobbies').add({ value: 'EEE' }); // 5
        form.$('member.hobbies').add({ value: 'FFF' }); // 6
        // member.hobbies[] length: 6

        form.del('member.hobbies[0]');
        form.del('member.hobbies[2]');
        form.$('member.hobbies').del(3);
        form.$('member').del('hobbies[4]');
        // hobbies[] length should be 2

        // add multiple fileds at once
        form.$('member.info').add([{
          firstname: 'AAA',
          lastname: 'BBB',
          type: 'XXX',
        }, {
          firstname: 'AAA-2',
          lastname: 'BBB-2',
          type: 'XXX-2',
        }]);

        form.$('member.info').add([{
          firstname: '111',
          lastname: '222',
          type: 'YYY',
        }]);

        form.$('member.data').add([{
          update: 'update-value',
        }]);

        form.$('member.data[0]').add({
          name: 'subzero',
          value: 'subzero-value',
          label: 'subzero-label',
        });

        form.$('notIncrementalFields').add({
          key: 'notIncrementalKey',
          value: 'XXX',
          label: 'XXX-label',
        });

        form.$('notIncrementalFields').add({
          name: 'anotherNotIncrementalKey',
          value: 'XXX',
        });

        form.$('notIncrementalFields').add({
          name: 'anotherOneNotIncrementalKey',
          value: 'XXX',
        });

        form.del('notIncrementalFields[anotherOneNotIncrementalKey]');
        form.$('notIncrementalFields').del('anotherNotIncrementalKey');
        form.$('notIncrementalFields').focus();
      },
    };
  }
}

export default new NewForm({ fields }, { name: 'Nested-T' });
