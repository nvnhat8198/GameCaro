const width = 20;
const height = 20;
const squareWin = 5;

const tmpArr = Array(height);
// eslint-disable-next-line no-plusplus
for (let i = 0; i < height; i++) {
  tmpArr[i] = Array(width).fill(null);
}

const history = [
  {
    squares: tmpArr,
    location: null
  }
];

const initialState = {
  history,
  stepNumber: 0,
  xIsNext: true,
  isDescending: true
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "MAKE_MOVE":
      const history = state.history.slice(0, state.stepNumber + 1);
      const current = history[state.stepNumber];
      const squares = current.squares.slice();
      current.squares.map((_row, rowIdx) => {
        squares[rowIdx] = current.squares[rowIdx].slice();
        return true;
      });
      // eslint-disable-next-line no-use-before-define
      if (
        calculateWinner(squares) ||
        squares[action.rowIndex][action.columnIndex]
      ) {
        return {
          ...state
        };
      }
      squares[action.rowIndex][action.columnIndex] = state.xIsNext ? "X" : "O";

      // squares[action.rowIndex][action.columnIndex] = "X";
      // state.history = state.history.concat([
      //   {
      //     squares,
      //     location: {x: action.rowIndex, y: action.columnIndex }
      //   }
      // ]);
      // state.stepNumber = state.history.length;
      // state.xIsNext = false;
      // state.isDescending = state.isDescending;
      // console.log(state.history)
      // while(1){
      // const rIdx = Math.floor( Math.random() * height);
      // const cIdx = Math.floor( Math.random() * width);
      // if(!squares[rIdx][cIdx]){
      //   // xIsNext = !state.xIsNext;
      //   squares[rIdx][cIdx] = "O";

      //   state.history = state.history.concat([
      //     {
      //       squares,
      //       location: {x: rIdx, y: cIdx }
      //     }
      //   ]);
      //   state.stepNumber = state.history.length;
      //   state.xIsNext = false;
      //   state.isDescending = state.isDescending;
      //   console.log(state.history.length)

      //   break;
      // }
      //           if (calculateWinner(squares)){
      //           return {
      //             ...state
      //           };
      //         }
      // }
      // return {
      //               state
      //             };

      return {
        ...state,
        history: history.concat([
          {
            squares,
            location: { x: action.rowIndex, y: action.columnIndex }
          }
        ]),
        stepNumber: history.length,
        xIsNext: !state.xIsNext,
        isDescending: state.isDescending
      };

    case "UNDO_MOVE":
      return {
        ...state,
        stepNumber: action.move,
        xIsNext: action.move % 2 === 0
      };
    case "SORT":
      return {
        ...state,
        isDescending: !state.isDescending
      };
    case "RESTART_GAME":
      return initialState;
    default:
      return state;
  }
};

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

export default reducer;
