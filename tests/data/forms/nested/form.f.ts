import validatorjs = require('validatorjs');
import { Form } from '../../../../src';

const plugins = {
  dvr: validatorjs,
};

const fields = {
  state: {
    label: 'State',
    value: 'USA',
    rules: 'integer',
    fields: {
      city: {
        label: 'City',
        value: 'New York',
        rules: 'integer',
        fields: {
          places: {
            label: 'NY Places',
            value: 'NY Places',
            rules: 'integer',
            fields: {
              centralPark: {
                label: 'Central Park',
                value: true,
              },
              statueOfLiberty: {
                label: 'Statue of Liberty',
                value: false,
              },
              empireStateBuilding: {
                label: 'Empire State Building',
                value: true,
              },
              brooklynBridge: {
                label: 'Brooklyn Bridge',
                value: true,
              },
            },
          },
        },
      },
    },
  },
};

export default new Form({ fields }, { plugins, name: 'Nested-F' });
