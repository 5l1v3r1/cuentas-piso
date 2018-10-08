import React, { Component } from 'react';

import { Alert, Button, Form, Input, FormText } from 'reactstrap';
import { InputGroup, InputGroupAddon } from 'reactstrap';

import './index.css'


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      user: '',
      pswd: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkAuth = this.checkAuth.bind(this);
    this.printErrorMsg = this.printErrorMsg.bind(this);
  }

  checkAuth() {
    // FAKE DATA
    this.setState({real_user: 'john'});
    this.setState({real_pswd: 'doe'});
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({[name]: value});
  }

  handleSubmit(event) {
    event.preventDefault();
    // Faltan las comprobaciones reales contra DB
    //this.checkAuth();

    if ((this.state.user === this.state.real_user) && (this.state.pswd === this.state.real_pswd)) {
      localStorage.setItem('isAuthenticated', true);
      localStorage.setItem('username', this.state.user);
      this.props.toggleAuthenticated();
      }
    else {
      // Mostrar mensaje de error
      this.setState({
        error: true
      });
    }
  }

  printErrorMsg() {
    if(this.state.error){
      return (
        <Alert color="danger">
          Usuario/contraseña incorrecto
        </Alert>
      )
    }
  }

  componentDidMount() {
    this.checkAuth();
  }

  render() {
    return (

      <div className="loginFormApp">
        
        <Form onSubmit={this.handleSubmit} id="loginForm">

          <FormText>Enter username:</FormText>
          <InputGroup>
            <InputGroupAddon addonType="prepend">@</InputGroupAddon>
            <Input
              type="text"
              name="user"
              id="user"
              value={this.state.user}
              onChange={this.handleInputChange}
            />
          </InputGroup>

          <FormText>Enter password:</FormText>
          <InputGroup>
            <InputGroupAddon addonType="prepend">#</InputGroupAddon>
            <Input
                type="password"
                name="pswd"
                id="pswd"
                value={this.state.pswd}
                onChange={this.handleInputChange}
              />
          </InputGroup>

          <Button type="submit" value="Log IN" color="primary" size="lg" block>Log in</Button>

        </Form>


        { this.printErrorMsg() }
      </div>

    );
  }
}

export default Login;