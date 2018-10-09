import React from 'react';
import { FormGroup, Form, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import './index.css'

class ModalExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      users: []
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <div>
        <Button color="primary" type="button" value="addCuenta"
                onClick={this.toggle}>{this.props.buttonLabel}
                Añadir cuenta
        </Button>

        <Form id="ModalNuevaCuentaForm">
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Añadir una cuenta nueva</ModalHeader>
          <ModalBody>
            {/*Input nombre de cuenta a crear*/}
            <Input type="text" name="nombreNuevaCuenta" placeholder="Nombre de la cuenta a crear"
                   id="nombreNuevaCuenta" value={this.state.name} onChange={this.props.handleChange} />
            {/* Checkbox usuarios involucrados */}
            <h5>Usuarios involucrados:</h5>
            <FormGroup id="usersCheckboxInput" check inline>
                { this.props.printUsers() }
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Añadir cuenta</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
        </Form>
      </div>
    );
  }
}

export default ModalExample;