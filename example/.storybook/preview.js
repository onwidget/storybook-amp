import React from "react"

export const parameters = {
  amp: {
    isEnabled: true,
    styles: '', // Custom AMP styles
  },

  viewport: {
    defaultViewport: 'mobile1',
  },
  previewTabs: {
    'storybook/docs/panel': {
      hidden: true,
    },
  },
  controls: {
    disable: true
  },
  options: {
    isToolshown: true,
    showPanel: true,
  },
};