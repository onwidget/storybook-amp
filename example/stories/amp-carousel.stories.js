import React from 'react';

import {storiesOf} from '@storybook/react';

storiesOf('Components/amp-carousel', module).add('default', () => (
  <amp-carousel height="300" layout="fixed-height" type="slides">
    <div>
      <div style={{ backgroundColor: 'blue', height: 300 }}>This is a blue box.</div>
    </div>
    <div>
      <div style={{ backgroundColor: 'red', height: 300  }}>This is a red box.</div>
    </div>
    <div>
      <div style={{ backgroundColor: 'green', height: 300  }}>This is a green box.</div>
    </div>
  </amp-carousel>
));
