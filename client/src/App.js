import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";

import Header from "./components/header/header.js";
import Landing from "./components/landing/Landing";
import Home from "./components/home/Home";
import CountryDetail from "./components/countryDetail/CountryDetail";

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
        {/* Ruta de creacion de actividad */}
      </Switch>
    </React.Fragment>
  );
}

export default App;
