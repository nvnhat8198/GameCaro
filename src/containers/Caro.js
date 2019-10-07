/* eslint-disable no-unused-vars */
import { connect } from "react-redux";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReplyAll, faSort } from "@fortawesome/free-solid-svg-icons";
import { makeMove, restartGame, sort } from "../actions";
// import Caro from '../components/Caro'

import moves from "../components/moves";
import Board from "../components/Board";
// import PropTypes from 'prop-types'

const width = 20;
const height = 20;
const squareWin = 5;

// const Caro = ({notification, status, winner, current, i, j, makeMove, restartGame, sort }) => (
class Caro extends React.Component {
  render() {
    // eslint-disable-next-line react/destructuring-assignment
    const {
      notification,
      status,
      winner,
      current,
      makeMove,
      restartGame,
      sort
    } = this.props;
    return (
      <div className="content">
        <div className="title">Game Caro VN</div>
        <div className="game">
          <div className="box-left">
            <div className="game-info">
              <div className="status mg-t-30">{notification}</div>
              <div className="status">{status}</div>
              <div className="replay">
                <button
                  type="button"
                  className="btnReplay"
                  onClick={restartGame}
                >
                  <FontAwesomeIcon icon={faReplyAll} /> Chơi lại
                </button>
              </div>
            </div>
          </div>
          <div className="box">
            <div className="game-board">
              <Board
                squares={current}
                onClick={(i, j) => makeMove(i, j)}
                winner={winner}
              />
            </div>
          </div>
          <div className="box-right">
            <div className="scrollbar" id="style-13">
              <div className="game-info">
                <div className="center">
                  <button type="button" className="sort" onClick={sort}>
                    Danh sách nước đi <FontAwesomeIcon icon={faSort} />
                  </button>
                </div>
                <ol>{moves}</ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  let win;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < height; i++) {
    // eslint-disable-next-line no-plusplus
    for (let j = 0; j < width; j++) {
      // eslint-disable-next-line no-continue
      if (!squares[i][j]) continue;
      if (j <= width - squareWin) {
        win = true;
        // eslint-disable-next-line no-plusplus
        for (let k = 0; k < squareWin - 1; k++) {
          if (squares[i][j + k] !== squares[i][j + k + 1]) {
            win = false;
          }
        }
        if (win) {
          if (j > 0 && j < width - squareWin) {
            let check1 = false;
            let check2 = false;
            // eslint-disable-next-line no-plusplus
            for (let k1 = 0; k1 < j; k1++) {
              if (squares[i][k1] && squares[i][k1] !== squares[i][j])
                check1 = true;
            }
            // eslint-disable-next-line no-plusplus
            for (let k2 = j + squareWin; k2 < width; k2++) {
              if (squares[i][k2] && squares[i][k2] !== squares[i][j])
                check2 = true;
            }
            if (!check1 || !check2)
              return { value: squares[i][j], x: j, y: i, direction: "Right" };
          } else {
            return { value: squares[i][j], x: j, y: i, direction: "Right" };
          }
        }
      }

      if (i <= height - squareWin) {
        win = true;
        // eslint-disable-next-line no-plusplus
        for (let k = 0; k < squareWin - 1; k++) {
          if (squares[i + k][j] !== squares[i + k + 1][j]) {
            win = false;
          }
        }
        if (win) {
          if (i > 0 && i < height - squareWin) {
            let check1 = false;
            let check2 = false;
            // eslint-disable-next-line no-plusplus
            for (let k1 = 0; k1 < i; k1++) {
              if (squares[k1][j] && squares[k1][j] !== squares[i][j])
                check1 = true;
            }
            // eslint-disable-next-line no-plusplus
            for (let k2 = i + squareWin; k2 < height; k2++) {
              if (squares[k2][j] && squares[k2][j] !== squares[i][j])
                check2 = true;
            }
            if (!check1 || !check2)
              return { value: squares[i][j], x: j, y: i, direction: "Down" };
          } else {
            return { value: squares[i][j], x: j, y: i, direction: "Down" };
          }
        }
      }

      if (j <= width - squareWin && i <= height - squareWin) {
        win = true;
        // eslint-disable-next-line no-plusplus
        for (let k = 0; k < squareWin - 1; k++) {
          if (squares[i + k][j + k] !== squares[i + k + 1][j + k + 1]) {
            win = false;
          }
        }
        if (win) {
          if (
            i > 0 &&
            j > 0 &&
            i < height - squareWin &&
            j < width - squareWin
          ) {
            let check1 = false;
            let check2 = false;
            // eslint-disable-next-line no-plusplus
            for (let ki = i - 1, kj = j - 1; ki >= 0 && kj >= 0; ki--, kj--) {
              if (squares[ki][kj] && squares[ki][kj] !== squares[i][j])
                check1 = true;
            }
            for (
              let ki = i + squareWin, kj = j + squareWin;
              ki < height && kj < width;
              // eslint-disable-next-line no-plusplus
              ki++, kj++
            ) {
              if (squares[ki][kj] && squares[ki][kj] !== squares[i][j])
                check2 = true;
            }
            if (!check1 || !check2)
              return {
                value: squares[i][j],
                x: j,
                y: i,
                direction: "RightDown"
              };
          } else {
            return { value: squares[i][j], x: j, y: i, direction: "RightDown" };
          }
        }
      }

      if (i <= height - squareWin && j >= squareWin - 1) {
        win = true;
        // eslint-disable-next-line no-plusplus
        for (let k = 0; k < squareWin - 1; k++) {
          if (squares[i + k][j - k] !== squares[i + k + 1][j - k - 1]) {
            win = false;
          }
        }
        if (win) {
          if (
            i > 0 &&
            j < width - 1 &&
            i < height - squareWin &&
            j >= squareWin
          ) {
            let check1 = false;
            let check2 = false;
            for (
              let ki = i - 1, kj = j + 1;
              ki >= 0 && kj < width;
              // eslint-disable-next-line no-plusplus
              ki--, kj++
            ) {
              if (squares[ki][kj] && squares[ki][kj] !== squares[i][j])
                check1 = true;
            }
            for (
              let ki = i + squareWin, kj = j - squareWin;
              ki < height && kj >= 0;
              // eslint-disable-next-line no-plusplus
              ki++, kj--
            ) {
              if (squares[ki][kj] && squares[ki][kj] !== squares[i][j])
                check2 = true;
            }
            if (!check1 || !check2)
              return {
                value: squares[i][j],
                x: j,
                y: i,
                direction: "LeftDown"
              };
          } else {
            return { value: squares[i][j], x: j, y: i, direction: "LeftDown" };
          }
        }
      }
    }
  }
  return null;
}

function support(state) {
  const current = state.reducer.history[state.reducer.stepNumber].squares;
  const winner = calculateWinner(current);
  let status;
  let notification;
  if (winner) {
    status = `${winner.value}`;
    notification = "Người thắng";
  } else {
    status = `${state.reducer.xIsNext ? "X" : "O"}`;
    notification = "Lượt của bạn";
  }
  // alert(state.reducer.i, state.reducer.j);
  return { status, notification, winner };
}

const mapStateToProps = state => ({
  notification: support(state).notification,
  status: support(state).status,
  winner: support(state).winner,
  current: state.reducer.history[state.reducer.stepNumber].squares
});

const mapDispatchToProps = dispatch => ({
  makeMove: (rowIndex, columnIndex) =>
    dispatch(makeMove(rowIndex, columnIndex)),
  restartGame: () => dispatch(restartGame()),
  sort: () => dispatch(sort())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Caro);