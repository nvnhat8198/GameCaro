import React from 'react';
import './Caro.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReplyAll } from '@fortawesome/free-solid-svg-icons'
import { faSort } from '@fortawesome/free-solid-svg-icons'

const width = 20;
const height = 20;
const squareWin = 5;

class Square extends React.Component{
  render(){
    return (this.props.win) ? (<button className = "square win" onClick = {this.props.onClick}>{this.props.value}</button>):
      (<button className = "square" onClick = {this.props.onClick}>{this.props.value}</button>);
  }
}

class Row extends React.Component {
  render() {
    let row = this.props.row.map((square, colIdx) => {
      let win = false;
      let winner = this.props.winner;
      let rowIdx = this.props.rowIdx;
      if (winner) {
        if (winner.direction === "Right" && colIdx >= winner.x && colIdx < winner.x + squareWin && rowIdx === winner.y) {
            win = true;
        }
        if (winner.direction === "Down" && rowIdx >= winner.y && rowIdx < winner.y + squareWin && colIdx === winner.x) {
            win = true;
        }
        if (winner.direction === "RightDown" && colIdx >= winner.x && colIdx < winner.x + squareWin && colIdx - winner.x === rowIdx - winner.y) {
            win = true;
        }
        if (winner.direction === "LeftDown" && colIdx <= winner.x && colIdx > winner.x - squareWin && winner.x - colIdx === rowIdx - winner.y) {
            win = true;
        }
      }
      return (
        <Square win = {win} value = {square} onClick = {() => this.props.onClick(this.props.rowIdx, colIdx)}/>
      )
    })
    return (
      <div className = "board-row">{row}</div>
    )
  }
}

class Board extends React.Component {
  render() {
    let board = this.props.squares.map((row, rowIdx) => {
      return (
        <Row winner = {this.props.winner} rowIdx = {rowIdx} row = {row} onClick = {this.props.onClick}/>
      )
    })
    return (
      <div>{board}</div>
    );
  }
}

