import React, { useState, useEffect } from "react";
import { useAddonState, useChannel } from "@storybook/api";
import { Badge } from "@storybook/components";
import { STORY_CHANGED } from "@storybook/core-events";
import { TOOL_ID, ADDON_ID, EMPTY_STATE, EVENTS } from "./constants";

import getHtmlFormatForType from "./utils/getHtmlFormatForType";

export const Tool = () => {
  const [state, setState] = useAddonState(ADDON_ID, EMPTY_STATE);
  const { isValid, html, type } = state || {};

  const [value, setValue] = useState(undefined);

  useEffect(() => {
    if (typeof isValid === "undefined") {
      setValue(undefined);
    } else {
      isValid(html, getHtmlFormatForType(type)).then((_) => {
        setValue(_);
      })
    }
  }, [isValid])

  const emit = useChannel({
    [STORY_CHANGED]: (_) => setState(EMPTY_STATE),
    [EVENTS.RESULT]: (_) => setState(_),
  });

  if (typeof value === "undefined") {
    return null;
  }

  return (
    <div style={{ display: "flex", alignItems: "center", padding: "0 8px" }}>
      {value ? (
        <Badge
          key={TOOL_ID}
          status="positive"
          title="This Story is AMP Valid"
          style={{ border: "1px solid" }}
        >
          AMP Valid
        </Badge>) : (
        <Badge
          key={TOOL_ID}
          status="negative"
          title="This Story is AMP Invalid. To see details go to AMP Panel and click Validate"
          style={{ border: "1px solid" }}
        >
          AMP Invalid
        </Badge>
      )}
    </div>
  );
};