import React, { Component } from 'react';
import Login from './components/Login';
import Board from './components/Board';
import firebase from 'firebase';
import './App.css';

const config = {
  apiKey: "AIzaSyBFfeJK3HDGsDTjMW22mmcbZB9bwnQDTNA",
  authDomain: "cuentas-piso.firebaseapp.com",
  databaseURL: "https://cuentas-piso.firebaseio.com",
  projectId: "cuentas-piso",
  storageBucket: "cuentas-piso.appspot.com",
  messagingSenderId: "236114228328"
};
firebase.initializeApp(config);

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      toggleLoginBoard: false
    }
    this.printLoginorBoard = this.printLoginorBoard.bind(this);
    this.toggleLoginBoard = this.toggleLoginBoard.bind(this);
  }
  toggleLoginBoard(){
    this.setState({
      toggleLoginBoard: !this.state.toggleLoginBoard
    });
  }
  printLoginorBoard(){
    if(this.state.toggleLoginBoard){
      return <Board toggleLoginBoard={this.toggleLoginBoard}/>
    }else{
      return <Login toggleLoginBoard={this.toggleLoginBoard}/>
    }
  }
  render() {
    let messagesRef = firebase.database();
    console.log(messagesRef);
    return (
      <div className="App">
        <div className="container">
          {
            this.printLoginorBoard()
          }
        </div>
      </div>
    );
  }
}

export default App;
