import { expect, assert } from 'chai';

import $ from './data/_.flat'; // FORMS

describe('$L Form', () => {
  it('$L username.value should be empty', () =>
    expect($.$L.$('username').value).to.be.empty);

  it('$L email.value should be empty', () =>
    expect($.$L.$('email').value).to.be.empty);

  it('$L password.value should be empty', () =>
    expect($.$L.$('password').value).to.be.empty);

  it('$L password.error should be null', () =>
    expect($.$L.$('password').error).to.be.null);
});

describe('$H Form fields', () => {
  it('$H username.value should be equal to "SteveJobs"', () =>
    expect($.$H.$('username').value).to.be.equal('SteveJobs'));

  it('$H email.value should be equal to "s.jobs@apple.com"', () =>
    expect($.$H.$('email').value).to.be.equal('s.jobs@apple.com'));

  it('$H email.label should be equal to "Email"', () =>
    expect($.$H.$('email').label).to.be.equal('Email'));

  it('$H devSkills.value should be empty', () =>
    expect($.$H.$('devSkills').value).to.be.empty);
});

describe('$O Form fields', () => {
  it('$O username.value should be equal to "TestUser"', () =>
    expect($.$O.$('username').value).to.be.equal('TestUser'));

  it('$O email.value should be equal to "s.jobs@apple.com"', () =>
    expect($.$O.$('email').value).to.be.equal('s.jobs@apple.com'));

  it('$O email.label should be equal to "E-mail"', () =>
    expect($.$O.$('email').label).to.be.equal('E-mail'));

  it('$O error should be null', () =>
    expect($.$O.error).to.be.null);
});

describe('$P Form fields', () => {
  it('$P username.value should be equal to "TestUser"', () =>
    expect($.$P.$('username').value).to.be.equal('TestUser'));

  it('$P email.value should be equal to "s.jobs@apple.com"', () =>
    expect($.$P.$('email').value).to.be.equal('s.jobs@apple.com'));

  it('$P username.label should be equal to "UserName"', () =>
    expect($.$P.$('username').label).to.be.equal('UserName'));

  it('$P passwordConfirm.label should be equal to "Confirm Password"', () =>
    expect($.$P.$('passwordConfirm').label).to.be.equal('Confirm Password'));

  it('$P username.isValid should be false', () =>
    expect($.$P.$('username').isValid).to.be.false);

  it('$P email.isValid should be false', () =>
    expect($.$P.$('email').isValid).to.be.false);

  it('$P terms.disabled should be true', () =>
    expect($.$P.$('terms').disabled).to.be.true);

  it('$P error should be null', () =>
    expect($.$P.error).to.be.null);
});

describe('$Q Form fields', () => {
  it('$Q username.value should be equal to "SteveJobs"', () =>
    expect($.$Q.$('username').value).to.be.equal('SteveJobs'));

  it('$Q username.label should be equal to "Username"', () =>
    expect($.$Q.$('username').label).to.be.equal('Username'));

  it('$Q email.value should be equal to "s.jobs@apple.com"', () =>
    expect($.$Q.$('email').value).to.be.equal('s.jobs@apple.com'));

  it('$Q email.label should be equal to "Email"', () =>
    expect($.$Q.$('email').label).to.be.equal('Email'));
});

describe('$R Form fields', () => {
  it('$R email.value should be equal to "invalid"', () =>
    expect($.$R.$('email').value).to.be.equal('invalid'));

  it('$R email.hasError should be true', () =>
    expect($.$R.$('email').hasError).to.be.true);

  it('$R email.isValid should be false', () =>
    expect($.$R.$('email').isValid).to.be.false);

  it('$R emailConfirm.hasError should be true', () =>
    expect($.$R.$('emailConfirm').hasError).to.be.true);

  it('$R emailConfirm.isValid should be false', () =>
    expect($.$R.$('emailConfirm').isValid).to.be.false);
});

describe('others fields', () => {
  it('$C error should be equal to "The user already exist."', () =>
    expect($.$C.error).to.be.equal('The user already exist'));

  it('$D devSkills.isValid should be false', () =>
    expect($.$D.$('devSkills').isValid).to.be.false);

  it('$D username.value should be equal to "JonathanIve"', () =>
    expect($.$D.$('username').value).to.be.equal('JonathanIve'));

  it('$D terms.value should be false', () =>
    expect($.$D.$('terms').value).to.be.false);

  it('$D terms.hasError should be false', () =>
    expect($.$D.$('terms').hasError).to.be.false);

  it('$D revenue.hasError should be true', () =>
    expect($.$D.$('revenue').hasError).to.be.true);

  it('$D revenue.value should be equal to "aaa"', () =>
    expect($.$D.$('revenue').value).to.be.equal('aaa'));

  it('$D assets.value should be equal to "0"', () =>
    expect($.$D.$('assets').value).to.be.equal(0));

  it('$D assets.isEmpty should be false', () =>
    expect($.$D.$('assets').isEmpty).to.be.false);

  it('$D terms.label should be equal to "Accept Terms of Service"', () =>
    expect($.$D.$('terms').label).to.be.equal('Accept Terms of Service'));

  it('$I username.value should be equal to "SteveJobs"', () =>
    expect($.$I.$('username').value).to.be.equal('SteveJobs'));

  it('$M username.default should be equal to "Claudio"', () =>
    expect($.$M.$('username').default).to.be.equal('Claudio'));

  it('$M username.value should be equal to "Claudio"', () =>
    expect($.$M.$('username').value).to.be.equal('Claudio'));

  it('$M username.initial should be equal to "SteveJobs"', () =>
    expect($.$M.$('username').initial).to.be.equal('SteveJobs'));

  it('$M username.isValid should be false', () =>
    expect($.$M.$('username').isValid).to.be.false);

  it('$N email.isValid should be false', () =>
    expect($.$N.$('email').isValid).to.be.false);

  it('$N email.value should be equal to "12345"', () =>
    expect($.$N.$('email').value).to.be.equal('12345'));
});

describe('Field values type checks', () => {
  it('$A terms.value is a boolean', () =>
    assert.isBoolean($.$A.$('terms').value,
      '$A terms.value is not a boolean'));

  it('$A revenue.value is string', () =>
    assert.isString($.$A.$('revenue').value,
      '$A revenue.value is not string'));

  it('$A assets.value is a number', () =>
    assert.isNumber($.$A.$('assets').value,
      '$A assets.value is not a number'));
});
