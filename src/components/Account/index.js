import React from 'react';
import { Table } from 'reactstrap';

import AuthUserContext from '../AuthUserContext';
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import withAuthorization from '../withAuthorization';

const AccountPage = () =>
  <AuthUserContext.Consumer>
    {authUser =>
      <Table>
        <tbody>
          <tr>
            <td>Account </td>
            <td>{authUser.email}</td>
          </tr>
          <tr>
            <td>Password forget </td>
            <td><PasswordForgetForm /></td>
          </tr>
          <tr>
            <td>Password change </td>
            <td><PasswordChangeForm /></td>
          </tr>
        </tbody>
      </Table>
    }
  </AuthUserContext.Consumer>

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(AccountPage);