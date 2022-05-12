import React from "react";

import { addons, types } from "@storybook/addons";

import { ADDON_ID, PANEL_ID, PANEL_TITLE } from "../constants";

import { AddonPanel } from "@storybook/components";
import AmpPanel from "../components/AmpPanel";

addons.register(ADDON_ID, (api) => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: PANEL_TITLE,
    render: ({ key, active }) => (
      <AddonPanel key={key} active={active}>
        <AmpPanel api={api} channel={addons.getChannel()} />
      </AddonPanel>
    ),
  });
});
