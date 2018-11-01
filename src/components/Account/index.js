import React from 'react';
import { Table } from 'reactstrap';

import AuthUserContext from '../AuthUserContext';
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import withAuthorization from '../withAuthorization';

import './index.css';

const AccountPage = () =>
  <AuthUserContext.Consumer>
    {authUser =>
      <div class="centered">
      <Table bordered id="accountInfo">
        <tbody>
          <tr>
            <th scope="row">Account</th>
            <td>{authUser.email}</td>
          </tr>
          <tr>
            <th scope="row">Unique ID</th>
            <td>{authUser.uid}</td>
          </tr>
        </tbody>
      </Table>
      <Table bordered id="accountActions">
        <tbody>
          <tr>
            <th scope="row">Password forget </th>
            <td><PasswordForgetForm /></td>
          </tr>
          <tr>
            <th scope="row">Password change </th>
            <td><PasswordChangeForm /></td>
          </tr>
        </tbody>
      </Table>
      </div>
    }
  </AuthUserContext.Consumer>

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(AccountPage);