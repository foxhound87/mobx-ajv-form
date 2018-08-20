import validatorjs = require('validatorjs');
import { Form } from '../../../../src';

// const fields = [{
//   name: 'name',
//   label: 'Name',
//   rules: 'required|string|between:5,50',
// }, {
//   name: 'address',
//   label: 'Address',
//   fields: [{
//     name: 'street',
//     label: 'Street',
//     rules: 'required|string',
//   }, {
//     name: 'zip',
//     label: 'ZIP Code',
//     rules: 'required|string',
//   }],
// }];

const fields = [
  'name',
  'address',
  'address.street',
  'address.zip',
];

const rules = {
  'name': 'required|string|between:5,50',
  'address.street': 'required|string',
  'address.zip': 'required|string',
};

const plugins = {
  dvr: validatorjs,
};

const values = {
  name: 'fatty',
  address: {
    street: '123 Fake St.',
    zip: '12345',
  },
};

class NewForm extends Form {}

export default new NewForm({ fields, rules, values }, { plugins, name: 'Fixes-N' });
