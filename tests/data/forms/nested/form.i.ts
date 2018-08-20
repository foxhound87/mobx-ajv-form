import { Form } from '../../../../src';

const values = {
  state: {
    city: {
      places: {
        centralPark: true,
        statueOfLiberty: false,
        empireStateBuilding: true,
        brooklynBridge: false,
      },
    },
  },
};

const labels = {
  state: {
    city: {
      places: {
        centralPark: 'Central Park',
        statueOfLiberty: 'Statue of Liberty',
        empireStateBuilding: 'Empire State Building',
        brooklynBridge: 'Brooklyn Bridge',
      },
    },
  },
};

export default new Form({ values, labels }, { name: 'Nested-I' });
