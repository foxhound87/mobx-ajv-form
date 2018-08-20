import { Form } from '../../../../src';
import NewFormBindings from '../../extension/_.bindings';

const fields = [
  'nested.field',
  'club.name',
  'club.city',
  'members',
  'members[].firstname',
  'members[].lastname',
  'members[].hobbies',
  'members[].hobbies[]',
];

const values = {
  nested: {
    field: 5,
  },
  club: 'HELLO',
  members: [{
    firstname: 'Clint',
    lastname: '',
    hobbies: ['Soccer', 'Baseball'],
  }, {
    firstname: null,
    lastname: 'Chaplin',
    hobbies: ['Golf', 'Basket'],
  }],
};

const input = {
  'nested.field': value => value.toString(),
};

const output = {
  'nested.field': value => Number(value),
};

const labels = {
  'members[].firstname': 'First Name Label',
};

const placeholders = {
  'club': 'Insert Club',
  'club.name': 'Insert Club Name',
  'club.city': 'Insert Club City',
  'members': 'Insert All Members',
  'members[].firstname': 'Insert First Name',
  'members[].lastname': 'Insert Last Name',
  'members[].hobbies[]': 'Insert Hobbies', // this is overwritten by props
};

const bindings = {
  'club.name': 'MaterialTextFieldRewriter',
  'club.city': 'MaterialTextFieldRewriter',
  'members[].firstname': 'MaterialTextFieldTemplate',
  'members[].lastname': 'MaterialTextFieldTemplate',
  'members[].hobbies[]': 'MaterialTextFieldRewriter',
};

class NewForm extends Form {

  bindings() {
    return NewFormBindings;
  }
}

export default new NewForm({
  fields, values, input, output, placeholders, bindings, labels,
}, { name: 'Nested-N' });
