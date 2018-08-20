import simulateAsyncFindUserCall from './_.async';

export function checkUser({ field }) {
  const msg = `Hey! The username ${field.value} is already taken.`;
  // show error if the call does not returns entries
  return simulateAsyncFindUserCall({ user: field.value })
    .then((items:any[]) => [(items.length === 0), msg]);
}

export function shouldBeEqualTo(target) {
  return ({ field, form }) => {
    const fieldsAreEquals = (form.$(target).value === field.value);
    return [fieldsAreEquals, `The ${field.label} should be equals to ${form.$(target).label}`];
  };
}

export function isEmailByValidator({ field, validator }) {
  const isValid = validator.isEmail(field.value);
  return [isValid, `The ${field.label} should be an email address.`];
}

export function isEmail({ field }) {
  const isValid = (field.value.indexOf('@') > 0);
  return [isValid, `The ${field.label} should be an email address.`];
}

export function isInt({ field }) {
  const isValid = Number.isInteger(field.value);
  return [isValid, `The ${field.label} should be an Integer.`];
}
