import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../../../types/Reducer';
import Boards from './Boards';
import Socket from '../../../socket/socket';

import { newGame, setTurn, play, matrixGame } from '../../../utils/gameUitl/GameHelper2';

interface ComponentProps {
  host: any;
  guest: any;
}

const BoardGame = (props: ComponentProps) => {
  const { host, guest } = props;
  const { id } = useParams<{ id: string }>();
  const user: any = useSelector((state: RootState) => state.user.user);
  const socket: any = Socket.getInstance();
  const [gameData, setGameData] = useState([]);

  const [xIsNext, setXIsNext] = useState(false);
  const [turn, setTurn] = useState('O');

  useEffect(() => {
    if (host) {
      if (host._id === user._id) setTurn('O');
    }

    if (guest) {
      if (guest._id === user._id) setTurn('X');
      newGame(gameData, 'O', true, false);
    }
  }, [host, guest]);

  const nrows = 20;
  const ncols = 15;
  const [squares, setSquares] = useState(
    Array(nrows)
      .fill(0)
      .map(() => new Array(ncols).fill(null))
  );

  socket.on('newPlay', (data: any) => {
    if (data.position.turn === 'X') setXIsNext(false);
    else setXIsNext(true);
    setGameData(gameData.concat(data.position));

    const { x } = data.position;
    const { y } = data.position;
    const { turn } = data.position;

    if (squares[x][y] !== null) return;
    const newSquares = [...squares];
    newSquares[x][y] = turn;
    setXIsNext(!xIsNext);
    setSquares(newSquares);
  });

  const handleClick = (i: any, j: any) => {
    const value = xIsNext ? 'X' : 'O';
    if (value !== turn) return;

    if (squares[i][j] !== null) return;
    const newSquares = [...squares];
    if (xIsNext) newSquares[i][j] = 'X';
    else newSquares[i][j] = 'O';

    setXIsNext(!xIsNext);
    setSquares(newSquares);

    const position = { turn, x: i, y: j };
    socket.emit('play', { gameId: id, position });
    setTurn(value);
    play(i, j);
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
