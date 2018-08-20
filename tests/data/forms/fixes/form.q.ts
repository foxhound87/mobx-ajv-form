import { Form } from '../../../../src';

const fields = [
  // FIX: #282 (reserved keywords)
  'incident',
  'incident[].type',
  'incident[].value',
  'incident[].options',
  'arrayFieldA[]',
  'arrayFieldA[].id',
  'arrayFieldA[].name',
  'arrayFieldB[]',
  'arrayFieldB[].id',
  'arrayFieldB[].name',
  'arrayFieldB[].value',
];

class NewForm extends Form {

  hooks() {
    return {
      onInit(form:any) {
        // FIX: #282 (reserved keywords)
        form.$('incident').add();

        // FIX #324
        form.update({ arrayFieldA: [{ id: 1, name: 'name' }] });
        form.update({ arrayFieldB: [{ id: 1, name: 'name', value: 'some val' }] });
      },
    };
  }
}

export default new NewForm({ fields });
