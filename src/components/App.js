import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import './App.css';

import Menu from './Menu';

import SignUpPage from './SignUp';
import SignInPage from '../containers/SignIn';
import PasswordForgetPage from './PasswordForget';
import Board from '../containers/Board';
import AccountPage from './Account';
import withAuthentication from './withAuthentication';

import * as routes from '../constants/routes';


const App = () =>
  <Router>
    <div>
      <Menu />

      <hr/>
      {/* When a URL matches this route       => this component will be rendered */}
      <Route exact path={routes.SIGN_UP}         component={SignUpPage} />
      <Route exact path={routes.SIGN_IN}         component={SignInPage} />
      <Route exact path={routes.BOARD}           component={Board} />
      <Route exact path={routes.ACCOUNT}         component={AccountPage} />
      <Route exact path={routes.PASSWORD_FORGET} component={PasswordForgetPage} />
    </div>
  </Router>

export default withAuthentication(App);
