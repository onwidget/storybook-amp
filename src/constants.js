export const ADDON_ID = "prototypearea/storybook-amp";

export const PANEL_ID = `${ADDON_ID}/panel`;
export const PANEL_TITLE = "AMP";
export const TOOL_ID = `${ADDON_ID}/tool`;
export const PARAM_KEY = "amp";

export const EVENTS = {
  RESULT: `${ADDON_ID}/result`,
  VALIDATION: `${ADDON_ID}/validation`,
};

export const DEFAULT_STATE = {
  isValid: undefined,
  type: "amp",
  html: null,
};
