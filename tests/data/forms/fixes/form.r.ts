import { Form } from '../../../../src';

const fields = [{
  name: 'organization',
  fields: [{
    name: 'nested',
  }],
}];

class NewForm extends Form {}

export default new NewForm({ fields }, { name: 'Fixes-R' });
