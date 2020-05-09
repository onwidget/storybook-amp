import { addDecorator, addParameters } from '@storybook/react';
import { withAmpDecorator } from '../../dist';

const customStyles = ''; // some styles

addDecorator(withAmpDecorator)

addParameters({
  amp: {
    isEnabled: true,
    styles: customStyles, // Custom styles from some string
  },
});