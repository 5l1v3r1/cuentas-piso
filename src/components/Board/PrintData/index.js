import React, { Component } from 'react';
import { Table } from 'reactstrap';

import './index.css'

export default class PrintData extends Component {
    constructor(props) {
      super(props);
      this.state = {}
      // props = currentUser, idSelectedCuenta, printSelectedUsers
    }
    render(){
        return(
            <Table hover>
            <thead>
              <tr>
                <th>prop</th>
                <th>value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">this.props.currentUser:</th>
                <td>{this.props.currentUser}</td>
              </tr>
              <tr>
                <th scope="row">this.props.idSelectedCuenta:</th>
                <td>{ this.props.idSelectedCuenta }</td>
              </tr>
              <tr>
                <th scope="row">this.props.desc:</th>
                <td>{ this.props.desc }</td>
              </tr>
              <tr>
                <th scope="row">this.props.amount:</th>
                <td>{ this.props.amount }</td>
              </tr>
              <tr>
                <th scope="row">this.props.selectedUsers:</th>
                <td><ul>{ this.props.printSelectedUsers() }</ul></td>
              </tr>
            </tbody>
          </Table>
        );
    }
}


//<div>
// <Row>
//     {/*Mostrando autor*/}
//     <h3>this.props.currentUser: <strong>{this.props.currentUser}</strong></h3>
// </Row>
// <Row>
//     {/*Mostrando cuenta seleccionada*/}
//     <h3>this.props.idSelectedCuenta: <strong>{ this.props.idSelectedCuenta }</strong></h3>
// </Row>

// <Row>
//     {/*Mostrando descripción introducida*/}
//     <h3>this.props.desc: <strong>{ this.props.desc }</strong></h3>
// </Row>

// <Row>
//     {/*Mostrando cantidad introducida*/}
//     <h3>this.props.amount: <strong>{ this.props.amount }</strong></h3>
// </Row>

// <Row>
//     {/*Mostrando usuarios seleccionados*/}
//     <h3>this.props.selectedUsers: </h3>
//     <ul>
//         <strong>{ this.props.printSelectedUsers() }</strong>
//     </ul>
// </Row>
// </div>