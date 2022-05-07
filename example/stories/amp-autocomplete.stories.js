import React from 'react';

export default {
  title: 'Components/amp-autocomplete',
};

export const Base = () => (
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
);

Base.storyName = 'default';