import { makeDecorator } from '@storybook/addons';

import { PARAM_KEY } from './constants'
import decorator from './decorator'

export const withAmpDecorator = makeDecorator({
  name: 'withAmpDecorator',
  parameterName: PARAM_KEY,
  wrapper: (storyFn, context, { parameters }) => {
    
    return decorator(storyFn, context, { parameters });
  }
})

export { register } from './manager';

export default () => {}