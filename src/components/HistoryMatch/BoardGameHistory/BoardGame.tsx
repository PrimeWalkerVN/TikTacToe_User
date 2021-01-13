import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../../../types/Reducer';
import Boards from './Boards';

interface ComponentProps {
  gameData: any;
  winLine: any;
}

const BoardGame = (props: ComponentProps) => {
  const { gameData = [], winLine = [] } = props;
  const nrows: any = 20;
  const ncols: any = 20;

  const [winning, setWinning] = useState(null);
  const [squares, setSquares] = useState(
    Array(nrows)
      .fill(0)
      .map(() => new Array(ncols).fill(null))
  );

  useEffect(() => {
    const newSquares = Array(nrows)
      .fill(0)
      .map(() => new Array(ncols).fill(null));

    if (gameData.length > 0) {
      gameData.forEach((value: any) => {
        newSquares[value.x][value.y] = value.turn;
      });
      setSquares(newSquares);
    }
    if (winLine) {
      setWinning(winLine);
    }
  }, [gameData, winLine]);

  return (
    <div className="flex flex-col justify-center w-full">
      <div style={{ flex: 0.8 }} className="flex justify-center">
        <Boards winning={winning} squares={squares} numCol={ncols} numRow={nrows} />
      </div>
    </div>
  );
};

export default BoardGame;
