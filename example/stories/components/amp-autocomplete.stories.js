import React from "react";

export default {
  title: "Components/amp-autocomplete",
  parameters: {
    amp: {
      scripts: `
        <script async custom-element="amp-autocomplete" src="https://cdn.ampproject.org/v0/amp-autocomplete-0.1.js"></script>
        <script async custom-element="amp-form" src="https://cdn.ampproject.org/v0/amp-form-0.1.js"></script>
        <script async custom-element="amp-bind" src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"></script>
        <script async custom-template="amp-mustache" src="https://cdn.ampproject.org/v0/amp-mustache-0.2.js"></script>
      `,
    },
  },
};

export const Base = () => (
  <form
    className="sample-form"
    method="post"
    action-xhr="https://amp.dev/documentation/examples/api/echo"
    target="_top"
  >
    <amp-autocomplete filter="substring">
      <input />
      <script
        type="application/json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            items: ["apple", "orange", "banana"],
          }),
        }}
      />
    </amp-autocomplete>
  </form>
);

Base.storyName = "amp-autocomplete";
