import { Form } from '../../../../src';

const fields = [
  'itineraryItem',
  'itineraryItems[].hotel.name',
  'itineraryItems[].hotel.starRating',
];

class NewForm extends Form {

  hooks() {
    return {
      onInit(form) {
        form.update({
          itineraryItems: [{
            hotel: {
              name: 'Shangri-La Hotel',
              starRating: '5.0',
            },
          }, {
            hotel: null,
          }, {
            hotel: {
              name: 'Trump Hotel',
              starRating: '5.0',
            },
          }],
        });

        form.$('itineraryItems').map(field =>
          field.update({
            hotel: {
              name: 'New Test Name',
              starRating: '5.0',
            },
          }));

        form.map((field) => { // eslint-disable-line
          if (field.key === 'itineraryItem') {
            field.set('itinerary-item-value');
          }
        });
      },
    };
  }
}

export default new NewForm({ fields }, { name: 'Fixes-C' });
