import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router";
import { Provider } from "react-redux";
import { persistor, store } from "./store.js";
import { PersistGate } from "redux-persist/lib/integration/react";

import App from "./components/app/App";
import LoginPage from "./components/loginPage";
import LogoutTransition from "./components/logoutTransition";
import LoadingTransition from "./components/app/loadingTransition";
import NotFound from "./components/app/notFound";

import PlayerFetchTransition from "./containers/playerFetchTransition";
import LeagueSelect from "./containers/leagueSelect";
import TeamSelect from "./containers/teamSelect";
import HomePage from "./containers/homePage";
import MyTeam from "./containers/myTeam";
import LoginTransition from "./containers/loginTransition";

const Routes = props => (
  <Provider store={store}>
    <Router>
      <App>
        <PersistGate loading={<LoadingTransition />} persistor={persistor}>
          <Switch>
            <Route path="/auth" component={LoginTransition} />
            <Route path="/leagueSelect" component={LeagueSelect} />
            <Route path="/teamSelect" component={TeamSelect} />
            <Route path="/fetchingPlayers" component={PlayerFetchTransition} />
            <Route path="/home" component={HomePage} />
            <Route path="/myTeam" component={MyTeam} />
            <Route exact path="/logout" component={LogoutTransition} />
            <Route exact path="/" component={LoginPage} />
            <Route path="*" component={NotFound} />
          </Switch>
        </PersistGate>
      </App>
    </Router>
  </Provider>
);

export default Routes;
