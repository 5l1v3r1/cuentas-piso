import React, { Component } from 'react';
import { Container, Col, Row, Form, Button, FormGroup, 
         Label, InputGroup, InputGroupAddon, Input,
         Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import './index.css'

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
      currentUser: (localStorage.getItem('user')),
      users: [],
      cuentas: [],
      lineasCuenta: [],

      selectedCuenta: '',
      selectedUsers: []
    };
    this.fetchData = this.fetchData.bind(this);
    this.printUsers = this.printUsers.bind(this);
    this.printSelectedUsers = this.printSelectedUsers.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.onClick = this.onClick.bind(this);
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

  handleSubmit(event){
    event.preventDefault();
    // Falta lógica de añadir nueva línea de cuenta
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({[name]: value});
  }

  onClick(event) {
    console.log("Falta por hacer lógica de botón AddPayment");
  }

  handleCheckbox(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    if ((this.state.selectedUsers).includes(name)) {
      this.removeSelectedUser(name);
    }
    else {
      this.addSelectedUser(name); 
    }
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

  printCuentasDropdown(){
    return this.state.cuentas.map((cuenta) => {
      return (
        <DropdownItem name="selectedCuenta"
                      onClick={this.handleChange}
                      value={cuenta.id}>
          {cuenta.name}
        </DropdownItem>
      );
    });
  }

  toggleDropdown() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
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
                  {/* Descripción línea cuenta */}
                  <InputGroupAddon addonType="prepend">@</InputGroupAddon>
                  <Input name="lineCountDesc" placeholder="Description"
                        type="text" 
                        onChange={this.handleChange}
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
                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
                  <DropdownToggle caret>
                    Cuenta 
                  </DropdownToggle>
                  <DropdownMenu>
                    { this.printCuentasDropdown() }
                  </DropdownMenu>
                </Dropdown>
              </Col>
              <Col>
                {/* Checkbox usuarios */}
                <FormGroup check inline>
                  { this.printUsers() }
                </FormGroup>
              </Col>
            </Row>
            
            <Row>
              <Col>
                {/* Button Add Payment */}
                <Button color="primary" type="button" value="Add payment" onClick={this.onClick}>Add payment</Button>
              </Col>
            </Row>

            <Row>
              {/*Mostrando autor*/}
              <h3>this.state.author: <strong>{localStorage.getItem('username')}</strong></h3>
            </Row>
            <Row>
              {/*Mostrando cuenta seleccionada*/}
              <h3>this.state.selectedCuenta: <strong>{ this.state.selectedCuenta }</strong></h3>
              {/*Mostrando usuarios seleccionados*/}
            </Row>
            <Row>
              <h3>this.state.selectedUsers: </h3>
              <ul>
              <strong>{ this.printSelectedUsers() }</strong>
              </ul>
            </Row>

           </Form> 
        </Container>
        </div>
    );
  }
}

export default Board;
