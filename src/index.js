import Form from './Form';
import Field from './Field';

/* shared prototype methods */
import fieldHelpers from './shared/Helpers';
import fieldUtils from './shared/Utils';
import fieldEvents from './shared/Events';

/**
  Extend Classes with Prototype
  - - - - - - - - - - - - - - - - - -
  @TODO This comment is probably out of date. 
  Cannot use Object.assign as @action
  methods on mixins are non-enumerable
*/
const extend = ($class, $obj) => ($obj)
  .forEach(mixin => Object.getOwnPropertyNames(mixin)
    .forEach(name => $class.prototype[name] = mixin[name])); // eslint-disable-line

const shared = [
  fieldHelpers,
  fieldUtils,
  fieldEvents,
];

extend(Form, shared);
extend(Field, shared);

export default Form;
export { Form, Field };
