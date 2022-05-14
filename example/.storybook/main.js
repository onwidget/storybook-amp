module.exports = {
  stories: [
    "../stories/docs/*.stories.(js|mdx)",
    "../stories/components/websites/*.stories.(js|mdx)",
    "../stories/components/email/*.stories.(js|mdx)",
    "../stories/components/ads/*.stories.(js|mdx)",
    "../stories/libraries/*.stories.(js|mdx)",
    "../stories/addons/*.stories.(js|mdx)",
  ],
  addons: [
    "../../preset.js",

    "@storybook/addon-storysource",
    "@storybook/addon-links",

    "@storybook/addon-viewport",
    {
      name: "@storybook/addon-docs",
      options: {
        sourceLoaderOptions: {
          injectStoryParameters: false,
        },
      },
    },
    "@storybook/addon-controls",
    "@storybook/addon-backgrounds",
  ],
  features: {
    postcss: false,
  },
};
