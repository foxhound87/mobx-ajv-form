import * as mobx from 'mobx';

import Form from './Form';
import Field from './Field';

/* shared prototype methods */
import Initializer from './shared/Initializer';
import Helpers from './shared/Helpers';
import Actions from './shared/Actions';
import Utils from './shared/Utils';
import Events from './shared/Events';

const mobxAny = mobx as any;

const { TEST } = process.env;

/**
  Enables MobX strict mode globally (TEST only).
  - - - - - - - - - - - - - - - - - -
  In strict mode, it is not allowed to
  change any state outside of an action
*/
if (TEST) {
  if (mobxAny.configure) {
    mobxAny.configure({ enforceActions: true });
  } else {
    mobxAny.useStrict(true);
  }
}

/**
  Extend Classes with Prototype
  - - - - - - - - - - - - - - - - - -
  Cannot use Object.assign as @action
  methods on mixins are non-enumerable
*/
function extend(derivedCtor: any, baseCtors: any[]) {
  baseCtors.forEach((baseCtor) => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
      derivedCtor.prototype[name] = baseCtor.prototype[name];
    });
  });
}

const shared = [
  Initializer,
  Actions,
  Helpers,
  Utils,
  Events,
];

extend(Form, shared);
extend(Field, shared);

export default Form;
export { Form, Field };
