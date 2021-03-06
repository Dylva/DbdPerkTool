import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './constants/routes.json';
import App from './containers/App';
import HomePage from './containers/HomePage';
import PerkPage from './containers/PerkPage';
import SettingsPage from './containers/SettingsPage';
import CreatePage from './containers/CreatePage';
import PortraitPage from './containers/PortraitPage';

export default function Routes() {
  return (
    <App>
      <Switch>
        <Route exact path={routes.PERKS} component={PerkPage} />
        <Route exact path={routes.PORTRAITS} component={PortraitPage} />
        <Route exact path={routes.HOME} component={HomePage} />
        <Route exact path={routes.SETTINGS} component={SettingsPage} />
        <Route exact path={routes.CREATE} component={CreatePage} />
      </Switch>
    </App>
  );
}
