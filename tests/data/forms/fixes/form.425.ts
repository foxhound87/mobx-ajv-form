import { Form } from '../../../../src';

const fields = [{
  name: '1a',
  value: ' ',
  label: '1aa',
}, {
  name: '2a',
  value: ' ',
  label: '2aa',
}, {
  name: '3a',
  value: ' ',
  label: '3aa',
}];

class NewForm extends Form {}

export default new NewForm({ fields }, { name: 'Fixes-425' });

