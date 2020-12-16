import React, { useState } from 'react';
import Boards from './Boards';

const BoardGame = () => {
  const nrows = 20;
  const ncols = 15;
  const [squares, setSquares] = useState(
    Array(nrows)
      .fill(0)
      .map(() => new Array(ncols).fill(null))
  );
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (i: any, j: any) => {
    if (squares[i][j] !== null) return;
    const newSquares = [...squares];
    if (xIsNext) newSquares[i][j] = 'X';
    else newSquares[i][j] = 'O';

    setXIsNext(!xIsNext);
    setSquares(newSquares);
  };
  return (
    <div className="flex flex-row justify-center w-full">
      <div
        style={{ flex: 0.2 }}
        className="flex flex-col justify-between rounded-lg shadow-lg p-2 history-panel max-w-sm "
      >
        History
      </div>
      <div style={{ flex: 0.8 }} className="flex justify-center">
        <Boards squares={squares} numCol={ncols} numRow={nrows} onClick={handleClick} />
      </div>
    </div>
  );
};

export default BoardGame;
