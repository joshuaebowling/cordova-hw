import React from "react";
import { Route, NavLink, HashRouter as Router } from "react-router-dom";

import ManageParams from "./ManageParams";
import TestComponent from "./TestComponent";
const App = () => {
  return (
    <div>
      <Router>
        <div>
          <NavLink to="/test">Test</NavLink>
          <NavLink to="/parameters">Parameters</NavLink>
          <Route path="/test" render={() => <TestComponent />} />
          <Route
            path="/parameters"
            render={({ match }) => <ManageParams match={match} />}
          />
        </div>
      </Router>
    </div>
  );
};
export default App;
