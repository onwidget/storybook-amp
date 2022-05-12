export default ({
  title = 'AMP4Ads Demo',
  scripts,
  styles,
}) => (
`<!doctype html>
<html amp4ads lang="en">
  <head>
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width,minimum-scale=1">
    <title>${title}</title>

    <style amp4ads-boilerplate>body{visibility:hidden}</style>
    <script async src="https://cdn.ampproject.org/amp4ads-v0.js"></script>
    ${scripts ? scripts.trim() : ''}

    <style amp-custom>${styles}</style>
  </head>
  <body>
    <!-- STORY CODE -->
  </body>
</html>`
);