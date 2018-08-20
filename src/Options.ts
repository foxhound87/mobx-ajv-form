import { observable, action, toJS, extendObservable } from 'mobx';

// needed for adapting to different versions on mobx
// tslint:disable-next-line:no-duplicate-imports
import * as mobx from 'mobx';

import * as _ from 'lodash';
import { uniqueId } from './utils';

const mobxAny = mobx as any;

export default class Options {

  @observable options = {
    uniqueId,
    defaultGenericError: null,
    submitThrowsError: true,
    showErrorsOnInit: false,
    showErrorsOnSubmit: true,
    showErrorsOnBlur: true,
    showErrorsOnChange: true,
    showErrorsOnClear: false,
    showErrorsOnReset: true,
    validateOnInit: true,
    validateOnBlur: true,
    validateOnChange: false,
    validateDisabledFields: false,
    strictUpdate: false,
    strictDelete: true,
    retrieveOnlyDirtyValues: false,
    retrieveOnlyEnabledFields: false,
    autoParseNumbers: false,
    allowRequired: false,
    validationDebounceWait: 250,
    validationDebounceOptions: {
      leading: false,
      trailing: true,
    },
  };

  get(key = null, field = null) {
    // handle field option
    if (_.has(field, 'path')) {
      if (_.has(field.$options, key)) {
        return field.$options[key];
      }
    }

    // fallback on global form options
    if (key) return this.options[key];
    return toJS(this.options);
  }

  @action
  set(options) {
    if (mobxAny.set) {
      mobxAny.set(this.options, options);
    } else {
      extendObservable(this.options, options);
    }
  }
}
