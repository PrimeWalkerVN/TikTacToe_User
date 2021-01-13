import React from 'react';
import Square from './Square';

const Boards = (props: any) => {
  const { squares, numRow, numCol, onClick, winning } = props;

  const checkWin = (i: any, j: any) => {
    if (winning === null) return false;
    return winning.some((item: any) => {
      return item.x === i && item.y === j;
    });
  };
  const renderSquare = (i: any, j: any, key: any) => {
    const win = checkWin(i, j);
    return <Square isWinning={win} onClick={() => onClick(i, j)} key={key} value={squares[i][j]} />;
  };

  const renderBoard = () => {
    const board = Array(numCol).fill(null);
    for (let i = 0; i < numCol; i++) {
      const rowsSquare = Array(numRow).fill(null);
      for (let j = 0; j < numRow; j++) {
        const squareKey = i * numRow + j;
        rowsSquare.push(renderSquare(i, j, squareKey));
      }
      board.push(
        <div className="flex flex-row" key={i}>
          {rowsSquare}
        </div>
      );
    }
    return board.map(item => item);
  };
  return (
    <div className="">
      <div className="flex flex-col">{renderBoard()}</div>
    </div>
  );
};

export default Boards;
