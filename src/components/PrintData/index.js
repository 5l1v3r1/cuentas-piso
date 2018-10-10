import React, { Component } from 'react';
import { Table } from 'reactstrap';

import './index.css'


export default class PrintData extends Component {
    constructor(props) {
      super(props);
      this.state = {}

      // this.props:
        // currentUser
        // idSelectedCuenta
        // desc
        // amount
        // selectedUsers
        // printSelectedUsers()
    }
    render(){
        return(
          <div>
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
          </div>
        );
    }
}