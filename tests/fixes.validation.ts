import { expect } from 'chai';

import $ from './data/_.fixes'; // FORMS

describe('Check Fixes $B validation', () => {
  it('$B people isValid should be false', () =>
    expect($.$B.$('people').isValid).to.be.false);

  it('$B people hasError should be true', () =>
    expect($.$B.$('people').hasError).to.be.true);

  it('$B emptyArray isValid should be false', () =>
    expect($.$B.$('emptyArray').isValid).to.be.false);

  it('$B emptyArray hasError should be true', () =>
    expect($.$B.$('emptyArray').hasError).to.be.true);
});

