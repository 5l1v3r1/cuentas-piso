import React from 'react';

import AuthUserContext from '../AuthUserContext';
import { firebase } from '../../firebase';

const withAuthentication = (Component) =>
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        authUser: null,
      };
    }

    componentDidMount() {
      firebase.auth.onAuthStateChanged(authUser => {
        authUser
          ? this.setState({ authUser })
          : this.setState({ authUser: null });
      });
    }
    // Firebase offers a neat helper function which can be initialized in the
    // componentDidMount() lifecycle method of the App component. It can be used
    // as a listener for the authenticated user.
    // Gets a function as input and this function has access to the authenticated
    // user object. In addition, this passed function is called every time something
    // changed for the authenticated user. 

    render() {
      const { authUser } = this.state;

      return (
        <AuthUserContext.Provider value={ authUser }>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  }

export default withAuthentication;