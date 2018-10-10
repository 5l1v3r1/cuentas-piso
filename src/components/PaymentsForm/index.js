import React, { Component } from 'react';
import { Container, Col, Row, Form, Button, FormGroup, 
         InputGroup, InputGroupAddon, Input,
         DropdownToggle, DropdownMenu, 
         Label, Dropdown, DropdownItem,
         Card, CardImg, CardFooter} from 'reactstrap';

import ModalAddCuenta from '../../components/ModalAddCuenta';
import './index.css'

export default class PaymentsForm extends Component {
    constructor(props) {
      super(props);

      this.state = {
        dropdownOpen: false
      }
      
      // this.props.
        // users
        // cuenta
        // selectedUsers
        // removeSelectedUser()
        // addSelectedUser()
        // handleChange()
        // reset()

      this.printUsers = this.printUsers.bind(this);
      this.handleCheckbox = this.handleCheckbox.bind(this);
      this.toggleDropdown = this.toggleDropdown.bind(this);
      this.onClick = this.onClick.bind(this);
      this.printUsersAsCheckbox = this.printUsersAsCheckbox.bind(this);
      this.isChecked = this.isChecked.bind(this);
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

    isChecked(userID){
        if ((this.props.selectedUsers).includes(userID)){
            return true;
        }
    }

    printUsersAsCheckbox(){
        return(
            this.props.users.map((user) => {
                return (
                    <Card>
                    <CardImg top width="100%" src={user.avatar} alt="Avatar" />
                    <CardFooter>
                        <Label check>
                        <Container>
                            <Row>
                                <Col>
                                    <Input name={user.id} 
                                        type="checkbox"
                                        onChange={this.handleCheckbox}
                                        checked={this.isChecked(user.id)}
                                    />
                                </Col>
                                <Col>{ user.name }</Col>
                            </Row>
                        </Container>
                        </Label>
                    </CardFooter>
                </Card>
                );
            })
        );
    }

    printUsers(){
        return this.props.users.map((user) => {
          return (
              <Label check>
                <Input name={user.id} 
                       type="checkbox"
                       onChange={this.handleCheckbox}
                />
                { user.name }
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
                { this.printUsersAsCheckbox() }
                </FormGroup>
            </Col>
            </Row>

            <Row>
            <Col>
                {/* Modal Add Cuenta */}
                <ModalAddCuenta printUsers={this.printUsers} printUsersAsCheckbox={this.printUsersAsCheckbox} reset={this.props.reset} />
            </Col>
            <Col>
                {/* Button Add Payment */}
                <Button color="primary" type="button" value="addOperacion" onClick={this.onClick}>Añadir operación</Button>
            </Col>
            <Col>
                {/* Button Reset */}
                <Button color="secondary" type="button" value="reset" onClick={this.props.reset}>Limpiar selección</Button>
            </Col>
            </Row>

            </Form>
        );
    }
}