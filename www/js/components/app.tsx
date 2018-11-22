import React, { Component } from 'react';
import { Router, Route, Link, browserHistory,IndexRoute } from 'react-router';
import ConnectView from './views/connect';
import {getPath} from '../services/window';


const RootContext = React.createContext({});
const loc = getPath();
export default class Root extends Component {
  static contextType = RootContext;
  componentWillMount() {
  }
  shouldComponentUpdate(nextProps, nextState) {
  }
  render() {
    return (
      <div>
        <Router history={history} >
          <Route path={loc}>
            <IndexRoute component={ConnectView} pageName="Connect" pageDescription="Connect A Locator" />
          </Route>
        </Router>
      </div>
    );
  }
}
