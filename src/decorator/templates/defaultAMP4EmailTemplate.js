export default ({
  styles,
}) => (
`<!doctype html>
<html amp4email lang="en">
  <head>
    <meta charSet="utf-8" />
    <script async src="https://cdn.ampproject.org/v0.js"></script>

    <style amp4email-boilerplate>body{visibility:hidden}</style>
    <style amp-custom>${styles}</style>

    <script async custom-element="amp-bind" src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"></script>
    <script async custom-element="amp-sidebar" src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.js"></script>
    <script async custom-element="amp-list" src="https://cdn.ampproject.org/v0/amp-list-0.1.js"></script>
    <script async custom-template="amp-mustache" src="https://cdn.ampproject.org/v0/amp-mustache-0.2.js"></script>
    <script async custom-element="amp-carousel" src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"></script>
    <script async custom-element="amp-accordion" src="https://cdn.ampproject.org/v0/amp-accordion-0.1.js"></script>
  </head>
  <body>
    <!-- STORY CODE -->
  </body>
</html>`
);