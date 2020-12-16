import React, { useState } from 'react';
import Boards from './Boards';

const BoardGame = () => {
  const numRow = 20;
  const numCol = 15;
  const [history, setHistory] = useState([{ squares: Array(numRow * numCol).fill(null) }]);
  return (
    <div className="flex flex-row justify-center w-full">
      <Boards squares={history[0].squares} numCol={numCol} numRow={numRow} />
    </div>
  );
};

export default BoardGame;
