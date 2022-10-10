import React from "react";
import "./App.css";
import { Route } from "react-router-dom";

import Landing from "./components/landing/Landing";

function App() {
  return (
    <React.Fragment>
      <Route path="/" component={Landing} />
    </React.Fragment>
  );
}

export default App;
