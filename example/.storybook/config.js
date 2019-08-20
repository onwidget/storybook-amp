import { configure, addDecorator, addParameters } from '@storybook/react';

import { withOptions } from '@storybook/addon-options';
import { withAmpReactSsrDecorator } from '../../dist';

const customStyles = ''; // some styles

addDecorator(withAmpReactSsrDecorator)

addParameters({
  amp: {
    isEnabled: true,
    styles: customStyles, // Custom styles from some string
  },
});

function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

function loadStories() {
  requireAll(require.context("../stories", true, /\.stories\.(js|jsx|ts|tsx|mdx)$/));
}

withOptions({
  brandTitle: 'STORYBOOK AMP',
  brandUrl: 'https://github.com/prototypearea/storybook-amp'
});

configure(loadStories, module);