class Caro extends React.Component {
  constructor(props) {
    super(props);
    let tmpArr = Array(height);
    for (let i = 0; i < height; i++) {
      tmpArr[i] = Array(width).fill(null);
    }
    this.state = {
      history: [{
        squares: tmpArr,
        location: null,
      }],
      stepNumber: 0,
      xIsNext: true,
      isDescending: true,
    };
    this.sort = this.sort.bind(this);
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    })
  }

  handleClick(i, j) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[this.state.stepNumber];
    const squares = current.squares.slice();
    current.squares.map((row, rowIdx) => {
      squares[rowIdx] = current.squares[rowIdx].slice();
      return true;
    })
    if (calculateWinner(squares) || squares[i][j]) {
      return;
    }
    squares[i][j] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
        location: {x: i, y: j}
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  sort() {
    this.setState({isDescending: !this.state.isDescending});
  }

  replay(){
    let tmpArr = Array(height);
     for (let i = 0; i < height; i++) {
       tmpArr[i] = Array(width).fill(null);
     }    
     const squares = tmpArr;
     this.setState({
       history: ([{
         squares: squares,
         location: null,
       }]),
       stepNumber: 0,
       xIsNext: true,
       isDescending: true,
     });
   }
  
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    let moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move + ' (' + step.location.x + ',' + step.location.y + ')' :
        'Go to game start';
      return (this.state.stepNumber === move) ? (
        <li key = {move} className = "bold">
          <button className = "btn-bold" onClick = {() => this.jumpTo(move)}>{desc}</button>
        </li>
      ) : (
        <li key = {move}>
        <button className = "btn" onClick = {() => this.jumpTo(move)}>{desc}</button>
      </li>
      );
    });

    if (!this.state.isDescending) {
      moves = moves.reverse();
    }

    let status;
    let notification;
    if (winner) {
      status = '' + winner.value;
      notification = 'Người thắng';
    } else {
      status = '' + (this.state.xIsNext ? 'X' : 'O');
      notification = 'Lượt của bạn';
    }

    return (
      <div class = "content">
        <div className = "title">Game Caro VN</div>          
        <div className = "game">
          <div className = "box-left">
            <div className = "game-info">
              <div className = "status mg-t-30">{notification}</div>
              <div className = "status">{status}</div>
              <div className = "replay">
                <button className = "btnReplay" onClick = {() => this.replay()}>
                    <FontAwesomeIcon icon = {faReplyAll}/> Chơi lại
                </button>
              </div>
            </div>
          </div>
          <div className = "box">
            <div className = "game-board">
              <Board squares = {current.squares} onClick = {(i, j) => this.handleClick(i, j)} winner = {winner}/>
            </div>
          </div>
          <div className = "box-right">
            <div class = "scrollbar" id = "style-13">
              <div className = "game-info">
                <div className = "center">
                  <button className = "sort" onClick = {() => this.sort()}>Danh sách nước đi <FontAwesomeIcon icon = {faSort}/></button>
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
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (!squares[i][j]) continue;
      if (j <= width - squareWin) {
        win = true;
        for (let k = 0; k < squareWin - 1; k++) {
          if (squares[i][j + k] !== squares[i][j + k + 1]) {
            win = false
          }
        }
        if (win){
          if(j > 0 && j < width - squareWin){
            let check1 = false;
            let check2 = false;
            for(let k1 = 0; k1 < j; k1++){
              if(squares[i][k1] && squares[i][k1] !== squares[i][j]) check1 = true;
            }
            for(let k2 = j + squareWin; k2 < width ;k2++){
              if(squares[i][k2] && squares[i][k2] !== squares[i][j]) check2 = true;
            }
            if(!check1 || !check2) return {value: squares[i][j], x: j, y: i, direction: 'Right'};
          }          
          else{
            return {value: squares[i][j], x: j, y: i, direction: 'Right'};
          }
        }
      }

      if (i <= height - squareWin) {
        win = true;
        for (let k = 0; k < squareWin - 1; k++) {
          if (squares[i + k][j] !== squares[i + k + 1][j]) {
            win = false
          }
        }
        if (win){ 
          if(i > 0 && i < height - squareWin){
            let check1 = false;
            let check2 = false;
            for(let k1 = 0; k1 < i; k1++){
              if(squares[k1][j] && squares[k1][j] !== squares[i][j])check1 = true;
            }
            for(let k2 = i + squareWin; k2 < height; k2++){
              if(squares[k2][j] && squares[k2][j] !== squares[i][j])check2 = true;
            }
            if(!check1 || !check2)return {value: squares[i][j], x: j, y: i, direction: 'Down'};
          }
          else{
            return {value: squares[i][j], x: j, y: i, direction: 'Down'};
          }
        }
      }

      if (j <= width - squareWin && i <= height - squareWin) {
        win = true;
        for (let k = 0; k < squareWin - 1; k++) {
          if (squares[i + k][j + k] !== squares[i + k + 1][j + k + 1]) {
            win = false
          }
        }
        if (win)
        {
          if(i > 0 && j > 0 && i < height - squareWin && j < width - squareWin){
            let check1 = false;
            let check2 = false;
            for(let ki = i - 1, kj = j - 1; ki >= 0 && kj >= 0; ki--, kj--){
              if(squares[ki][kj] && squares[ki][kj] !== squares[i][j]) check1 = true;
            }
            for(let ki = i + squareWin, kj = j + squareWin; ki < height && kj < width; ki++, kj++)
            {
              if(squares[ki][kj] && squares[ki][kj] !== squares[i][j]) check2 = true;
            }
            if(!check1 || !check2)return {value: squares[i][j], x: j, y: i, direction: 'RightDown'};
          }
          else{
            return {value: squares[i][j], x: j, y: i, direction: 'RightDown'};
          }
        }
      }
      
      if (i <= height - squareWin && j >= squareWin - 1) {
        win = true;
        for (let k = 0; k < squareWin - 1; k++) {
          if (squares[i + k][j - k] !== squares[i + k + 1][j - k - 1]) {
            win = false
          }
        }
        if (win){
          if(i > 0 && j < width - 1 && i < height - squareWin && j >= squareWin){
            let check1 = false;
            let check2 = false;
            for(let ki = i - 1, kj = j + 1; ki >= 0 && kj < width; ki--, kj++){
              if(squares[ki][kj] && squares[ki][kj]!== squares[i][j]) check1 = true;
            }
            for(let ki = i + squareWin, kj = j - squareWin; ki < height && kj >= 0; ki++, kj--){
              if(squares[ki][kj] && squares[ki][kj] !== squares[i][j]) check2 = true;
            }
            if(!check1 || !check2)return {value: squares[i][j], x: j, y: i, direction: 'LeftDown'};
          }
          else{
            return {value: squares[i][j], x: j, y: i, direction: 'LeftDown'};
          }
        }
      }
    }
  }
  return null;
}

export default Caro;