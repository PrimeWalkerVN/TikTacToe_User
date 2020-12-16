import React, { useState } from 'react';
import Boards from './Boards';

const BoardGame = () => {
  const numRow = 20;
  const numCol = 15;
  const [squares, setSquares] = useState(Array(numRow * numCol).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const handleClick = (i: any) => {
    if (squares[i] !== undefined) return;
    const newSquares = squares.slice();
    if (xIsNext) newSquares[i] = 'X';
    else newSquares[i] = 'O';

    setXIsNext(!xIsNext);
    setSquares(newSquares);
  };
  return (
    <div className="flex flex-row justify-center w-full">
      <div
        style={{ flex: 0.2 }}
        className="flex flex-col justify-between rounded-lg shadow-lg p-2 chat-panel max-w-sm "
      >
        History
      </div>
      <div style={{ flex: 0.8 }} className="flex justify-center">
        <Boards squares={squares} numCol={numCol} numRow={numRow} onClick={handleClick} />
      </div>
    </div>
  );
};

export default BoardGame;
