export default ({
  styles,
  title = 'AMP4Ads Demo'
}) => (
`<!doctype html>
<html amp4ads lang="en">
  <head>
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width,minimum-scale=1">
    <title>${title}</title>

    <style amp4ads-boilerplate>body{visibility:hidden}</style>
    <script async src="https://cdn.ampproject.org/amp4ads-v0.js"></script>
    <style amp-custom>${styles}</style>

    <script async custom-element="amp-bind" src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"></script>
    <script async custom-template="amp-mustache" src="https://cdn.ampproject.org/v0/amp-mustache-0.2.js"></script>
    <script async custom-element="amp-carousel" src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"></script>
    <script async custom-element="amp-accordion" src="https://cdn.ampproject.org/v0/amp-accordion-0.1.js"></script>
  </head>
  <body>
    <!-- STORY CODE -->
  </body>
</html>`
);