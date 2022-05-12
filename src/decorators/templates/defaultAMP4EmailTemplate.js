export default ({
  styles,
  scripts,
}) => (
`<!doctype html>
<html amp4email lang="en">
  <head>
    <meta charSet="utf-8" />
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    ${scripts ? scripts.trim() : ''}

    <style amp4email-boilerplate>body{visibility:hidden}</style>
    <style amp-custom>${styles}</style>
  </head>
  <body>
    <!-- STORY CODE -->
  </body>
</html>`
);