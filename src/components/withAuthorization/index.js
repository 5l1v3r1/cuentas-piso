import React from 'react';
import { withRouter } from 'react-router-dom';

import AuthUserContext from '../AuthUserContext';
import { firebase } from '../../firebase';
import * as routes from '../../constants/routes';


// This high order component allow us to restrict access to
// some components depends on the authenticated state.

const withAuthorization = (authCondition) => (Component) => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      firebase.auth.onAuthStateChanged(authUser => {
        if (!authCondition(authUser)) {
          this.props.history.push(routes.SIGN_IN);
        }
      });
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser => (authUser) ? <Component {...this.props} /> : null}
        </AuthUserContext.Consumer>
      );
    }
  }

  return withRouter(WithAuthorization);
}

export default withAuthorization;