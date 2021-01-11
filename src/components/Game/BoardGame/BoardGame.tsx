import { Button, Modal } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Socket from '../../../socket/socket';
import { RootState } from '../../../types/Reducer';
import { newGame, play } from '../../../utils/gameUitl/GameHelper2';
import Boards from './Boards';
import Timer from './Timer';

interface ComponentProps {
  player1: any;
  player2: any;
  isStarted: any;
  chats: any;
  currentBoard: any;
  finishedMatch: any;
  setFinishedMatch: any;
}

const BoardGame = (props: ComponentProps) => {
  const { player1, player2, isStarted, chats, finishedMatch, setFinishedMatch, currentBoard = [] } = props;
  const nrows: any = 20;
  const ncols: any = 20;

  const [counter, setCounter] = useState(-1);
  const [gameData, setGameData] = useState([]);
  const [winning, setWinning] = useState(null);
  const [xIsNext, setXIsNext] = useState(false);
  const [turn, setTurn] = useState('O');
  const [squares, setSquares] = useState(Array.from({ length: nrows }, () => Array.from({ length: ncols }, () => '')));
  const [isModal, setIsModal] = useState(false);
  const [winnerTurn, setWinnerTurn] = useState<any>('');

  const { id } = useParams<{ id: string }>();
  const user: any = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    if (player1) {
      if (player1._id === user._id) setTurn('O');
    }
    if (player2) {
      if (player2._id === user._id) setTurn('X');
      newGame(gameData, 'O', true, false);
    } else {
      const squaresData = Array(nrows)
        .fill(0)
        .map(() => new Array(ncols).fill(null));
      setSquares(squaresData);
    }
  }, [player1, player2, user, gameData]);

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
      stopTimer(-1);
      startTimer();
    });
  }, [squares, xIsNext]);
  useEffect(() => {
    if (player1 && player2) {
      Socket.subGameFinished((err: any, data: any) => {
        if (err) return;
        setWinning(data?.winLine ?? null);

        // thong bao winner hoac hoa` .....

        if (player1)
          if (data.winner === player1?._id) setWinnerTurn('O');
          else setWinnerTurn('X');
        setIsModal(true);
        const choose = false;
        setFinishedMatch(true);
        if (choose) resetData();
      });
    }
  }, [player1, player2]);

  const handleWin = (winLine: any) => {
    const data = {
      roomId: id,
      winner: player1._id,
      loser: player2._id,
      winLine,
      messages: chats,
      isDraw: false
    };
    Socket.finishGame(data);
  };

  const handleDraw = () => {
    const data = {
      roomId: id,
      winner: player1._id,
      loser: player2._id,
      winLine: [],
      messages: chats,
      isDraw: true
    };
    Socket.finishGame(data);
  };

  const handleClick = async (i: any, j: any) => {
    if (!isStarted) return;
    if (player2 === null || player1 === null) return;
    if (finishedMatch) return;
    const value = xIsNext ? 'X' : 'O';
    if (value !== turn) return;
    if (squares[i][j] !== null) return;
    const newSquares = [...squares];
    if (xIsNext) newSquares[i][j] = 'X';
    else newSquares[i][j] = 'O';

    setXIsNext(!xIsNext);
    setSquares(newSquares);
    const position = { turn, x: i, y: j };
    setTurn(value);
    const playRes: any = await play(value, i, j);
    if (playRes) {
      if (playRes?.isDraw ?? false) {
        handleDraw();
      } else {
        handleWin(playRes);
      }
    }
    console.log('play');
    Socket.play(id, position);
  };

  const resetData = () => {
    setWinning(null);
    setSquares(Array.from({ length: nrows }, () => Array.from({ length: ncols }, () => '')));
  };

  const startTimer = () => {
    setCounter(10);
  };

  const stopTimer = (value: number) => {
    setCounter(value);
  };

  const handleTimeout = () => {
    const data = {
      roomId: id,
      winner: xIsNext ? player1._id : player2._id,
      loser: xIsNext ? player2._id : player1._id,
      winLine: [],
      messages: chats,
      isDraw: false
    };

    stopTimer(-1);
    Socket.finishGame(data);
  };

  useEffect(() => {
    if (isStarted) {
      startTimer();
    }

    if (!isStarted) {
      stopTimer(-1);
    }

    if (counter === 0 && isStarted) {
      if (xIsNext) {
        setFinishedMatch(true);
        handleTimeout();
      }
    }
  }, [counter, isStarted]);

  return (
    <div className="flex flex-col justify-center w-full">
      <div style={{ flex: 0.8 }} className="flex justify-center">
        <Boards winning={winning} squares={squares} numCol={ncols} numRow={nrows} onClick={handleClick} />
      </div>
      <div className="flex flex-row mt-5 items-center justify-center w-full">
        <Button type="primary">Claim draw</Button>
        {counter > 0 ? (
          <Timer counter={counter} setCounter={setCounter} />
        ) : (
          <div className=" text-xl text-bold text-red-500 ml-10">Timeout: 0</div>
        )}
        <div className="text-xl text-bold text-red-500 ml-10" style={{ color: xIsNext ? 'blue' : 'red' }}>
          Turn: {xIsNext ? 'X' : 'O'}
        </div>
      </div>
      <Modal
        visible={isModal}
        cancelButtonProps={{ style: { display: 'none' } }}
        centered
        closable={false}
        onOk={() => setIsModal(false)}
      >
        <div className="mx-5 text-2xl font-bold text-center">Winner: {winnerTurn}</div>
      </Modal>
    </div>
  );
};

export default BoardGame;
