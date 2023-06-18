import React from "react";
import ReactDOMServer from "react-dom/server";

import { addons as addonAPI, makeDecorator } from "@storybook/addons";

import { getTemplateFn } from "./templates";
import getBlodURL from "./utils/getBlodURL";

import { PARAM_KEY, EVENTS } from "./constants";

import getHtmlFormatForType from "./utils/getHtmlFormatForType";

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

const decorator = (storyFn, context = {}, { parameters = {} }) => {
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
  const ampHtml = getAmpHTML(
    storyFn,
    {
      type,
      title,
      scripts,
      styles,
      renderFn,
      context,
      parameters,
      baseUrl: window.location.origin,
    },
    templateFn
  );

  const blodURL = getBlodURL(ampHtml, "text/html");

  const isValid = function (html, format) {
    const parentWindow = window?.parent?.window;
    return new Promise((resolve, reject) => {
      if (
        parentWindow?.__STORYBOOK_AMP__?.validator?.isReady &&
        parentWindow?.amp?.validator?.validateString
      ) {
        const validationResults = parentWindow?.amp?.validator?.validateString(
          html,
          format
        );
        resolve(validationResults?.status === "PASS");
      } else if (parentWindow?.__STORYBOOK_AMP__?.validator?.init) {
        parentWindow?.__STORYBOOK_AMP__?.validator?.init().then(() => {
          const validationResults =
            parentWindow?.amp?.validator?.validateString(
              html,
              format
            );
          resolve(validationResults?.status === "PASS");
        });
      }
    });
  };

  /* *************** */
  const channel = addonAPI.getChannel();
  channel.emit(EVENTS.RESULT, {
    html: ampHtml,
    type,
    isValid,
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
