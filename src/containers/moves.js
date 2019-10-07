/* eslint-disable no-unused-vars */
import { connect } from "react-redux";
import React from "react";
import { makeMove, undoMove } from "../actions";
// import moves from '../components/moves'

// const moves = ({history, stepNumber, undoMove}) => {
class moves extends React.Component {
  render() {
    // eslint-disable-next-line react/destructuring-assignment
    const { history, stepNumber, undoMove } = this.props;
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
  }
}

const mapStateToProps = state => ({
  history: state.reducer.history,
  stepNumber: state.reducer.stepNumber
});

const mapDispatchToProps = dispatch => ({
  makeMove: (rowIndex, columnIndex) =>
    dispatch(makeMove(rowIndex, columnIndex)),
  undoMove: move => dispatch(undoMove(move))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(moves);
