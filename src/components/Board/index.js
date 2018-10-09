import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';

import './index.css'
import PaymentsForm from './PaymentsForm'
import PrintData from './PrintData'

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: (localStorage.getItem('currentUser')),
      users: [],
      cuentas: [],
      lineasCuenta: [],
      idSelectedCuenta: '',
      selectedUsers: [],
      desc: '',
      amount: ''
    };
    this.fetchData = this.fetchData.bind(this);
    this.addSelectedUser = this.addSelectedUser.bind(this);
    this.removeSelectedUser = this.removeSelectedUser.bind(this);
    this.printSelectedUsers = this.printSelectedUsers.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
    this.fetchData();
  }

  fetchData(){
    this.setState({
      users: [
        {id:'00', username:'user0', pswd_hash:'hashed0', avatar: ''},
        {id:'01', username:'user1', pswd_hash:'hashed1', avatar: ''},
        {id:'02', username:'user2', pswd_hash:'hashed2', avatar: ''},
        {id:'03', username:'user3', pswd_hash:'hashed3', avatar: ''}
      ],

      cuentas: [
        {id:'00', name:'Septiembre M y B',      users:['00', '01'],             lineasCuenta:['00', '01']},
        {id:'01', name:'Octubre D y M',         users:['02', '03'],             lineasCuenta:['02']},
        {id:'02', name:'Noviembre D, B y M',    users:['00', '01', '02'],       lineasCuenta:['03', '04']},
        {id:'03', name:'Noviembre B, M, D y X', users:['00', '01', '02', '03'], lineasCuenta:['05']}
      ],

      lineasCuenta: [
        {id: '00', cuenta:'00', desc:'Pechugas de pollo',   cant:3.60, author:'00', users:['00','01'],             date:'FuncionFecha'},
        {id: '01', cuenta:'00', desc:'Costillar de cerdo',  cant:5.20, author:'01', users:['00','01'],             date:'FuncionFecha'},
        {id: '02', cuenta:'01', desc:'Aceite de oliva',     cant:4.75, author:'02', users:['00','01', '02'],       date:'FuncionFecha'},
        {id: '03', cuenta:'02', desc:'Papel higiénico',     cant:3.20, author:'01', users:['00','01', '02'],       date:'FuncionFecha'},
        {id: '04', cuenta:'02', desc:'Objetos de limpieza', cant:8.30, author:'02', users:['00','01', '02'],       date:'FuncionFecha'},
        {id: '05', cuenta:'03', desc:'Gel de baño',         cant:8.30, author:'03', users:['00','01', '02', '03'], date:'FuncionFecha'}
      ]

    });
  }

  addSelectedUser(id) {
    this.setState({ 
        selectedUsers: this.state.selectedUsers.concat([id])
    })
  }
  removeSelectedUser(id){
  var array = this.state.selectedUsers.filter(function(user) { 
      return user !== id });
  this.setState({
      selectedUsers: array
      });
  }
  printSelectedUsers(){
    return this.state.selectedUsers.map((user) => {
      return (
          <li>{user}</li>
      );
    });
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({[name]: value});
  }

  render() {
    return (
      <div className="Board">
      <Container>

          <PaymentsForm currentUser={ this.state.currentUser } users={this.state.users} 
                        cuentas={this.state.cuentas} lineasCuenta={this.state.lineasCuenta}
                        addSelectedUser={this.addSelectedUser} removeSelectedUser={this.removeSelectedUser}
                        selectedUsers={this.state.selectedUsers} idSelectedCuenta={this.state.idSelectedCuenta}
                        handleChange={this.handleChange} />

          <PrintData currentUser={this.state.currentUser} idSelectedCuenta={this.state.idSelectedCuenta}
                                  printSelectedUsers={this.printSelectedUsers} desc={this.state.desc} 
                                  amount={this.state.amount}/>

        </Container>
        </div>
    );
  }
}

export default Board;
