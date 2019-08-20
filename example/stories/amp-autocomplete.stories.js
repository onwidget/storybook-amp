import React from 'react';

import {storiesOf} from '@storybook/react';

storiesOf('Components/amp-autocomplete', module).add('default', () => (
  <form
    className="sample-form"
    method="post"
    action-xhr="https://amp.dev/documentation/examples/api/echo"
    target="_top"
  >
    <amp-autocomplete filter="substring">
      <input />
      <script
        type="application/json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            items: ['apple', 'orange', 'banana'],
          }),
        }}
      />
    </amp-autocomplete>
  </form>
));
