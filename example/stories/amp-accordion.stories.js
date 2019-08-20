import React from 'react';

import {storiesOf} from '@storybook/react';

storiesOf('Components/amp-accordion', module).add('default', () => (
  <amp-accordion>
    <section expanded>
      <h4>Section 1</h4>
      <p>Bunch of awesome content.</p>
    </section>
    <section>
      <h4>Section 2</h4>
      <div>
        Bunch of even more awesome content. This time in a{' '}
        <code>&lt;div&gt;</code>.
      </div>
    </section>
    <section>
      <h4>Section 3</h4>
      <p>Bunch of awesome content.</p>
    </section>
  </amp-accordion>
));
