import { Form } from '../../../../src';

const fields = {
  username: {
    label: 'Username',
  },
  email: {
    label: 'Email',
  },
  password: {
    label: 'Password',
  },
};

export default new Form({ fields }, { name: 'Flat-G' });
