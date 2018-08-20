import { Form } from '../../../../src';

const fields = [
  'multiselectArray',
  'multiselectObject',
  'tags[]',
  'tags[].id',
  'tags[].name',
];

const values = {
  multiselectArray: ['iMac', 'iPhone'],
  multiselectObject: { value: 'watch', label: 'Watch' },
};

class NewForm extends Form {}

export default new NewForm({ fields, values }, { name: 'Fixes-Q2' });

