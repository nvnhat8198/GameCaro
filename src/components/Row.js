import React from "react";
import Square from "./Square";
import "../Caro.css";

const squareWin = 5;
// eslint-disable-next-line no-unused-vars
class Row extends React.Component {
  render() {
    const { squaresCheck, next } = this.props;
    const row = this.props.row.map((square, colIdx) => {
      let win = false;
      // eslint-disable-next-line react/destructuring-assignment
      const { winner } = this.props;
      // eslint-disable-next-line react/destructuring-assignment
      const { rowIdx } = this.props;
      if (winner) {
        if (
          winner.direction === "Right" &&
          colIdx >= winner.x &&
          colIdx < winner.x + squareWin &&
          rowIdx === winner.y
        ) {
          win = true;
        }
        if (
          winner.direction === "Down" &&
          rowIdx >= winner.y &&
          rowIdx < winner.y + squareWin &&
          colIdx === winner.x
        ) {
          win = true;
        }
        if (
          winner.direction === "RightDown" &&
          colIdx >= winner.x &&
          colIdx < winner.x + squareWin &&
          colIdx - winner.x === rowIdx - winner.y
        ) {
          win = true;
        }
        if (
          winner.direction === "LeftDown" &&
          colIdx <= winner.x &&
          colIdx > winner.x - squareWin &&
          winner.x - colIdx === rowIdx - winner.y
        ) {
          win = true;
        }
      }
      return (
        <Square
          win={win}
          value={square}
          onClick={() =>
            this.props.onClick(this.props.rowIdx, colIdx, squaresCheck, next)
          }
        />
      );
    });
    return <div className="board-row">{row}</div>;
  }
}

export default Row;
