import { expect } from 'chai';

import $flat from './data/_.flat'; // FORMS
import $fixes from './data/_.fixes'; // FORMS

describe('Field values checks', () => {
  it('Fixes $A state.options.get(loadingMessage) should be equal to "Custom Loading Message..."', () =>
    expect($fixes.$A.state.options.get('loadingMessage')).to.be.equal('Custom Loading Message...'));
});

describe('Check Flat $B error prop', () => {
  it('Flat $B state.options defaultGenericError should be equal to "Custom Generic Error"', () =>
    expect($flat.$B.state.options.get('defaultGenericError')).to.be.equal('Custom Generic Error'));
});

describe('Check Flat $I error prop', () => {
  it('Flat $I state.options.get(strictUpdate) should be true', () =>
    expect($flat.$I.state.options.get('strictUpdate')).to.be.true);

  it('Flat $I state.options.get() should be an object', () =>
    expect($flat.$I.state.options.get()).to.be.an('object'));
});
