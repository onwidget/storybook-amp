import React, { useEffect, useState } from "react";
import styled from '@emotion/styled';
import {
  Button,
  SyntaxHighlighter,
  Tabs,
  WithTooltip,
  TooltipMessage,
  Icons
} from "@storybook/components";

import { STORY_CHANGED } from "@storybook/core-events";
import EVENTS from "../constants";

import getBase64ForAMPValidator from "../utils/getBase64ForAMPValidator";
import getHtmlFormatForType from "../utils/getHtmlFormatForType"
import getAmpLabelForType from "../utils/getAmpLabelForType"

const ValidateButton = styled(Button)(({ theme }) => ({
  background: theme.barBg,
}));

const Tooltip = ({ onHide }) => (
  <TooltipMessage
    title="Use Online Validator"
    desc="Validate story using online Amp Validator: https://validator.ampproject.org/"
  />
);

const AmpPanel = ({ api, channel }) => {
  const [sourceCode, setSourceCode] = useState(null);
  const [type, setType] = useState(null);

  const handleValidate = () => {
    const htmlFormat = getHtmlFormatForType(type);
    window.open(
      `https://validator.ampproject.org/#doc=${getBase64ForAMPValidator(
        sourceCode
      )}${htmlFormat ? `&htmlFormat=${htmlFormat}` : ''}`,
      "_newtab" + Date.now()
    );
  };

  useEffect(() => {
    function handleRefreshData(data) {
      setType(data && data.type ? data.type : null);
      setSourceCode(data && data.ampHtml ? data.ampHtml : "");
    }

    function handleStoryChange(id) {
      setType(null);
      setSourceCode(null);
    }

    api.on(STORY_CHANGED, handleStoryChange);
    channel.on(EVENTS.AMP_HTML_RESULT, handleRefreshData);

    return function unmount() {
      api.off(STORY_CHANGED, handleStoryChange);
      channel.removeListener(EVENTS.AMP_HTML_RESULT, handleRefreshData);
    };
  }, []);

  return (
    <Tabs
      id="storybook-amp-panel-options"
      backgroundColor="rgba(0, 0, 0, 0.05)"
      selected="tabHtmlCode"
      absolute={true}
      tools={
        <div style={{ display: "flex", alignItems: "center" }}>
          {type ? <div style={{ marginRight: 10}}>{getAmpLabelForType(type)}</div> : null}
          {sourceCode && (
            <WithTooltip placement="auto" trigger="hover" tooltip={<Tooltip />}>
              <ValidateButton
                small
                outline
                type="button"
                onClick={(e) => handleValidate(e)}
              >
                <Icons icon="lightning" />Validate
              </ValidateButton>
            </WithTooltip>
          )}
        </div>
      }
    >
      <div id="tabHtmlCode" title={"Output"} color="#888">
       {/* #ff4400 #66bf3c */}
        <div className="storybook-amp-source-code">
          {sourceCode === null ? (
            <div style={{ padding: 10 }}>Loading ...</div>
          ) : (
            <SyntaxHighlighter
              language="html"
              showLineNumbers
              format
              copyable
              bordered={false}
              padded
            >
              {sourceCode}
            </SyntaxHighlighter>
          )}
        </div>
      </div>
      {/* <div id="tabDetails" title={"Details"}>
        Details
      </div> */}
    </Tabs>
  );
};

export default AmpPanel;
