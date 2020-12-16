import React from 'react';
import Square from './Square';

const Boards = (props: any) => {
  const { squares, numRow, numCol, onClick } = props;

  const renderSquare = (i: any, key: any) => <Square onClick={() => onClick(i)} key={key} value={squares[i]} />;

  const renderBoard = () => {
    const size = numRow * numCol;
    const board = Array(size).fill(null);
    for (let i = 0; i < numCol; i++) {
      const rowsSquare = Array(size).fill(null);
      for (let j = 0; j < numRow; j++) {
        const squareKey = i * size + j;
        rowsSquare.push(renderSquare(squareKey, squareKey));
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
