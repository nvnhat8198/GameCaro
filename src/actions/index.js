export const makeMove = (rowIndex, columnIndex) => ({
  type: "MAKE_MOVE",
  rowIndex,
  columnIndex
});

export const undoMove = move => ({
  type: "UNDO_MOVE",
  move
});

export const undo = (move, squares) => {
  return dispatch => {
    dispatch(undoMove(move));
    if (move % 2 !== 0) {
      let rIdx;
      rIdx = Math.floor(Math.random() * 20);
      let cIdx;
      cIdx = Math.floor(Math.random() * 20);
      while (squares[rIdx][cIdx]) {
        rIdx = Math.floor(Math.random() * 20);
        cIdx = Math.floor(Math.random() * 20);
      }
      setTimeout(
        // eslint-disable-next-line func-names
        function() {
          dispatch(makeMove(rIdx, cIdx));
        },
        1500
      );
    }
  };
};

export const restartGame = () => ({
  type: "RESTART_GAME"
});

export const restart = () => {
  return dispatch => {
    dispatch(restartGame());
  };
};

export const sort = () => ({
  type: "SORT"
});

export const sortStep = () => {
  return dispatch => {
    dispatch(sort());
  };
};

export const placeAndProceed = (rowIdx, colIdx, squares, xIsNext) => {
  return dispatch => {
    if (xIsNext) {
      if (!squares[rowIdx][colIdx]) {
        dispatch(makeMove(rowIdx, colIdx));
        let rIdx;
        rIdx = Math.floor(Math.random() * 20);
        let cIdx;
        cIdx = Math.floor(Math.random() * 20);
        while (squares[rIdx][cIdx]) {
          rIdx = Math.floor(Math.random() * 20);
          cIdx = Math.floor(Math.random() * 20);
        }
        setTimeout(
          // eslint-disable-next-line func-names
          function() {
            dispatch(makeMove(rIdx, cIdx));
          },
          1500
        );
      }
    }
  };
};
