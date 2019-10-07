import React from "react";
import "../Caro.css";

// eslint-disable-next-line react/destructuring-assignment
const moves = ({ history, stepNumber, undoMove }) => {
  const moves = history.map((step, move) => {
    const desc = move
      ? `Go to move #${move} (${step.location.x},${step.location.y})`
      : "Go to game start";
    return stepNumber === move ? (
      <li key={move} className="bold">
        <button type="button" className="btn-bold" onClick={undoMove(move)}>
          {desc}
        </button>
      </li>
    ) : (
      <li key={move}>
        <button type="button" className="btn" onClick={undoMove(move)}>
          {desc}
        </button>
      </li>
    );
  });
  return <div>{moves}</div>;
};

export default moves;
