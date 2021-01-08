import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Socket from '../../../socket/socket';
import { RootState } from '../../../types/Reducer';
import { newGame, play } from '../../../utils/gameUitl/GameHelper2';
import Boards from './Boards';

interface ComponentProps {
  host: any;
  guest: any;
}

const BoardGame = (props: ComponentProps) => {
  const { host, guest } = props;
  const nrows: any = 20;
  const ncols: any = 15;

  const [gameData, setGameData] = useState([]);
  const [winning, setWinning] = useState(null);
  const [isFinish, setIsFinish] = useState(false);
  const [xIsNext, setXIsNext] = useState(false);
  const [turn, setTurn] = useState('O');
  const [squares, setSquares] = useState(Array.from({ length: nrows }, () => Array.from({ length: ncols }, () => '')));

  const { id } = useParams<{ id: string }>();
  const user: any = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    if (host) {
      if (host._id === user._id) setTurn('O');
    }

    if (guest) {
      if (guest._id === user._id) setTurn('X');
      newGame(gameData, 'O', true, false);
    } else {
      const squaresData = Array(nrows)
        .fill(0)
        .map(() => new Array(ncols).fill(null));
      setSquares(squaresData);
    }
  }, [host, guest, user, gameData]);

  useEffect(() => {
    Socket.subNewPlay((err: any, data: any) => {
      if (err) return;
      if (data.position.turn === 'X') setXIsNext(false);
      else setXIsNext(true);

      const { x, y, turn } = data.position;

      if (squares[x][y] !== null) return;
      const newSquares = [...squares];
      newSquares[x][y] = turn;
      setXIsNext(!xIsNext);
      setSquares(newSquares);
    });
  }, [squares, xIsNext]);
  useEffect(() => {
    Socket.subGameFinished((err: any, data: any) => {
      if (err) return;
      setIsFinish(true);
      setWinning(data.winnerLine);
      const choose = false;
      if (choose) resetData();
    });
  }, [host, guest]);
  const handleWin = (winLine: any) => {
    const data = {
      gameId: id,
      winner: host._id,
      loser: guest._id,
      winnerLine: winLine
    };
    Socket.finishGame(data);
  };

  const handleClick = async (i: any, j: any) => {
    if (guest === null) return;
    if (isFinish) return;
    const value = xIsNext ? 'X' : 'O';
    if (value !== turn) return;

    if (squares[i][j] !== null) return;
    const newSquares = [...squares];
    if (xIsNext) newSquares[i][j] = 'X';
    else newSquares[i][j] = 'O';

    setXIsNext(!xIsNext);
    setSquares(newSquares);

    const position = { turn, x: i, y: j };
    Socket.play(id, position);
    setTurn(value);
    const playRes = await play(i, j);
    if (playRes) {
      handleWin(playRes);
    }
  };

  const resetData = () => {
    setGameData([]);
    setWinning(null);
    setIsFinish(false);
    setXIsNext(false);
    setTurn('O');
    setSquares(Array.from({ length: nrows }, () => Array.from({ length: ncols }, () => '')));
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
        <Boards winning={winning} squares={squares} numCol={ncols} numRow={nrows} onClick={handleClick} />
      </div>
    </div>
  );
};

export default BoardGame;
