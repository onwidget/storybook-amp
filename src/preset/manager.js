import { window, document } from "global";
import React from "react";
import { addons, types } from "@storybook/addons";

import { ADDON_ID, PANEL_ID, PANEL_TITLE, TOOL_ID } from "../constants";

import { Tool } from "../Tool";
import { Panel } from "../Panel";

addons.register(ADDON_ID, () => {
  prepareAddonInWindow();

  addons.add(TOOL_ID, {
    type: types.TOOL,
    title: "Amp",
    match: ({ viewMode }) => viewMode === "story",
    render: () => <Tool />,
  });

  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: PANEL_TITLE,
    match: ({ viewMode }) => viewMode === "story",
    render: (props) => <Panel {...props} />,
  });
});

const prepareAddonInWindow = () => {
  if (window.__STORYBOOK_AMP__) {
    return;
  }

  window.__STORYBOOK_AMP__ = {
    validator: {
      isReady: false,
      init: () => {
        return new Promise((resolve, reject) => {
          const script = document.createElement("script"),
            head = document.head || document.getElementsByTagName("head")[0];

          script.addEventListener("load", (event) => {
            if (window?.amp?.validator?.init) {
              window.amp.validator.init().then(() => {
                window.__STORYBOOK_AMP__.validator.isReady = true;
                resolve();
              });
            }

            // reject error
          });

          script.src = "https://cdn.ampproject.org/v0/validator_wasm.js";
          script.id = "storybook-amp-validator-script";
          script.async = false;

          head.insertBefore(script, head.firstChild);
        });
      },
    },
  };
};
