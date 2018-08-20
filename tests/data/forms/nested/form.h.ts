import { Form } from '../../../../src';
import { isInt } from '../../extension/vjf';

const fields = {
  state: {
    label: 'State',
    value: 'USA',
    fields: {
      city: {
        label: 'City',
        value: 'New York',
        fields: {
          places: {
            label: 'NY Places',
            value: 'NY Places',
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

const validators = {
  'state': isInt,
  'state.city': isInt,
  'state.city.places': isInt,
};

export default new Form({ fields, validators }, { name: 'Nested-H' });
