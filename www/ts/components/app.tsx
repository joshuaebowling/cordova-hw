import React from 'react';
import { Route, Link, HashRouter as Router } from 'react-router-dom';
import ConnectView from './views/connect';
import TestComponent from './TestComponent';
const App = () => {
  return (
    <div>
      <Router>
        <div>
        <Link to="/test">Test</Link>
        <Route path="/" exact component={ConnectView} pageName="Connect" pageDescription="Connect A Locator" />
        <Route path="/test" render={() => (<TestComponent />)} />
        </div>
      </Router>
    </div>
  );
};
export default App;
