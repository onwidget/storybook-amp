export default ({
  title='AMP Demo',
  canonical='#',
  scripts,
  styles,
  baseUrl,
}) => (
`<!doctype html>
<html amp lang="en">
  <head>
    <meta charSet="utf-8" />
    <title>${title}</title>
    <link rel="canonical" href="${canonical}" />
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1" />

    <script async src="https://cdn.ampproject.org/v0.js"></script>
    ${scripts ? scripts.trim() : ''}

    <style amp-custom>${styles}</style>
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
  </head>
  <body>
    <main>
    <!-- STORY CODE -->
    </main>
  </body>
</html>`
);
