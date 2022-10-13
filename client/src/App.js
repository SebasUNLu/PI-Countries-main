import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";

import Header from "./components/header/header.js";
import Landing from "./components/landing/Landing";
import Home from "./components/home/Home";
import CountryDetail from "./components/countryDetail/CountryDetail";
import ActivityForm from "./components/activityForm/activityForm";

function App() {
  return (
    <React.Fragment>
      <Header />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/home" component={Home} />
        <Route
          exact
          path="/country/:countryId"
          render={({ match }) => (
            <CountryDetail countryId={match.params.countryId} />
          )}
        />
        <Route exact path="/createActivity" component={ActivityForm} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
