import React, { Component } from 'react';
import { Router, Route, IndexRoute} from 'react-router';
import ConnectView from './views/connect';
import {getPath} from '../services/window';
import createHistory from 'history/createMemoryHistory';

const RootContext = React.createContext({});
const loc = getPath();
const history = createHistory();

export default class App extends Component {
  static contextType = RootContext;
  componentWillMount() {
  }
  render() {
    return (
      <div>
        <Router history={history} >
          <Route path={loc}>
            <Route component={ConnectView} path="/" pageName="Connect" pageDescription="Connect A Locator" />
          </Route>
        </Router>
      </div>
    );
  }
}
