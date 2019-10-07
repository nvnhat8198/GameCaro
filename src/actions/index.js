export const makeMove = (rowIndex, columnIndex) => ({
  type: "MAKE_MOVE",
  rowIndex,
  columnIndex
});

export const undoMove = move => ({
  type: "UNDO_MOVE",
  move
});

export const restartGame = () => ({
  type: "RESTART_GAME"
});

export const sort = () => ({
  type: "SORT"
});
