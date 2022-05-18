# Storybook AMP &middot; [![npm package](https://img.shields.io/npm/v/storybook-amp?color=green&label=npm&style=flat-square)](https://www.npmjs.com/package/storybook-amp)

Storybook addon for [AMP (Accelerated Mobile Pages)](https://amp.dev/). Allows to display in your stories *AMP Html* components generated with React.

## Features

- Deliver in each story the output code (AMP ready) resulting from the SSR.
- Works with [AMP websites](https://amp.dev/about/websites/), [AMP email](https://amp.dev/about/email/) and [AMP ads](https://amp.dev/about/ads/)
- Adds addon panel to validate the story (using online [AMP Validator](https://validator.ampproject.org/)) and view the output code.
- Support Styled Components using a custom render function

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

    'storybook-amp', // 👈 The addon registered here
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
    scripts,          // Global scripts to add, empty by default (string)
    styles,           // Custom css styles, empty by default (string)
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

For more examples and configurations go to the [Demo](#demo)
  
<br />

### Tested Addons Compatibility

<ul>
  <li>
    Addon Viewport
  </li>
  <li>
    Addon Controls
  </li>
  <li>
    Addon Backgrounds
  </li>
  <li>
    Addon Storysource
  </li>
  <li>
    Addon Docs (Coming soon)
  </li>
  <li>
    Addon Toolbars (Coming soon)
  </li>
  <li>
    Addon Accessibility (Coming soon)
  </li>
</ul>

<br />

## AMP Documentation

- [AMP Project](https://amp.dev/)
- [Awesome Amp](https://github.com/prototypearea/awesome-amp)
