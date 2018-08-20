import validatorjs = require('validatorjs');
import { Form } from '../../../../src';

const fields = [
  'jobs',
  'jobs[].jobId',
  'jobs[].companyName',
  'number',
  'people[].name',
  'array[].name',
  'items[].name',
];

const values = {
  jobs: [],
  number: 1,
  people: [{
    name: 'bob',
  }],
  array: [{
    name: 'bob',
  }],
  items: [{
    name: 'bob',
  }],
};

const rules = {
  'jobs[].companyName': 'required|string|between:3,75',
};

const plugins = {
  dvr: validatorjs,
};

class NewForm extends Form {

  options() {
    return {
      validateOnChange: true,
    };
  }

  hooks() {
    return {
      onInit(form:any) {
        form.$('jobs').add({
          jobId: 1,
          companyName: 'x',
        });

        form.$('number').set(0);

        form.$('people').set([
          { name: null },
        ]);

        form.$('items').set('value', [
          { name: 0 },
        ]);

        form.update({
          array: [
            { name: null },
            { name: null },
            { name: null },
          ],
        });
      },
    };
  }
}

export default new NewForm({ fields, values, rules }, { plugins, name: 'Fixes-M' });
