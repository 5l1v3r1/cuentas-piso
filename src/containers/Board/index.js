import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';

import './index.css'
import PaymentsForm from '../../components/PaymentsForm'
import PrintData from '../../components/PrintData'

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
    
    // this.props -> EMPTY

    this.fetchData = this.fetchData.bind(this);
    this.addSelectedUser = this.addSelectedUser.bind(this);
    this.removeSelectedUser = this.removeSelectedUser.bind(this);
    this.printSelectedUsers = this.printSelectedUsers.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.reset = this.reset.bind(this);
  }

  componentDidMount(){
    this.fetchData();
  }

  fetchData(){
    this.setState({
      users: [
        {id:'00', name:'user0', pswd_hash:'hashed0', avatar:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJHKWpDrsNAllIxpJwZC7oUAeqdRmY1w3Rrj1clpT_pcyI9k8iQA'},
        {id:'01', name:'user1', pswd_hash:'hashed1', avatar:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyLr-TxT7i0PY6lDSzWskSqEhaW0rIzE7L-7A78iUrwTTBRturkQ'},
        {id:'02', name:'user2', pswd_hash:'hashed2', avatar:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyXKx81EQRJCG5uBejziBsCsouhOobdxBmfN6x6bva4mLZlv4LPA'},
        {id:'03', name:'user3', pswd_hash:'hashed3', avatar:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzgim_xNkJUb0wP07QWo7NtkqR6JIdneqJsnL_BxETOvKlWefd'}
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

  reset() {
    this.setState({
      idSelectedCuenta: '',
      selectedUsers: [],
      desc: '',
      amount: ''
    })
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
                        selectedUsers={this.state.selectedUsers} idSelectedCuenta={this.state.idSelectedCuenta}
                        addSelectedUser={this.addSelectedUser} removeSelectedUser={this.removeSelectedUser}
                        handleChange={this.handleChange} reset={this.reset} />

          <PrintData currentUser={this.state.currentUser} idSelectedCuenta={this.state.idSelectedCuenta}
                                  desc={this.state.desc} amount={this.state.amount}
                                  printSelectedUsers={this.printSelectedUsers} />

        </Container>
        </div>
    );
  }
}

export default Board;
