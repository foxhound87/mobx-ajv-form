import { expect } from 'chai';
import validatorjs = require('validatorjs');
import { Form } from '../../../../src';

const fields = [
  'club.name',
  'club.city',
  'club.bouncer',
  'members',
  'members[].firstname',
  'members[].lastname',
  'members[].hobbies',
  'members[].hobbies[]',
];

const rules = {
  'club.name': 'required|integer',
  'club.city': 'required|integer',
  'members[].firstname': 'required|integer',
  'members[].lastname': 'required|integer',
  'members[].hobbies': 'required|integer',
  'members[].hobbies[]': 'required|integer',
};

const checkObserverNewValue = (path, $path, newValue, $value) => {
  if (path !== $path) return;
  it(`members.0.hobbies.0 change.newValue should be equal to "${$value}"`, () =>
    expect(newValue).to.be.equal($value));
};

const interceptors = {
  'club.city': [{
    key: 'value',
    call: ({ form, change }) => {
      describe('Check Nested-S $value@club.city Disposers:', () =>
        it('Disposers should have $value@club.city prop', () =>
          expect(form.state.disposers.interceptor).to.have.property('$value@club.city')));

      return change;
    },
  }],
};

const observers = {
  'club': [{
    key: 'value',
    call: ({ form }) => describe('Check Nested-S value@club Disposers:', () =>
      it('Disposers should have value@club prop', () =>
        expect(form.state.disposers.observer).to.have.property('value@club'))),
  }],
  'members': [{
    key: 'fields',
    call: ({ form }) => describe('Check Nested-S fields@members Disposers:', () =>
      it('Disposers should have fields@members prop', () =>
        expect(form.state.disposers.observer).to.have.property('fields@members'))),
  }],
  'members[].hobbies[]': [{
    key: 'value',
    call: ({ change, path }) =>
      describe('Check Nested-S value@members[].hobbies[] Disposers:', () => {
        checkObserverNewValue(path, 'members.0.hobbies.0', change.newValue, 'members-0-hobbies-0-set-value');
        checkObserverNewValue(path, 'members.0.hobbies.1', change.newValue, 'members-0-hobbies-1-set-value');
        checkObserverNewValue(path, 'members.1.hobbies.0', change.newValue, 'members-1-hobbies-0-set-value');
        checkObserverNewValue(path, 'members.1.hobbies.1', change.newValue, 'members-1-hobbies-1-set-value');
      }),
  }],
};

const values = {
  club: {
    name: 'HELLO',
    city: 'NY',
  },
  members: [{
    firstname: 'Clint',
    lastname: 'Eastwood',
    hobbies: ['Soccer', 'Baseball'],
  }, {
    firstname: 'Charlie',
    lastname: 'Chaplin',
    hobbies: ['Golf', 'Basket'],
  }],
};

class NewForm extends Form {

  plugins() {
      return {
        dvr: validatorjs,
      };
    }
  
  setup() {
    // omit "rules" (use constructor)
    return {
      fields, values, observers, interceptors,
    };
  }

  hooks() {
    return {
      onInit(form) {
        form.$('club.name').intercept((data) => {
          // eslint-disable-next-line
          data.change.newValue = data.change.newValue + '-intercepted';
          return data.change;
        });

        // same as form.set('value', { ... });
        form.set({
          club: {
            name: 'club-name-set-value',
            city: 'club-city-set-value',
            bouncer: undefined,
          },
        });

        form.set('value', {
          members: [{
            firstname: 'members-0-firstname-set-value',
            lastname: 'members-0-lastname-set-value',
            hobbies: [
              'members-0-hobbies-0-set-value',
              'members-0-hobbies-1-set-value',
            ],
          }, {
            firstname: 'members-1-firstname-set-value',
            lastname: 'members-1-lastname-set-value',
            hobbies: [
              'members-1-hobbies-0-set-value',
              'members-1-hobbies-1-set-value',
            ],
          }],
        });

        // dispose all hobbies 'value' observers recursively
        form.$('members')
          .map(members => members.$('hobbies')
            .map(hobbies => hobbies.dispose({
              type: 'observer',
              key: 'value',
            })));

        form.$('club.name').dispose({
          type: 'interceptor',
        });

        describe('Check Nested-S Disposers:', () => {
          it('Disposers should not have $value@club.name prop', () =>
            expect(form.state.disposers.interceptor).not.to.have.property('$value@club.name'));

          it('Disposers should not have value@club.name prop', () =>
            expect(form.state.disposers.interceptor).not.to.have.property('value@club.name'));

          it('Disposers should have $value@club.city prop', () =>
            expect(form.state.disposers.interceptor).to.have.property('$value@club.city'));

          it('Disposers should not have value@club.city prop', () =>
            expect(form.state.disposers.interceptor).not.to.have.property('value@club.city'));

          it('Disposers should not have value@members.0.hobbies.0 prop', () =>
            expect(form.state.disposers.observer).not.to.have.property('value@members.0.hobbies.0'));
        });
      },
    };
  }
}


export default new NewForm({ rules }, { name: 'Nested-S' });
