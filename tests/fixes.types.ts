import { expect } from 'chai';

import $ from './data/_.fixes'; // FORMS


describe('$L Field types checks', () => {
  it('$L email type should be equal to "email"', () =>
    expect($.$L.$('email').type).to.be.equal('email')); // #415
});
