import React, { useEffect, useState } from "react";
import { Button, SyntaxHighlighter } from "@storybook/components";

import { STORY_CHANGED } from "@storybook/core-events";
import EVENTS from "../constants";

import getBase64ForAMPValidator from "../utils/getBase64ForAMPValidator";

const AmpPanel = ({ api, channel }) => {
  const [sourceCode, setSourceCode] = useState("");

  useEffect(() => {
    function handleRefreshData(data) {
      setSourceCode(data && data.ampHtml ? data.ampHtml : "");
    }

    function handleStoryChange(id) {
      setSourceCode({ sourceCode: "" });
    }

    api.on(STORY_CHANGED, handleStoryChange);
    channel.on(EVENTS.AMP_HTML_RESULT, handleRefreshData);

    return function unmount() {
      api.off(STORY_CHANGED, handleStoryChange);
      channel.removeListener(EVENTS.AMP_HTML_RESULT, handleRefreshData);
    };
  }, []);

  // #htmlFormat=AMP4ADS
  // #htmlFormat=AMP4EMAIL
  // #htmlFormat=ACTIONS

  return (
    <div style={{ padding: 15 }}>
      {sourceCode && (
        <Button
          small
          outline
          isLink
          target="_blank"
          href={`https://validator.ampproject.org/#doc=${getBase64ForAMPValidator(
            sourceCode
          )}`}
        >
          Validate
        </Button>
      )}
      <div
        className="storybook-amp-source-code"
        style={{
          marginTop: 15,
        }}
      >
        <SyntaxHighlighter
          language="html"
          showLineNumbers={false}
          format
          copyable
          bordered
          padded
        >
          {sourceCode}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default AmpPanel;
