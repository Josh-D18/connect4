export const generateGameBoard: () => string[][] = () => {
  //  seven-column, six-row vertically suspended grid.
  const gameBoard: string[][] = [];
  for (let row = 0; row < 6; row++) {
    const element: string[] = [];
    gameBoard.push(element);
    for (let col = 0; col < 7; col++) {
      element.push('');
    }
  }
  return gameBoard;
};
