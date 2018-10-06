import React, { Component } from 'react';

class Board extends Component {
  render() {
    return (
      <div className="App">
        <div className="container">
          <input type="button" onClick={() => this.props.toggleLoginBoard()} value="Log OUT"/>
        </div>
      </div>
    );
  }
}

export default Board;
