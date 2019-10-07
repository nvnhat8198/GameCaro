/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReplyAll, faSort } from "@fortawesome/free-solid-svg-icons";
import Board from "./Board";
import moves from "./moves";

import "../Caro.css";

// eslint-disable-next-line react/destructuring-assignment
const Caro = ({
  notification,
  status,
  winner,
  current,
  i,
  j,
  makeMove,
  restartGame,
  sort
}) => (
  <div className="content">
    <div className="title">Game Caro VN</div>
    <div className="game">
      <div className="box-left">
        <div className="game-info">
          <div className="status mg-t-30">{notification}</div>
          <div className="status">{status}</div>
          <div className="replay">
            <button type="button" className="btnReplay" onClick={restartGame}>
              <FontAwesomeIcon icon={faReplyAll} /> Chơi lại
            </button>
          </div>
        </div>
      </div>
      <div className="box">
        <div className="game-board">
          <Board
            squares={current}
            onClick={() => makeMove(i, j)}
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

// Caro.propTypes = {
//   notification: PropTypes.string.isRequired,
//   status: PropTypes.string,
//   winner: PropTypes.arrayOf(
//     PropTypes.shape({
//       value: PropTypes.arrayOf(
//         PropTypes.shape({
//           i: PropTypes.number.isRequired,
//           j: PropTypes.number.isRequired
//         }).isRequired
//       ).isRequired,
//       x: PropTypes.number.isRequired,
//       y: PropTypes.number.isRequired,
//       direction: PropTypes.string.isRequired
//     }).isRequired
//   ).isRequired,
//   current: PropTypes.arrayOf(
//     PropTypes.shape({
//       i: PropTypes.number.isRequired,
//       j: PropTypes.number.isRequired
//     }).isRequired
//   ).isRequired,
//   i: PropTypes.number.isRequired,
//   j: PropTypes.number.isRequired,
//   makeMove: PropTypes.func.isRequired,
//   restartGame: PropTypes.func.isRequired,
//   sort: PropTypes.func.isRequired
// };

export default Caro;
