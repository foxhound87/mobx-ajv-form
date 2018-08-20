import { expect } from 'chai';

import $ from './data/_.nested'; // FORMS

describe('Form state extra', () => {
  it('$A state.$extra should have "foo" property', () =>
    expect($.$A.state.$extra).to.have.property('foo'));

  it('$A state.$extra "foo" prop should be "bar"', () =>
    expect($.$A.state.extra('foo')).to.be.equal('bar'));

  it('$B state.extra() should be array', () =>
    expect($.$B.state.extra()).to.be.instanceof(Array));
});
