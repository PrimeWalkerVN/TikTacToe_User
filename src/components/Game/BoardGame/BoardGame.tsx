/* eslint-disable react-hooks/exhaustive-deps */
import { Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Socket from '../../../socket/socket';
import { RootState } from '../../../types/Reducer';
import { newGame, play } from '../../../utils/gameUtil/GameHelper2';
import Boards from './Boards';
import Timer from './Timer';

interface ComponentProps {
  player1: any;
  player2: any;
  updatePlayer: any;
  isStarted: any;
  chats: any;
  currentBoard: any;
  finishedMatch: any;
  setFinishedMatch: any;
  isClearBoard: boolean;
  setIsClearBoard: any;
}

const BoardGame = (props: ComponentProps) => {
  const {
    player1,
    player2,
    updatePlayer,
    isStarted,
    chats,
    finishedMatch,
    setFinishedMatch,
    currentBoard = [],
    isClearBoard,
    setIsClearBoard
  } = props;
  const nrows: any = 20;
  const ncols: any = 20;

  const [counter, setCounter] = useState(-1);
  const [winning, setWinning] = useState(null);
  const [turn, setTurn] = useState('O');
  const [squares, setSquares] = useState(
    Array(nrows)
      .fill(0)
      .map(() => new Array(ncols).fill(null))
  );
  const [currentPos, setCurrentPos] = useState<any>(null);
  const [isModal, setIsModal] = useState(false);
  const [winnerTurn, setWinnerTurn] = useState<any>('');

  const { id } = useParams<{ id: string }>();
  const user: any = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    // setGameData(currentBoard);

    if (currentBoard.length > 0) {
      const newSquares = Array(nrows)
        .fill(0)
        .map(() => new Array(ncols).fill(null));
      currentBoard.forEach((value: any) => {
        newSquares[value.x][value.y] = value.turn;
      });
      setSquares(newSquares);
      setTurn(currentBoard[currentBoard.length - 1].turn === 'X' ? 'O' : 'X');
      setCurrentPos({ x: currentBoard[currentBoard.length - 1].x, y: currentBoard[currentBoard.length - 1].y });
    }
  }, [currentBoard]);

  useEffect(() => {
    newGame([], 'O', true, false);
    resetData();
  }, []);

  useEffect(() => {
    if (isClearBoard) {
      newGame([], 'X', true, false);
      setIsClearBoard(false);
      resetData();
    }
  }, [isClearBoard, setIsClearBoard]);

  useEffect(() => {
    Socket.subNewPlay((err: any, data: any) => {
      if (err) return;
      const { x, y, turn } = data.position;
      if (squares[x][y] !== null) return;
      const newSquares = [...squares];
      newSquares[x][y] = turn;
      setTurn(turn === 'O' ? 'X' : 'O');
      setCurrentPos({ x, y });
      setSquares(newSquares);
      stopTimer(-1);
      startTimer();
    });
  }, [squares]);

  useEffect(() => {
    // if (player1 && player2) {
    Socket.subGameFinished((err: any, data: any) => {
      if (err) return;

      // thong bao winner hoac hoa` .....

      if (player1 || player2) {
        if (data.winner === player1?._id) setWinnerTurn('O');
      } else setWinnerTurn('X');
      setIsModal(true);
      setFinishedMatch(true);
      setWinning(data?.winLine ?? null);
      updatePlayer(data.winner, data.loser);
    });
    // }
  }, [player1, player2, setFinishedMatch, updatePlayer]);

  const handleWin = (winLine: any) => {
    const data = {
      roomId: id,
      winner: user._id,
      loser: user._id === player1._id ? player2._id : player1._id,
      winLine,
      winnerTurn: turn,
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
    if (user._id === player1._id && turn === 'X') return;
    if (user._id === player2._id && turn === 'O') return;

    if (squares[i][j] !== null) return;
    const position = { turn, x: i, y: j };
    Socket.play(id, position);
    const playRes: any = await play(turn, i, j);
    if (playRes) {
      if (playRes?.isDraw ?? false) {
        handleDraw();
      } else {
        handleWin(playRes);
      }
    }
  };

  const resetData = () => {
    setWinning(null);
    setSquares(
      Array(nrows)
        .fill(0)
        .map(() => new Array(ncols).fill(null))
    );
    setCurrentPos(null);
  };

  const startTimer = () => {
    setCounter(59);
  };

  const stopTimer = (value: number) => {
    setCounter(value);
  };

  const handleTimeout = () => {
    let winner: string;
    const loser: string = user._id;
    if (loser === player1._id) {
      winner = player2._id;
    } else {
      winner = player1._id;
    }
    if (winner !== loser) {
      const data = {
        roomId: id,
        winner,
        loser,
        winnerTurn: turn === 'O' ? 'X' : 'O',
        winLine: [],
        messages: chats,
        isDraw: false
      };
      Socket.finishGame(data);
    }

    stopTimer(-1);
  };

  useEffect(() => {
    if (isStarted) {
      startTimer();
    }

    if (!isStarted) {
      stopTimer(-1);
    }

    if (counter === 0 && isStarted) {
      // if (turn === 'X') {
      setFinishedMatch(true);
      handleTimeout();
      // }
    }
  }, [counter, isStarted]);

  return (
    <div className="flex flex-col justify-center w-full">
      <div style={{ flex: 0.8 }} className="flex justify-center">
        <Boards
          winning={winning}
          squares={squares}
          numCol={ncols}
          numRow={nrows}
          currentPos={currentPos}
          onClick={handleClick}
        />
      </div>
      <div className="flex flex-row mt-5 items-center justify-center w-full">
        {counter > 0 ? (
          <Timer counter={counter} setCounter={setCounter} />
        ) : (
          <div className=" text-xl text-bold text-yellow-500 ml-10">Timeout: 0</div>
        )}
        <div className="text-xl text-bold text-red-500 ml-10" style={{ color: turn === 'X' ? 'blue' : 'red' }}>
          Turn: {turn === 'X' ? 'X' : 'O'}
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
