import { Form } from '../../../../src';

const fields = [{
  name: 'name',
  label: 'Name',
}, {
  name: 'address',
  label: 'Address',
  fields: [{
    name: 'street',
    label: 'Street',
  }, {
    name: 'zip',
    label: 'ZIP Code',
  }],
}];

const values = {
  name: 'fatty',
  address: {
    street: '123 Fake St.',
    zip: '12345',
  },
};

const labels = {
  name: 'fatty-label',
  address: {
    street: 'street-label',
    zip: 'zip-label',
  },
};

class NewForm extends Form {}

export default new NewForm({ fields, values, labels }, { name: 'Fixes-P' });
