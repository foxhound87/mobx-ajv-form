import { Form } from '../../../../src';

const struct = [
  'roles[]',
  'roles[].id',
  'array[]',
  'array[].id',
];

class NewForm extends Form {

  hooks() {
    return {
      onInit(form:any) {
        form.$('array').add(); // 0
        form.$('array').add(); // 1
        form.$('array').add(); // 2

        form.$('array').del(0);

        const proxy = new Proxy({
          preventDefault: () => {},
        }, {});

        form.$('array').onDel(proxy, 1);
        form.$('array[2]').onDel(proxy);
      },
    };
  }
}

export default new NewForm({ struct }, { name: 'Fixes-O' });
