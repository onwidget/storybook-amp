import React from 'react';

export default {
  title: 'Components/amp-access',
};

export const hide = () => (
  <div>
    <h2>Box hidden</h2>
    <div style={{ background: '#f00', height: '10rem', width: '10rem' }} amp-access='' amp-access-hide='' />
  </div>
);

export const conditional = () => (
  <div>
    <h2>Red box hidden</h2>
    <div style={{ background: '#f00', height: '10rem', width: '10rem' }} amp-access='NOT hasAccess' />
    <h2>Blue box shown</h2>
    <div style={{ background: '#00f', height: '10rem', width: '10rem' }} amp-access='hasAccess' />
  </div>
);
conditional.story = {
  parameters: {
    amp: {
      scripts: [
        `
        <script id="amp-access" type="application/json">
          { "authorization": "https://www.mocky.io/v2/5ebc88943100006f005b0bc0", "noPingback": "true" }
        </script>
        `
      ]
    }
  }
}
