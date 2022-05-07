import React from 'react';

export default {
  title: 'Components/amp-carousel',
};


export const Base = () => (
  <amp-carousel height="300" layout="fixed-height" type="slides">
    <div>
      <div style={{ backgroundImage: 'url(/coffee-beans.jpg)', height: 300 }} />
    </div>
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
);

Base.storyName = 'default';