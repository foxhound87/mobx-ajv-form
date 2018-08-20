# MobX React Form

##### Automagically manage React forms state and automatic validation with MobX.

[![Travis Build](https://img.shields.io/travis/foxhound87/mobx-react-form/master.svg)](https://travis-ci.org/foxhound87/mobx-react-form)
[![Codecov Coverage](https://img.shields.io/codecov/c/github/foxhound87/mobx-react-form/master.svg)](https://codecov.io/gh/foxhound87/mobx-react-form)
[![npm](https://img.shields.io/npm/v/mobx-react-form.svg)]()
[![node](https://img.shields.io/node/v/mobx-react-form.svg)]()
[![GitHub license](https://img.shields.io/github/license/foxhound87/mobx-react-form.svg)]()
[![Downloads](https://img.shields.io/npm/dt/mobx-react-form.svg)]()
[![Downloads](https://img.shields.io/npm/dm/mobx-react-form.svg)]()
[![Backers on Open Collective](https://opencollective.com/mobx-react-form/backers/badge.svg)](#backers) [![Sponsors on Open Collective](https://opencollective.com/mobx-react-form/sponsors/badge.svg)](#sponsors) 

[![NPM](https://nodei.co/npm/mobx-react-form.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/mobx-react-form/)

---

## Features

- Automatic Reactive Form State Management with MobX Magic.
- Automatic Reactive Validation & Error Messages.
- Validation Plugins & Multiple Validation Styles.
- Nested Fields (w/ Serialization & Validation).
- Nested Forms (w/ Nested Submission & Validation Hooks).
- Dynamically Add/Del Nested Fields.
- Support for Sync & Async Validation functions (w/ Promises).
- Fields Props Bindings for custom Components.
- Support for Material UI, React Widgets, React Select & more.
- Dedicated [DevTools](https://github.com/foxhound87/mobx-react-form-devtools) Package.

[![Edit form-quickstart](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/nrrZgG8y4)

## Documentation

[https://foxhound87.github.io/mobx-react-form](https://foxhound87.github.io/mobx-react-form)

## Live Demo

[https://foxhound87.github.io/mobx-react-form/demo.html](https://foxhound87.github.io/mobx-react-form/demo.html)

## Demo Code

[https://github.com/foxhound87/mobx-react-form-demo](https://github.com/foxhound87/mobx-react-form-demo)

## Tutorial
[Automagically manage React forms state and automatic validation with MobX](https://medium.com/@foxhound87/automagically-manage-react-forms-state-with-mobx-and-automatic-validation-2b00a32b9769)

<br>

## Quick Start

```bash
npm install --save mobx-react-form
```

#### Choose and Setup a Validation Plugin

> See [Validation Plugins & Modes](https://foxhound87.github.io/mobx-react-form/docs/validation/plugins.html)
 and [Supported Validation Packages](https://foxhound87.github.io/mobx-react-form/docs/validation/supported-packages.html) for more info.

Below we are creating a `plugins` object using the `validatorjs` package to enable `DVR` functionalities (Declarative Validation Rules).

```javascript
import validatorjs = require('validatorjs');

const plugins = { dvr: validatorjs };
```

#### Define the Form Fields

Define the `fields` as a collection with a `rules` property for the validation.

```javascript
const fields = [{
  name: 'email',
  label: 'Email',
  placeholder: 'Insert Email',
  rules: 'required|email|string|between:5,25',
}, {
  name: 'password',
  label: 'Password',
  placeholder: 'Insert Password',
  rules: 'required|string|between:5,25',
}, {
  name: 'passwordConfirm',
  label: 'Password Confirmation',
  placeholder: 'Confirm Password',
  rules: 'required|string|same:password',
}];
```

> You can also define `fields` as an `object`.

#### Define the Validation Hooks

```javascript
const hooks = {
  onSuccess(form) {
    alert('Form is valid! Send the request here.');
    // get field values
    console.log('Form Values!', form.values());
  },
  onError(form) {
    alert('Form has errors!');
    // get all form errors
    console.log('All form errors', form.errors());
  }
}
```

#### Initialize the Form

Simply pass the `fields`, `plugins` and `hooks` objects to the constructor

```javascript
import MobxReactForm from 'mobx-react-form';

const form = new MobxReactForm({ fields }, { plugins, hooks });
```

#### Pass the form to a react component

The package provide some built-in and ready to use Event Handlers:

`onSubmit(e)`, `onClear(e)`, `onReset(e)` & [more...](https://foxhound87.github.io/mobx-react-form/docs/events/event-handlers.html)

```javascript
import React from 'react';
import { observer } from 'mobx-react';

export default observer(({ form }) => (
  <form onSubmit={form.onSubmit}>
    <label htmlFor={form.$('email').id}>
      {form.$('email').label}
    </label>
    <input {...form.$('email').bind()} />
    <p>{form.$('email').error}</p>

    {/* ... other inputs ... */}

    <button type="submit" onClick={form.onSubmit}>Submit</button>
    <button type="button" onClick={form.onClear}>Clear</button>
    <button type="button" onClick={form.onReset}>Reset</button>

    <p>{form.error}</p>
  </form>
));
```

> Other Field Props are available. See the [docs](https://foxhound87.github.io/mobx-react-form/docs/api-reference/fields-properties.html) for more details.

###### Extending the Form class

[See how to implement the same configuration of this quickstart extending the Form class](https://foxhound87.github.io/mobx-react-form/docs/getting-started-class.html)

<br>

## Contributing

If you want to contribute to the development, do not hesitate to fork the repo and send pull requests.

And don't forget to star the repo, I will ensure more frequent updates! Thanks!


### Contributors

This project exists thanks to all the people who contribute. 
<a href="graphs/contributors"><img src="https://opencollective.com/mobx-react-form/contributors.svg?width=890&button=false" /></a>


### Backers

Thank you to all our backers! 🙏 [[Become a backer](https://opencollective.com/mobx-react-form#backer)]

<a href="https://opencollective.com/mobx-react-form#backers" target="_blank"><img src="https://opencollective.com/mobx-react-form/backers.svg?width=890"></a>


### Sponsors

Support this project by becoming a sponsor. Your logo will show up here with a link to your website. [[Become a sponsor](https://opencollective.com/mobx-react-form#sponsor)]

<a href="https://opencollective.com/mobx-react-form/sponsor/0/website" target="_blank"><img src="https://opencollective.com/mobx-react-form/sponsor/0/avatar.svg"></a>
<a href="https://opencollective.com/mobx-react-form/sponsor/1/website" target="_blank"><img src="https://opencollective.com/mobx-react-form/sponsor/1/avatar.svg"></a>
<a href="https://opencollective.com/mobx-react-form/sponsor/2/website" target="_blank"><img src="https://opencollective.com/mobx-react-form/sponsor/2/avatar.svg"></a>
<a href="https://opencollective.com/mobx-react-form/sponsor/3/website" target="_blank"><img src="https://opencollective.com/mobx-react-form/sponsor/3/avatar.svg"></a>
<a href="https://opencollective.com/mobx-react-form/sponsor/4/website" target="_blank"><img src="https://opencollective.com/mobx-react-form/sponsor/4/avatar.svg"></a>
<a href="https://opencollective.com/mobx-react-form/sponsor/5/website" target="_blank"><img src="https://opencollective.com/mobx-react-form/sponsor/5/avatar.svg"></a>
<a href="https://opencollective.com/mobx-react-form/sponsor/6/website" target="_blank"><img src="https://opencollective.com/mobx-react-form/sponsor/6/avatar.svg"></a>
<a href="https://opencollective.com/mobx-react-form/sponsor/7/website" target="_blank"><img src="https://opencollective.com/mobx-react-form/sponsor/7/avatar.svg"></a>
<a href="https://opencollective.com/mobx-react-form/sponsor/8/website" target="_blank"><img src="https://opencollective.com/mobx-react-form/sponsor/8/avatar.svg"></a>
<a href="https://opencollective.com/mobx-react-form/sponsor/9/website" target="_blank"><img src="https://opencollective.com/mobx-react-form/sponsor/9/avatar.svg"></a>


