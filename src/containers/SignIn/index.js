import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Alert, Button, Form, Input, FormText } from 'reactstrap';
import { InputGroup, InputGroupAddon } from 'reactstrap';

import {auth} from '../../firebase'
import { SignUpLink } from '../../components/SignUp';
import { PasswordForgetLink } from '../../components/PasswordForget';
import * as routes from '../../constants/routes';
import './index.css';

const SignInPage = ({ history }) =>
  <div className="loginFormApp">
    <SignInForm history={history} />
    <PasswordForgetLink />
    <SignUpLink />
  </div>

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};


class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };

    this.printErrorMsg = this.printErrorMsg.bind(this);
  }

  onSubmit = (event) => {
    event.preventDefault();
    
    const {
      email,
      password,
    } = this.state;

    const {
      history,
    } = this.props;
    
    auth.doSignInWithEmailAndPassword(email, password)
    .then(authUser => {
      this.setState({ ...INITIAL_STATE });
      localStorage.setItem('currentUserLocal', auth.getCurrentUserUID());
      history.push(routes.BOARD);  // Redirection
    })
    .catch(error => {
      this.setState(byPropKey('error', error));
    });
  }

  printErrorMsg() {
    if(this.state.error){
      return (
        <Alert color="danger">
          <ul>
            <li><strong>this.state.error.code:</strong> {this.state.error.code}</li>
            <li><strong>this.state.error.message:</strong> {this.state.error.message}</li>
            <li><strong>this.state.error.stack:</strong> {this.state.error.stack}</li>
          </ul>
        </Alert>
      );
    }
  }

  render() {
    const {
      email,
      password,
      error,
    } = this.state;

    const isInvalid = (
      password === '' ||
      email === '');

    return (
        <div>
          
          <Form id="loginForm" onSubmit={this.onSubmit}>

            <FormText>Enter email:</FormText>
            <InputGroup>
              <InputGroupAddon addonType="prepend">@</InputGroupAddon>
              <Input
                name="email"
                id="email"
                type="text"
                value={ email }
                onChange={event => this.setState(byPropKey('email', event.target.value))}
              />
            </InputGroup>

            <FormText>Enter password:</FormText>
            <InputGroup>
              <InputGroupAddon addonType="prepend">#</InputGroupAddon>
              <Input
                  name="pswd"
                  id="pswd"
                  type="password"
                  value={password}
                  onChange={event => this.setState(byPropKey('password', event.target.value))}
                />
            </InputGroup>

            <Button type="submit" value="Login" color="primary" size="lg" block disabled={isInvalid} >
              Login
            </Button>

          </Form>

          { this.printErrorMsg() }

        </div>

    );  
  }
}


export default withRouter(SignInPage);

export {
  SignInForm,
};

