import { expect } from 'chai';

import $ from './data/_.fixes'; // FORMS

// $M
describe('$M Check jobs[0] ', () => {
  it('$M Check jobs[0]', (done) => {
    $.$M.$('jobs[0]').validate()
      .then(({ isValid }) => {
        // eslint-disable-next-line
        expect(isValid).to.be.false;
        done();
      });
  });
});

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

describe('Check before/after $U validation', () => {
  it('$U from hasError should be true', () =>
    expect($.$U.$('from').hasError).to.be.true);

  it('$U from error message should be equal to "The FROM must be equal or before TO."', () =>
    expect($.$U.$('from').error).to.be.equal('The FROM must be equal or before TO.'));

  it('$U to hasError should be true', () =>
    expect($.$U.$('to').hasError).to.be.true);

  it('$U to error message should be equal to "The TO must be after FROM."', () =>
    expect($.$U.$('to').error).to.be.equal('The TO must be after FROM.'));
});