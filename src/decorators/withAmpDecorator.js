import React from 'react';
import ReactDOMServer from 'react-dom/server';

import addonAPI, { makeDecorator } from '@storybook/addons';

import defaultAMPHtmlTemplate from './templates/defaultAMPHtmlTemplate'
import getBlodURL from '../utils/getBlodURL';

import EVENTS, { PARAM_KEY } from '../constants';

/* *************** */

const getAmpHTML = (story, { title, scripts, styles, baseUrl } = {}, templateFunc = defaultAMPHtmlTemplate) => {
  const innerProps = {
    story,
    title,
    scripts: scripts && typeof scripts === 'string' ? scripts : '',
    styles: styles && typeof styles === 'string' ? styles : '',
    baseUrl,
  }
  let storyContent = ReactDOMServer.renderToStaticMarkup(story());

  /* FIXME: FIX due to storybook-readme */
  if (storyContent.includes('<div class="storybook-readme-story">')) {
    storyContent = storyContent
      .replace('<div class="storybook-readme-story">', '')
      .replace(new RegExp('</div>$'), '')
  }
  /* ****************** */

  return templateFunc(innerProps).replace('<!-- STORY CODE -->', storyContent);
}
/* *************** */

const decorator = (storyFn, context = {}, { parameters }) => {

  const { title } = context

  const {
    isEnabled = false,
    template = 'amphtml',
    scripts = '',
    styles = '',
  } = parameters;

  if (!isEnabled) {
    return storyFn();
  }

  const ampHtml = getAmpHTML(storyFn, { title, scripts, styles, baseUrl: window.location.origin });
  const blodURL = getBlodURL(ampHtml, 'text/html');

  /* *************** */
  const channel = addonAPI.getChannel();
  channel.emit(EVENTS.AMP_HTML_RESULT, {
    ampHtml: ampHtml,
  });
  /* *************** */

  if (window.self === window.top) {
    location.href = blodURL;
    const EmptyElement = () => null;
    return <EmptyElement />;
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `body { position: absolute; top: 0; left: 0; width: 100%; height: 100%; padding: 0; margin: 0; }`}}
      />
      <iframe
        id="amp-iframe"
        src={blodURL}
        title="Iframe"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
      />
    </>
  )
};

export const withAmpDecorator = makeDecorator({
  name: 'withAmpDecorator',
  parameterName: PARAM_KEY,
  wrapper: (storyFn, context, { parameters }) => {
    
    return decorator(storyFn, context, { parameters });
  }
})

// if (true) { // if mobile
//   ampHtml = ampHtml.replace('</head>', `<style>*{cursor: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAEbSURBVDiNndMxK4ZRGMbx3zmRMrwvM2XCQFFik/IJpCw+hJLPgfIhLBY+gEEGJQPFwGZg9TIoBrfhOfSQHl7XeM7/fw3nvk+KCPWklEawgGlMlOMrnOMoIm6/8B8FKaWMFazhGQ94LFwbg+jHDvYi4u2zIKWUsIk5XNfE72ljHKfYiIjI5WIZMzhrkJW7s8IuQ8IwdnGDpwa5nhbGsJqxiNcuZIV9xWJWvXY3cr1kOmMSnX8UdDCZEb+RDYmMS9WMu80gLrNqw1r/KGjhPOMQvaol+Wva6MFhjoh7bGEUuVGrkgu7HRH3H8IBTjCLgQZ5oDAnxfnymRKWsI4X1Zw7NbGFPmxjP4qYfvjOQ5jHlGpHqCZ1geOIuKvz76QSW1T3cwmnAAAAAElFTkSuQmCC') 10 10, auto !important; }</style></head>`);
// }
