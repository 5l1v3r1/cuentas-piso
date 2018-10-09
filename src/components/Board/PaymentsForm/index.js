import React, { Component } from 'react';
import { Col, Row, Form, Button, FormGroup, 
         InputGroup, InputGroupAddon, Input,
         DropdownToggle, DropdownMenu, 
         Label, Dropdown, DropdownItem} from 'reactstrap';

         import ModalAddCuenta from './ModalAddCuenta';


export default class PaymentsForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
        dropdownOpen: false
      }
      this.printUsers = this.printUsers.bind(this);
      this.handleCheckbox = this.handleCheckbox.bind(this);
      this.toggleDropdown = this.toggleDropdown.bind(this);
      this.onClick = this.onClick.bind(this);
    }

    onClick(event) {
        console.log("Falta por hacer lógica de botón AddPayment");
    }
    
    handleCheckbox(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    if ((this.props.selectedUsers).includes(name)) {
        this.props.removeSelectedUser(name);
    }
    else {
        this.props.addSelectedUser(name); 
    }
    }

    printUsers(){
        return this.props.users.map((user) => {
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
    printCuentasDropdown(){
        return this.props.cuentas.map((cuenta) => {
          return (
            <DropdownItem name="idSelectedCuenta"
                          onClick={this.props.handleChange}
                          value={cuenta.id}
            >
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

    handleSubmit(event){
        event.preventDefault();
        // Falta lógica de añadir nueva línea de cuenta
      }

    render() {
        return(
            <Form id="paymentsForm" onSubmit={this.handleSubmit}>    
            <Row>
            <Col>
                <InputGroup>
                {/* Descripción línea cuenta */}
                <InputGroupAddon addonType="prepend">@</InputGroupAddon>
                <Input name="desc" placeholder="Description"
                        type="text" 
                        onChange={this.props.handleChange}
                        value={this.state.name}
                />
                </InputGroup>
            </Col>
            <Col>
                <InputGroup>
                {/* Cantidad */}
                <Input name="amount" placeholder="Amount"
                       type="number" step="0.05" 
                       onChange={this.props.handleChange}
                       value={this.state.name}/>
                <InputGroupAddon addonType="append">€</InputGroupAddon>
                </InputGroup>
            </Col>
            </Row>

            <Row>
            {/* Selección de cuenta */}
            <Col>
                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
                <DropdownToggle caret>
                    Seleccionar cuenta 
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
                {/* Modal Add Cuenta */}
                <ModalAddCuenta printUsers={this.printUsers} />
            </Col>
            <Col>
                {/* Button Add Payment */}
                <Button color="primary" type="button" value="addOperacion" onClick={this.onClick}>Añadir operación</Button>
            </Col>
            </Row>

            </Form>
        );
    }
}