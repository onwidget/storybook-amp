import React from 'react';

import addonAPI, { types } from '@storybook/addons';

import { ADDON_ID, PANEL_ID, PANEL_TITLE } from './constants';

import AmpPanel from './components/AmpPanel'

export function register() {
  addonAPI.register(ADDON_ID, api => {

    addonAPI.add(PANEL_ID, {
      type: types.PANEL,
      title: PANEL_TITLE,
      render: ({ key, active }) => (
        <AmpPanel
          key={key}
          api={api}
          active={active}
          channel={addonAPI.getChannel()}
        />
      ),
    });
  });
}