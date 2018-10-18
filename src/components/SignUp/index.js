import React, { Component } from 'react';
import { Link,
         withRouter} from 'react-router-dom';

import { Button, Form, Input } from 'reactstrap';

import { auth, db } from '../../firebase';
import * as routes from '../../constants/routes';

const SignUpLink = () =>
  <p>
    Don't have an account?
    {' '}
    <Link to={routes.SIGN_UP}>Sign Up</Link>
  </p>

const SignUpPage = ({ history }) =>
  <div>
    <SignUpForm history={history} />
  </div>

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  avatar: '',  // !!!!!!!!!!!!!!!!!!
  error: null,
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      username,
      email,
      passwordOne,
      avatar,  // !!!!!!!!!!!!!!!!!!
    } = this.state;

    const {
      history,
    } = this.props;

    // Create the user in the internal Firebase auth DB
    auth.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {

        // Create a user in your own accessible Firebase Database too
        db.doCreateUser(authUser.user.uid, username, email, avatar)
          .then(() => {
            localStorage.setItem('currentUser', authUser.user.uid);
            this.setState({ ...INITIAL_STATE });
            history.push(routes.BOARD);
          })
          .catch(error => {
            this.setState(byPropKey('error', error));
          });
      })
      
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }


  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid = (
      (passwordOne !== passwordTwo) ||
      (passwordOne === '') ||
      (email === '') ||
      (username === ''));

    return (
      <Form id="signUpForm" className="appFormStyle" onSubmit={this.onSubmit}>
        <Input
          value={username}
          onChange={event => this.setState(byPropKey('username', event.target.value))}
          type="text"
          placeholder="Full Name"
        />
        <Input
          value={email}
          onChange={event => this.setState(byPropKey('email', event.target.value))}
          type="text"
          placeholder="Email Address"
        />
        <Input
          value={passwordOne}
          onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
          type="password"
          placeholder="Password"
        />
        <Input
          value={passwordTwo}
          onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
          type="password"
          placeholder="Confirm Password"
        />
        <Button type="submit" value="Sign up" color="success" size="lg" block disabled={isInvalid} >
          Sign Up
        </Button>

        { error && <p>{error.message}</p> }
      </Form>
    );
  }
}


export {
  SignUpForm,
  SignUpLink
};

export default withRouter(SignUpPage);

// Any component which goes in the withRouter() higher order component gets access to
// all the properties of the router. Thus when passing the SignUpPage component to the
// withRouter() higher order component, it has in its own function signature access to
// the props of the React Router. The relevant property for us from the router props is
// the history object. That’s the part which enables us to redirect a user to another 
// page. It can be used to push routes to it for these redirects. That’s why the history 
// is passed down to the SignUpForm component.