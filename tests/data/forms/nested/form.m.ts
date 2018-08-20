import { Form } from '../../../../src';

const fields = {
  club: 'HELLO',
  members: [{
    firstname: 'Clint',
    lastname: 'Eastwood',
    hobbies: ['Soccer', 'Baseball'],
  }, {
    firstname: 'Charlie',
    lastname: 'Chaplin',
    hobbies: ['Golf', 'Basket'],
  }],
};

export default new Form({ fields }, { name: 'Nested-M' });
