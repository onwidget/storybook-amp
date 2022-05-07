module.exports = {
  stories: [
    "../stories/*.stories.(js|mdx)",
  ],
  addons: [
    __dirname + "/../../register",
  ],
  features: {
    postcss: false,
  },
}