import validatorjs = require('validatorjs');
import { Form } from '../../../../src';

const plugins = { dvr: validatorjs };

const fields = [
  'people',
  'people[]',
  'inventoryLevel.value',
  'addOns[].nested.value',
];

const values = {
  emptyArray: [],
  people: [1, 2, 3, 4, 5, 6],
  inventoryLevel: {
    value: 2,
  },

  addOns: [{
    nested: {
      value: 3,
    },
  }],
};

const rules = {
  emptyArray: 'required|array',
  people: 'required|array|between:3,5',
};

export default new Form({ fields, values, rules }, { plugins, name: 'Fixes-B' });
