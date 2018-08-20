import { Form } from '../../../../src';

const fields = {
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

export default new Form({ fields }, { name: 'Nested-L' });
