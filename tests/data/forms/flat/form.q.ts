import { Form } from '../../../../src';

const fields = [{
  name: 'username',
  label: 'Username',
  value: 'SteveJobs',
}, {
  name: 'email',
  label: 'Email',
  value: 's.jobs@apple.com',
}];

export default new Form({ fields }, { name: 'Flat-Q' });
