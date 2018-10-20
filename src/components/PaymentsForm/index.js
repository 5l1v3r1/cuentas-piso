import React, { Component } from 'react';

import { Container, Col, Row, Form, Button, FormGroup, 
         InputGroup, InputGroupAddon, Input,
         DropdownToggle, DropdownMenu, 
         Label, Dropdown, DropdownItem,
         Card, CardImg, CardFooter} from 'reactstrap';

import withAuthentication from '../../components/withAuthentication';
import { DebugTable } from '../DebugTable'
import { auth, db } from '../../firebase';

import './index.css'


const PaymentsFormPage = ({ history }) =>
  <div>
    <PaymentsForm history={history} />
  </div>

const INITIAL_STATE = {
    authorID: '',
    dropdownOpen: false,
    users: [],
    selectedUsers: [],
    desc: '',
    amount: '',
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class PaymentsForm extends Component {
    constructor(props) {
      super(props);

      this.state = { ...INITIAL_STATE };

      this.handleChange = this.handleChange.bind(this);
      this.handleCheckbox = this.handleCheckbox.bind(this);
      this.toggleDropdown = this.toggleDropdown.bind(this);
      this.isChecked = this.isChecked.bind(this);
      this.addSelectedUser = this.addSelectedUser.bind(this);
      this.removeSelectedUser = this.removeSelectedUser.bind(this);
      this.reset = this.reset.bind(this);
    }

    componentDidMount(){
        this.setState({
            authorID: auth.getCurrentUserUID(),
        });
        // SET THE LIST OF USERS (Objects) FROM FIREBASE DB TO STATE
        db.onceGetUsers().then(snapshot =>
          this.setState({ users: snapshot.val() })
        );
    }

    toggleDropdown() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    // printCuentasDropdown(){
    //     return this.props.cuentas.map((cuenta) => {
    //       return (
    //         <DropdownItem name="idSelectedCuenta"
    //                       onClick={this.handleChange}
    //                       value={cuenta.id}
    //         >
    //           {cuenta.name}
    //         </DropdownItem>
    //       );
    //     });
    //   }

    reset() {
        this.setState({
            selectedUsers: [],
            desc: '',
            amount: '',
        });
    }
    
    addSelectedUser(uid) {
        this.setState({ 
            selectedUsers: this.state.selectedUsers.concat([uid])
        });
    }
    removeSelectedUser(uid){
        var array = this.state.selectedUsers.filter(function(user) { 
                return user !== uid });
        this.setState({
                selectedUsers: array
        });
    }
    
    handleCheckbox(event) {
        const { selectedUsers } = this.state;
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        if (selectedUsers.includes(name)) {
            this.removeSelectedUser(name);
        }
        else {
            this.addSelectedUser(name); 
        }
    }

    isChecked(userID){
        if ((this.state.selectedUsers).includes(userID)){
            return true;
        }
    }
    
    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({[name]: value});
    }

    onSubmit = (event) => {
        // Set ticket's timestamp
        const timestamp = Date.now();

        const {
            amount,
            desc,
            authorID,
            selectedUsers,
        } = this.state;
    
        const {
          history,
        } = this.props;

        event.preventDefault();
    
        // Create a ticket
        db.doCreateTicket(desc, amount, authorID, selectedUsers, timestamp)
          .then(() => {
              this.reset();
              // Falta mostrar mensaje de que se ha añadido correctamente
              })
          .catch(error => {
              this.setState(byPropKey('error', error));
          });
    
        
      }

    render() {
        const {
            users,
            selectedUsers,
            desc,
            amount,
            error,
          } = this.state;
      
        const isInvalid =
            (selectedUsers === []) ||
            (desc === '') ||
            (amount === '');

        // Print users as checkboxes in cards
        const UsersAsCardCheckbox = ({ users }) =>
            <FormGroup check inline>
                {Object.keys(users).map(key =>
                    <Card>
                        <CardImg top width="100%" src={users[key].avatar} alt="Avatar" />
                        <CardFooter>
                            <Label check>
                            <Container>
                                <Row>
                                    <Input name={key}   // key = user.uid
                                        type="checkbox"
                                        onChange={event => this.handleCheckbox(event)}
                                        checked={this.isChecked(key)} />
                                </Row>
                                <Row>{ users[key].username }</Row>
                            </Container>
                            </Label>
                        </CardFooter>
                    </Card>
                )}
            </FormGroup>

        return(
            <Form id="paymentsForm" onSubmit={this.onSubmit}>    

                {/* Checkbox usuarios */}
                <Row>
                    <div className="centered">{ !!users && <UsersAsCardCheckbox users={users} /> }</div>
                </Row>

                <Row>
                    {/* Descripción línea cuenta */}                    
                    <Col>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">@</InputGroupAddon>
                            <Input name="desc" value={desc}
                                onChange={event => this.setState(byPropKey('desc', event.target.value))}
                                type="text"
                                placeholder="Description"
                            />
                            </InputGroup>
                    </Col>
                    {/* Cantidad */}
                    <Col>
                        <InputGroup>
                            <Input name="amount" value={amount}
                                onChange={event => this.setState(byPropKey('amount', event.target.value))}
                                type="number" step="0.05"
                                placeholder="Amount"
                            />
                            <InputGroupAddon addonType="append">€</InputGroupAddon>
                        </InputGroup>
                    </Col>
                </Row>

                <Row>
                    {/* Button Add Payment */}
                    <Col>
                        <Button type="submit" value="addOpt" color="success" disabled={isInvalid}>Añadir operación</Button>
                    </Col>
                    {/* Button Reset */}
                    <Col>
                        <Button type="button" value="reset" color="secondary" onClick={this.reset}>Limpiar selección</Button>
                    </Col>
                </Row>

                <Row>{ error && <p>{error.message}</p> }</Row>

                <Row>
                    <DebugTable desc={this.state.desc}
                                amount={this.state.amount}
                                selectedUsers={this.state.selectedUsers} 
                                authorID={this.state.authorID} 
                                timestamp={this.state.timestamp} />
                </Row>

            </Form>
        );
    }
}

export default withAuthentication(PaymentsFormPage);

{/* Selección de cuenta
<Col>
    <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
    <DropdownToggle caret>
        Seleccionar cuenta 
    </DropdownToggle>
    <DropdownMenu>
        { this.printCuentasDropdown() }
    </DropdownMenu>
    </Dropdown>
</Col> */}