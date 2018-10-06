import React, { Component } from 'react';
import Login from './components/Login';
import Board from './components/Board';
import Menu from './components/Menu';
import './App.css';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isAuthenticated: false
    };

    this.printLoginorBoard = this.printLoginorBoard.bind(this);
    this.toggleAuthenticated = this.toggleAuthenticated.bind(this);
  }

  componentDidMount(){
    this.setState({
      isAuthenticated: (localStorage.getItem('isAuthenticated'))
    });
  }

  toggleAuthenticated(){
    this.setState({
      isAuthenticated: !this.state.isAuthenticated,
    });
  }

  printLoginorBoard(){
    if(this.state.isAuthenticated){
      return <Board toggleAuthenticated={this.toggleAuthenticated} isAuthenticated={this.state.isAuthenticated}/>
    }else{
      return <Login toggleAuthenticated={this.toggleAuthenticated} isAuthenticated={this.state.isAuthenticated}/>
    }
  }

  render() {
    // FIREBASE !!!!
    
    return (
      <div className="App">
        <div className="container">
          <Menu toggleAuthenticated={() => this.toggleAuthenticated()} isAuthenticated={this.state.isAuthenticated}/>
          {this.printLoginorBoard()}
       
        </div>
      </div>
    );
  }
}

export default App;
