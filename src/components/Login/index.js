import React, { Component } from 'react';
import App from '../../App'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: false,
      user: '',
      pswd: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkAuth = this.checkAuth.bind(this);
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
      // Falta mostrar mensaje de error
    }
    event.preventDefault();
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <form onSubmit={this.handleSubmit}>

            <p><label>
              Username:
              <input
                name="user"
                type="text"
                value={this.state.user}
                onChange={this.handleInputChange} />
            </label></p>

            <p><label>
              Password:
              <input
                name="pswd"
                type="password"
                value={this.state.pswd}
                onChange={this.handleInputChange} />
            </label></p>

            <p><input type="submit" value="Log IN" /></p>
          
          </form>

        </div>
      </div>
    );
  }
}

export default Login;