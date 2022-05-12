# Storybook AMP &middot; [![npm package](https://img.shields.io/npm/v/storybook-amp?color=green&label=npm&style=flat-square)](https://www.npmjs.com/package/storybook-amp)

Storybook addon that allows you to display [AMP HTML](https://amp.dev/) components generated with React in your stories

## Features

- Allows to deliver in each story the AMP code resulting from the SSR.
- Adds a custom panel to validate the story and view the resulting source code.

<br />

## Demo

https://storybook-amp.prototypearea.dev/

<br />

## Installation

```sh
npm install -D storybook-amp
```

<br />

## Configuration

Next, update `.storybook/main.js` to the following:

```js
// .storybook/main.js

module.exports = {
  stories: [
    // ...
  ],
  addons: [
    // Other Storybook addons

    '@storybook/storybook-amp', // 👈 The addon registered here
  ],
};
```

<br />

## Usage

To set custom settings, use the  `amp` parameter. 

```js
// .storybook/preview.js

const scripts = '';
const styles = '';

export const parameters = {
  // Other defined parameters

  amp: {              // 👈 The addon parameters here
    isEnabled: true,  // Enable the addon, false by default (boolean)
    scripts,          // Custom css styles (string)
    styles,           // Global scripts to add (string)
  },
};
```

You can use the `amp` parameter to override settings on each story individually:

```js
// Story example

export default {
  title: "Components/amp-youtube",
  parameters: {
    amp: {
      scripts: // 👈 Script needed by the story
        `<script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>`,
    },
  },
};

export const Story = (args) => (
  <amp-youtube
    width="480"
    height="270"
    layout="responsive"
    data-videoid='lBTCB7yLs8Y'
  ></amp-youtube>
)
```
  
<br />

## AMP Documentation

- [AMP Project](https://amp.dev/)
- [Awesome Amp](https://github.com/prototypearea/awesome-amp)
