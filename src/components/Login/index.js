import React, { Component } from 'react';
import App from '../../App'
import './index.css'

import { Alert, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import { FormFeedback } from 'reactstrap';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: false,
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
    // Faltan las comprobaciones reales contra DB
    this.checkAuth()

    if ((this.state.user === this.state.real_user) && (this.state.pswd === this.state.real_pswd)) {
      this.setState({isLogged: true});
      localStorage.setItem('isLogged', true);
      localStorage.setItem('user', this.state.user);

      this.props.toggleLoginBoard();
      }
    else {
      // Mostrar mensaje de error
      this.setState({error: true});
      //return(this.printErrorMsg());
    }
    event.preventDefault();
  }

  printErrorMsg() {
    if (this.state.error) {
      return (
        <Alert color="danger">
          Usuario/contraseña incorrecto
        </Alert>
      )
    }
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          
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
            <FormFeedback valid>Sweet! that name is available</FormFeedback>
            <FormFeedback valid tooltip>Sweet! that name is available</FormFeedback>
            <FormFeedback>Oh noes! that name is already taken</FormFeedback>

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
      </div>

    );
  }
}

export default Login;