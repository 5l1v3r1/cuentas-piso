import React, { Component } from 'react';
import { Table } from 'reactstrap';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';

import FontAwesome from 'react-fontawesome';

import './index.css'

class DebugTable extends Component {
    constructor(props) {
      super(props);
      this.state = {
        popoverOpen: false
      };
      this.toggle = this.toggle.bind(this);
    }

    toggle() {
      this.setState({
        popoverOpen: !this.state.popoverOpen
      });
    }

    arrayItemsToLi(array){
      if (array === null){
        return null;
      }
      return array.map((item) => {
        return (
            <li>{item}</li>
        );
      });
    }

    createRows(varsArray){
      return Object.keys(varsArray).map((key) => {
        var varName = key;
        var value = varsArray[key];
        return(
          <tr>
            <th scope="row">{varName}: </th>
            <td>
              { value instanceof Array
                ? <ul> {this.arrayItemsToLi(value)} </ul>
                : value }
            </td>
          </tr>
        );
      });
    }

    CreateTable(){
      return(
          <Table hover>
          <thead>
            <tr>
              <th>var</th>
              <th>value</th>
            </tr>
          </thead>
          <tbody>
            { this.createRows(this.props) }
          </tbody>
        </Table>
      );
    }

    createDebugPopover() {
      return (
        <div className="floatRight">
          <Button id="debugPopoverBtn" onClick={this.toggle} color="danger">
            <FontAwesome
              className='fa-bug'
              name='bug'
              size='0.8rem'
              style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
            />
          </Button>
          <Popover placement="bottom" isOpen={this.state.popoverOpen} target="debugPopoverBtn" toggle={this.toggle}>
            <PopoverHeader>Debugger table</PopoverHeader>
            <PopoverBody>{ this.CreateTable() }</PopoverBody>
          </Popover>
        </div>
      );
    }

    render(){
      return(
        <div id="debugPopover">
        { this.createDebugPopover() }
        </div>
      );
    }
}

export {
  DebugTable,
};