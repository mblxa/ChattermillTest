/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import NotFoundPage from 'containers/NotFoundPage/Loadable';
import LoginPage from '../LoginPage';

import GlobalStyle from '../../global-styles';
import Dashboard from '../Dashboard';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/signin" component={LoginPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </div>
  );
}
