// eslint-disable-next-line max-classes-per-file
import React from "react";

// eslint-disable-next-line no-unused-vars
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReplyAll, faSort } from "@fortawesome/free-solid-svg-icons";
import "./Caro.css";

const width = 20;
const height = 20;
const squareWin = 5;

// eslint-disable-next-line no-unused-vars
class Square extends React.Component {
  render() {
    return this.props.win ? (
      <button type="button" className="square win" onClick={this.props.onClick}>
        {this.props.value}
      </button>
    ) : (
      <button type="button" className="square" onClick={this.props.onClick}>
        {this.props.value}
      </button>
    );
  }
}

// eslint-disable-next-line no-unused-vars
class Row extends React.Component {
  render() {
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
          onClick={() => this.props.onClick(this.props.rowIdx, colIdx)}
        />
      );
    });
    return <div className="board-row">{row}</div>;
  }
}

// eslint-disable-next-line no-unused-vars
class Board extends React.Component {
  render() {
    const board = this.props.squares.map((row, rowIdx) => {
      return (
        <Row
          winner={this.props.winner}
          rowIdx={rowIdx}
          row={row}
          onClick={this.props.onClick}
        />
      );
    });
    return <div>{board}</div>;
  }
}

class Caro extends React.Component {
  constructor(props) {
    super(props);
    const tmpArr = Array(height);
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < height; i++) {
      tmpArr[i] = Array(width).fill(null);
    }
    this.state = {
      history: [
        {
          squares: tmpArr,
          location: null
        }
      ],
      stepNumber: 0,
      xIsNext: true,
      isDescending: true
    };
    this.sort = this.sort.bind(this);
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  }

  handleClick(i, j) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[this.state.stepNumber];
    const squares = current.squares.slice();
    current.squares.map((_row, rowIdx) => {
      squares[rowIdx] = current.squares[rowIdx].slice();
      return true;
    });
    // eslint-disable-next-line no-use-before-define
    if (calculateWinner(squares) || squares[i][j]) {
      return;
    }
    squares[i][j] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares,
          location: { x: i, y: j }
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  sort() {
    this.setState({ isDescending: !this.state.isDescending });
  }

  replay() {
    const tmpArr = Array(height);
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < height; i++) {
      tmpArr[i] = Array(width).fill(null);
    }
    const squares = tmpArr;
    this.setState({
      history: [
        {
          squares,
          location: null
        }
      ],
      stepNumber: 0,
      xIsNext: true,
      isDescending: true
    });
  }

  render() {
    // eslint-disable-next-line react/destructuring-assignment
    const { history } = this.state;
    const current = history[this.state.stepNumber];
    // eslint-disable-next-line no-use-before-define
    const winner = calculateWinner(current.squares);
    let moves = history.map((step, move) => {
      const desc = move
        ? `Go to move #${move} (${step.location.x},${step.location.y})`
        : "Go to game start";
      return this.state.stepNumber === move ? (
        <li key={move} className="bold">
          <button
            type="button"
            className="btn-bold"
            onClick={() => this.jumpTo(move)}
          >
            {desc}
          </button>
        </li>
      ) : (
        <li key={move}>
          <button
            type="button"
            className="btn"
            onClick={() => this.jumpTo(move)}
          >
            {desc}
          </button>
        </li>
      );
    });

    if (!this.state.isDescending) {
      moves = moves.reverse();
    }

    let status;
    let notification;
    if (winner) {
      status = `${winner.value}`;
      notification = "Người thắng";
    } else {
      status = `${this.state.xIsNext ? "X" : "O"}`;
      notification = "Lượt của bạn";
    }
    return (
      <div className="content">
        <div className="title">Game Caro</div>
        <div className="game">
          <div className="box-left">
            <div className="game-info">
              <div className="status mg-t-30">{notification}</div>
              <div className="status">{status}</div>
              <div className="replay">
                <button
                  type="button"
                  className="btnReplay"
                  onClick={() => this.replay()}
                >
                  <FontAwesomeIcon icon={faReplyAll} /> Chơi lại
                </button>
              </div>
            </div>
          </div>
          <div className="box">
            <div className="game-board">
              <Board
                squares={current.squares}
                onClick={(i, j) => this.handleClick(i, j)}
                winner={winner}
              />
            </div>
          </div>
          <div className="box-right">
            <div className="scrollbar" id="style-13">
              <div className="game-info">
                <div className="center">
                  <button
                    type="button"
                    className="sort"
                    onClick={() => this.sort()}
                  >
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

export default Caro;
