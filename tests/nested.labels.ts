import { expect } from 'chai';

import $ from './data/_.nested'; // FORMS

describe('Check Nested $A Unified Properties (label)', () => {
  it('$A user.email label should be equal to "Email"', () =>
    expect($.$A.$('user.email').label).to.be.equal('Email'));

  it('$A user.emailConfirm label should be equal to "Confirm User Email"', () =>
    expect($.$A.$('user.emailConfirm').label).to.be.equal('Confirm User Email'));

  it('$A user.emailConfirm default should be equal to "Default Value"', () =>
    expect($.$A.$('user.emailConfirm').default).to.be.equal('Default Value'));
});

describe('Check Nested $I Separated Properties (labels)', () => {
  it('$I state.city.places.centralPark label should be equal to "Central Park"', () =>
    expect($.$I.$('state.city.places.centralPark').label).to.be.equal('Central Park'));

  it('$I state.city.places.statueOfLiberty label should be equal to "Statue of Liberty"', () =>
    expect($.$I.$('state.city.places.statueOfLiberty').label).to.be.equal('Statue of Liberty'));

  it('$I state.city.places.empireStateBuilding label should be equal to "Empire State Building"', () =>
    expect($.$I.$('state.city.places.empireStateBuilding').label).to.be.equal('Empire State Building'));

  it('$I state.city.places.brooklynBridge label should be equal to "Brooklyn Bridge"', () =>
    expect($.$I.$('state.city.places.brooklynBridge').label).to.be.equal('Brooklyn Bridge'));
});

describe('Check Nested $O Separated Properties (labels)', () => {
  it('$O club label should be equal to "Label Club"', () =>
    expect($.$O.$('club').label).to.be.equal('Label Club'));

  it('$O club.name label should be equal to "Label Club Name"', () =>
    expect($.$O.$('club.name').label).to.be.equal('Label Club Name'));

  it('$O club.city label should be equal to "Label Club City"', () =>
    expect($.$O.$('club.city').label).to.be.equal('Label Club City'));

  it('$O members label should be equal to "Label Members"', () =>
    expect($.$O.$('members').label).to.be.equal('Label Members'));

  it('$O members[1].firstname label should be equal to "Label Member FirstName"', () =>
    expect($.$O.$('members[1].firstname').label).to.be.equal('Label Member FirstName'));

  it('$O members[1].hobbies label should be equal to "Label Member Hobby"', () =>
    expect($.$O.$('members[1].hobbies').label).to.be.equal('Label Member Hobby'));
});
