import React, { Component } from 'react';
import { Router, Route, Link, MemoryRouter, IndexRoute } from 'react-router';
import ConnectView from './views/connect';

  const App = () => {
    return (
      <div>
        <MemoryRouter>
          <Route path="/" component={ConnectView} pageName="Connect" pageDescription="Connect A Locator" />
        </MemoryRouter>
      </div>
    );
  }
