# Storybook AMP &middot; [![npm version](https://img.shields.io/npm/v/storybook-amp.svg?style=flat)](https://www.npmjs.com/package/storybook-amp)

Storybook AMP allows you to display [AMP HTML](https://amp.dev/) components generated with react for your stories in [Storybook](https://storybook.js.org).

## Installation

```sh
npm install -D storybook-amp
```

## Configuration

Then create a file called `addons.js` in your storybook config.

Add following content to it:

```js
import 'storybook-amp/register';
```

## Usage

To SSR the code at runtime time use the `withAmpReactSsrDecorator` decorator inside `config.js` or specific story.  To set custom settings, use the  `amp`  parameter. 

```js
// config.js
import { configure, addDecorator, addParameters, storiesOf } from '@storybook/react';
import { withAmpReactSsrDecorator } from 'storybook-amp';

const customStyles = ''; // some styles

// global
addDecorator(withAmpReactSsrDecorator)
addParameters({
  amp: {
    isEnabled: true,
    styles: customStyles, // Custom styles from some string
  },
});
```

You can use the `amp` parameter to override settings on each story individually:

```js
// per story
storiesOf('AMP', module)
  .add('Default', () => <Button>Send</Button>, {
    amp: {
      isEnabled: false,
    }
  });
  ```
