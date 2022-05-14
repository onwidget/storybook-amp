import React from "react";
import ReactDOMServer from "react-dom/server";

import addonAPI, { makeDecorator } from "@storybook/addons";

import { getTemplateFn } from "./templates";
import getBlodURL from "../utils/getBlodURL";

import EVENTS, { PARAM_KEY } from "../constants";

const defaultRenderFn = (storyFn, context) => {
  const html = ReactDOMServer.renderToStaticMarkup(storyFn(context));

  return {
    html,
    styles: null,
  };
};

/* *************** */

const getAmpHTML = (
  storyFn,
  {
    title,
    scripts,
    styles: customStyles,
    baseUrl,
    renderFn,
    context,
    parameters,
  },
  templateFn
) => {
  const { html, styles } = renderFn(storyFn, context);

  const innerProps = {
    storyFn,
    title,
    scripts: scripts && typeof scripts === "string" ? scripts : "",
    styles: `${
      customStyles && typeof customStyles === "string" ? customStyles : ""
    }${styles ? styles : ""}`,
    baseUrl,
  };

  return templateFn(innerProps).replace("<!-- STORY CODE -->", html);
};
/* *************** */

const decorator = (storyFn, context = {}, { parameters }) => {
  const { title } = context;

  const {
    isEnabled = false,
    template = "amphtml",
    scripts = "",
    styles = "",
    renderFn = defaultRenderFn,
  } = parameters;

  if (!isEnabled) {
    return storyFn(context);
  }

  const { type, templateFn } = getTemplateFn(template);
  const ampHtml = getAmpHTML(storyFn, {
    type,
    title,
    scripts,
    styles,
    renderFn,
    context,
    parameters,
    baseUrl: window.location.origin,
  }, templateFn);

  const blodURL = getBlodURL(ampHtml, "text/html");

  /* *************** */
  const channel = addonAPI.getChannel();
  channel.emit(EVENTS.AMP_HTML_RESULT, {
    ampHtml: ampHtml,
    type
  });
  /* *************** */

  if (window.self === window.top) {
    location.href = blodURL;
    const EmptyElement = () => null;
    return <EmptyElement />;
  }

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `body { position: absolute; top: 0; left: 0; width: 100%; height: 100%; padding: 0; margin: 0; }`,
        }}
      />
      <iframe
        id="amp-iframe"
        src={blodURL}
        title="Iframe"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          border: "none",
        }}
      />
    </>
  );
};

export const withAmpDecorator = makeDecorator({
  name: "withAmpDecorator",
  parameterName: PARAM_KEY,
  wrapper: (storyFn, context, { parameters }) => {
    return decorator(storyFn, context, { parameters });
  },
});

// if (true) { // if mobile
//   ampHtml = ampHtml.replace('</head>', `<style>*{cursor: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAEbSURBVDiNndMxK4ZRGMbx3zmRMrwvM2XCQFFik/IJpCw+hJLPgfIhLBY+gEEGJQPFwGZg9TIoBrfhOfSQHl7XeM7/fw3nvk+KCPWklEawgGlMlOMrnOMoIm6/8B8FKaWMFazhGQ94LFwbg+jHDvYi4u2zIKWUsIk5XNfE72ljHKfYiIjI5WIZMzhrkJW7s8IuQ8IwdnGDpwa5nhbGsJqxiNcuZIV9xWJWvXY3cr1kOmMSnX8UdDCZEb+RDYmMS9WMu80gLrNqw1r/KGjhPOMQvaol+Wva6MFhjoh7bGEUuVGrkgu7HRH3H8IBTjCLgQZ5oDAnxfnymRKWsI4X1Zw7NbGFPmxjP4qYfvjOQ5jHlGpHqCZ1geOIuKvz76QSW1T3cwmnAAAAAElFTkSuQmCC') 10 10, auto !important; }</style></head>`);
// }
