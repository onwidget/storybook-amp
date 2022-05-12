const customStyles = '';

export const parameters = {
  amp: {
    isEnabled: true,
    styles: customStyles,
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
    disabled: true
  },
  options: {
    isToolshown: true,
    showPanel: true,
  },
};