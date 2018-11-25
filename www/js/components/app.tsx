import React, { Component } from 'react';
import { Router, Route } from 'react-router';
import { Link } from 'react-router-dom';
import ConnectView from './views/connect';
import DevicesView from './views/devices';
import createHistory from 'history/createMemoryHistory';
import {UserAgentProvider} from '@quentin-sommer/react-useragent'

const RootContext = React.createContext({});
const history = createHistory();

export default class App extends Component {
  static contextType = RootContext;
  componentWillMount() {
  }
  render() {
    return (
      <div>
        <UserAgentProvider ua="firefox">
          <Router history={history} >
            <div>
              <nav>
                  <Link to="/">Locators</Link>
                  <Link to="/Connect">Connect a Locator</Link>
              </nav>
              <Route component={ConnectView} path="/Connect" pageName="Connect" pageDescription="Connect A Locator" />
              <Route component={DevicesView} exact path="/" pageName="Locators" pageDescription="Locators" />
            </div>
          </Router>
        </UserAgentProvider>
      </div>
    );
  }
}
