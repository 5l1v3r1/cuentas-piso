import React, { Component } from 'react';
import { Container, Col, Row, Form, Button, FormGroup, Label, InputGroup, InputGroupAddon, Input } from 'reactstrap';

import './index.css'

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: (localStorage.getItem('user')),
      users: [],
      selectedUsers: []
    };
    this.getUsers = this.getUsers.bind(this);
    this.printUsers = this.printUsers.bind(this);
    this.printSelectedUsers = this.printSelectedUsers.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
  }

  componentDidMount(){
    this.getUsers();
  }

  getUsers(){
    this.setState({
      users: [
        {id:'00', username:'user0', pswd_hash:'hashed0', avatar: ''},
        {id:'01', username:'user1', pswd_hash:'hashed1', avatar: ''},
        {id:'02', username:'user2', pswd_hash:'hashed2', avatar: ''},
        {id:'03', username:'user3', pswd_hash:'hashed3', avatar: ''}
      ],

      cuentas: [
        {id:'00', name:'Septiembre M y B',      users:['00', '01'],             lineas_cuenta:['00', '01']},
        {id:'01', name:'Octubre D y M',         users:['02', '03'],             lineas_cuenta:['02']},
        {id:'02', name:'Noviembre D, B y M',    users:['00', '01', '02'],       lineas_cuenta:['03', '04']},
        {id:'03', name:'Noviembre B, M, D y X', users:['00', '01', '02', '03'], lineas_cuenta:['05']}
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

  handleSubmit(event){
    event.preventDefault();
    // Falta lógica de añadir nueva línea de cuenta
  }

  handleCheckbox(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    
    // console.log(name + " in " + this.state.selectedUsers);
    // console.log((this.state.selectedUsers).includes(name));
    if ((this.state.selectedUsers).includes(name)) {
      this.removeSelectedUser(name);
    }
    else {
      this.addSelectedUser(name); 
    }
    //console.log(this.state.selectedUsers);
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

  printUsers(){
    return this.state.users.map((user) => {
      return (
          <Label check>
            <Input name={user.id} 
                   type="checkbox"
                   onChange={this.handleCheckbox}
            />
            { user.username }
          </Label>
      );
    });
  }

  printSelectedUsers(){
    return this.state.selectedUsers.map((user) => {
      return (
          <li>{user}</li>
      );
    });
  }

  render() {
    return (
      <div className="Board">
      <Container>

          <Form id="paymentsForm" onSubmit={this.handleSubmit}>    
            <Row>
              <Col>
                <InputGroup>
                  {/* Nombre cuenta */}
                  <InputGroupAddon addonType="prepend">@</InputGroupAddon>
                  <Input name="accountName" placeholder="Account name"
                        type="text" 
                        onChange={this.handleChangeName}
                        value={this.state.name}
                  />
                </InputGroup>
              </Col>
              <Col>
                <InputGroup>
                  {/* Cantidad */}
                  <Input name="amount" placeholder="Amount"
                        type="number" step="0.05" />
                  <InputGroupAddon addonType="append">€</InputGroupAddon>
                </InputGroup>
              </Col>
            </Row>
          
            <Row>
              <Col>
                {/* Button Add Payment */}
                <Button color="primary" type="button" value="Add payment">Add payment</Button>
              </Col>
              
              <Col>
                {/* Checkbox usuarios */}
                <FormGroup check inline>
                  { this.printUsers() }
                </FormGroup>
              </Col>
            </Row>
            
            <Row>
              {/*Mostrando usuarios seleccionados*/}
              <ul>
                <h3>this.state.selectedUsers: </h3>
                { this.printSelectedUsers() }
              </ul>
            </Row>

           </Form> 
        </Container>
        </div>
    );
  }
}

export default Board;
