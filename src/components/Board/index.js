import React, { Component } from 'react';
import { Button, InputGroup, InputGroupAddon, Input } from 'reactstrap';


class Board extends Component {
  render() {
    return (
      <div className="App">
        <div className="container">
          <InputGroup>
            <InputGroupAddon addonType="prepend">$</InputGroupAddon>
            <Input placeholder="Amount" type="number" step="1" />
            <InputGroupAddon addonType="append">.00</InputGroupAddon>
          </InputGroup>

          <Button color="danger" type="button" onClick={() => this.props.toggleLoginBoard()} value="Log OUT">Log out</Button>
        </div>
      </div>
    );
  }
}

export default Board;
