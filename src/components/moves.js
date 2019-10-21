import React from "react";
import "../Caro.css";

// eslint-disable-next-line react/destructuring-assignment
class moves extends React.Component {
  render() {
    const { history, stepNumber, isDescending, onClick } = this.props;
    let moves = history.map((step, move) => {
      const desc = move
        ? `Go to move #${move} (${step.location.x},${step.location.y})`
        : "Go to game start";
      return stepNumber === move ? (
        <li key={move} className="bold">
          <button
            type="button"
            className="button-bold"
            onClick={() => onClick(move)}
          >
            {desc}
          </button>
        </li>
      ) : (
        <li key={move}>
          <button type="button" className="button" onClick={() => onClick(move)}>
            {desc}
          </button>
        </li>
      );
    });
    if (!isDescending) {
      moves = moves.reverse();
    }
    return <div>{moves}</div>;
  }
}

export default moves;
