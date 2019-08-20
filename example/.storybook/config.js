import { configure, addDecorator, addParameters } from '@storybook/react';
import { withAmpReactSsrDecorator } from '../../dist';

const customStyles = ''; // some styles

addDecorator(withAmpReactSsrDecorator)

addParameters({
  amp: {
    isEnabled: true,
    styles: customStyles, // Custom styles from some string
  },

  options: {
    name: 'Storybook AMP',
    url: 'https://github.com/prototypearea/storybook-amp',
  },
});

function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

function loadStories() {
  requireAll(require.context("../stories", true, /\.stories\.(js|jsx|ts|tsx|mdx)$/));
}

configure(loadStories, module);