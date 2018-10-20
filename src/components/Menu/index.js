import React from 'react';
import { NavLink as RRNavLink, Link } from 'react-router-dom';
import {
  Button, Collapse, Nav, NavItem, NavLink,
  Navbar, NavbarToggler, NavbarBrand, 
  UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem 
} from 'reactstrap';

import * as routes from '../../constants/routes'
import { auth } from '../../firebase/firebase';

import AuthUserContext from '../AuthUserContext';  // The component needs to use the same context to access the vars

class Menu extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      isLogged: false,
      isOpen: false,
    };
    
    this.logout = this.logout.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  logout() {
    localStorage.setItem('currentUserLocal', null);
    auth.signOut();  // Firebase API call to deauth
  }

  render() {
    const DropdownAccount = () =>
      <UncontrolledDropdown nav inNavbar>

      <DropdownToggle nav caret>
        Actions
      </DropdownToggle>

      <DropdownMenu right>

        <NavLink to={routes.BOARD} tag={RRNavLink}>
          <DropdownItem>
            Board
          </DropdownItem>
        </NavLink>

        {/* <DropdownItem divider /> */}

        <NavLink to={routes.ACCOUNT} tag={RRNavLink}>
          <DropdownItem>
            Account settings
          </DropdownItem>
        </NavLink>

      </DropdownMenu>
    </UncontrolledDropdown>

    const NavigationAuth = () =>
      <Nav className="ml-auto" navbar>
        <NavItem><NavLink to={routes.LANDING} tag={RRNavLink}>Landing</NavLink></NavItem>
        <DropdownAccount />
        <NavItem><Link to={routes.LANDING}><Button color="danger" onClick={this.logout}>Logout</Button></Link></NavItem>
        </Nav>
      

    const NavigationNonAuth = () =>
      <Nav className="ml-auto" navbar>
        <NavItem><NavLink to={routes.LANDING} tag={RRNavLink}>Landing</NavLink></NavItem>
        <NavItem><Link to={routes.SIGN_IN}><Button color="success" >Login</Button></Link></NavItem>
      </Nav>

    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand>
            <NavLink to={routes.LANDING} tag={RRNavLink}>cuentas-piso</NavLink>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
              
            {/* Tomando authUser desde el contexto creado en withAuthentication */}
            <AuthUserContext.Consumer>
              {authUser => authUser
                ? <NavigationAuth />
                : <NavigationNonAuth />
              }
            </AuthUserContext.Consumer>
            
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Menu;


{/*
  <NavItem>
    { this.props.isAuthenticated ? <Button color="danger" onClick={auth.doLogout}>LOG OUT</Button> : <Button color="success">LOG IN</Button>}
  </NavItem>
*/}