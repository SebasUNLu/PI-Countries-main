import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";

import Header from "./components/header/header";
import Landing from "./components/landing/Landing";
import Home from "./components/home/Home";

function App() {
  return (
    <React.Fragment>
      <Header />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/home" component={Home} />
        {/* Ruta de detalle de pais */}
        {/* Ruta de creacion de actividad */}
      </Switch>
    </React.Fragment>
  );
}

export default App;
