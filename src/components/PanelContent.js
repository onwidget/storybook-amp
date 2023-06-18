import React from "react";
import styled from '@emotion/styled';
import {
  Button,
  SyntaxHighlighter,
  Tabs,
  WithTooltip,
  TooltipMessage,
} from "@storybook/components";

import getBase64ForAMPValidator from "../utils/getBase64ForAMPValidator";
import getHtmlFormatForType from "../utils/getHtmlFormatForType"
import getAmpLabelForType from "../utils/getAmpLabelForType"

const Tooltip = ({ onHide }) => (
  <TooltipMessage
    title="Use Online Validator"
    desc="Validate story using online Amp Validator: https://validator.ampproject.org/"
  />
);

export const PanelContent = ({ data }) => {
  if (!data) {
    return null;
  }
  const { type, html, isValid } = data;

  const handleValidate = () => {
    const htmlFormat = getHtmlFormatForType(type);
    window.open(
      `https://validator.ampproject.org/#doc=${getBase64ForAMPValidator(
        html
      )}${htmlFormat ? `&htmlFormat=${htmlFormat}` : ''}`,
      "_newtab" + Date.now()
    );
  };

  const typeLabel = getAmpLabelForType(type);
  const outputTabTitle = `Output${typeLabel ? ` (${typeLabel})` : ''}`

  return (
    <Tabs
      id="storybook-amp-panel-options"
      backgroundColor="rgba(0, 0, 0, 0.05)"
      selected="tabHtmlCode"
      absolute={true}
      tools={
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* <Badge status="positive" style={{ marginRight: 8}}>PASS</Badge> */}
          {html && (
            <WithTooltip placement="auto" trigger="hover" tooltip={<Tooltip />}>
              <Button
                small
                outline
                type="button"
                onClick={(e) => handleValidate(e)}
                // style={{ backgroundColor: theme.barBg }}
              >
                Validate
              </Button>
            </WithTooltip>
          )}
        </div>
      }
    >
      <div id="tabHtmlCode" title={outputTabTitle} color="#888">
       {/* #ff4400 #66bf3c */}
        <div className="storybook-amp-source-code">
          {html === null ? (
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
              {html}
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
