import React from "react";
import Row from "./Row";
import "../Caro.css";

// eslint-disable-next-line no-unused-vars
class Board extends React.Component {
  render() {
    let board;
    if (this.props.squares) {
      board = this.props.squares.map((row, rowIdx) => {
        return (
          <Row
            winner={this.props.winner}
            rowIdx={rowIdx}
            row={row}
            squaresCheck={this.props.squaresCheck}
            next={this.props.next}
            onClick={this.props.onClick}
          />
        );
      });
    }
    return <div>{board}</div>;
  }
}

export default Board;
