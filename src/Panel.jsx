import React from "react";
import { useAddonState, useChannel } from "@storybook/api";
import { AddonPanel } from "@storybook/components";
// import { STORY_CHANGED } from "@storybook/core-events";
import { ADDON_ID, EVENTS, EMPTY_STATE } from "./constants";
import { PanelContent } from "./components/PanelContent";

export const Panel = (props) => {
  const [state, setState] = useAddonState(ADDON_ID, EMPTY_STATE);

  return (
    <AddonPanel {...props}>
      <PanelContent
        data={state}
      />
    </AddonPanel>
  );
};