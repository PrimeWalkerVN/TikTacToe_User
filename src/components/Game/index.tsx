/* eslint-disable react-hooks/exhaustive-deps */
import { Tabs } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useBeforeunload } from 'react-beforeunload';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Socket from '../../socket/socket';
import { RootState } from '../../types/Reducer';
import Notification from '../common/Notification';
import BoardGame from './BoardGame/BoardGame';
import Chat from './Chat/Chat';
import Features from './Features.tsx/Features';
import Matches from './Matches/Matches';
import Player1 from './Players/Player1';
import Player2 from './Players/Player2';
import Invites from './Viewers/Invites';
import Viewers from './Viewers/Viewers';

interface ChatType {
  author: string;
  avatar: string;
  content: any;
  datetime: any;
}

const Game: React.FC = (props: any) => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [chats, setChats] = useState<ChatType[]>([]);
  const { location } = props;

  const { TabPane } = Tabs;
  const user: any = useSelector((state: RootState) => state.user.user);
  const usersOnline: any = useSelector((state: RootState) => state.room.usersOnline);
  const [player1, setPlayer1] = useState<any>(null);
  const [player2, setPlayer2] = useState<any>(null);
  const [player1Status, setPlayer1Status] = useState(false);
  const [player2Status, setPlayer2Status] = useState(false);
  const [isPlayer, setIsPlayer] = useState(false);
  const [matches, setMatches] = useState<any>([]);
  const [isStarted, setIsStarted] = useState(false);
  const [viewers, setViewers] = useState([]);
  const [currentMatch, setCurrentMatch] = useState(null);
  const [currentBoard, setCurrentBoard] = useState([]);
  const [finishedMatch, setFinishedMatch] = useState(false);
  const [isClearBoard, setIsClearBoard] = useState(false);
  const [locationKeys, setLocationKeys] = useState<any>([]);

  const checkPlayer = useCallback(
    (username: any) => {
      if (username === user.username) setIsPlayer(true);
    },
    [user]
  );
  useEffect(() => {
    Socket.subViewerTrigger((err: any, data: any) => {
      if (err) return;
      setViewers(data);
    });
    Socket.subPlayerPickChair((err: any, data: any) => {
      if (err) return;
      if (data.player1) {
        setPlayer1(data.player1);
        checkPlayer(data.player1.username);
      } else setPlayer1(null);
      if (data.player2) {
        setPlayer2(data.player2);
        checkPlayer(data.player2.username);
      } else setPlayer2(null);
    });
    Socket.subPlayerStatusChange((err: any, data: any) => {
      if (err) return;
      setPlayer1Status(data.player1Status);
      setPlayer2Status(data.player2Status);
      if (data.player1Status && data.player2Status) setIsStarted(true);
      else setIsStarted(false);
    });
    Socket.subNewMatch((err: any, data: any) => {
      if (err) return;
      if (data.roomInfo) {
        setCurrentMatch(data.roomInfo.currentMatch);
        setMatches((old: any) => [...old, { _id: data.roomInfo.currentMatch }]);
        setIsClearBoard(true);
      }
    });
  }, [checkPlayer]);

  useEffect(() => {
    resetGame();
  }, [currentMatch]);

  useEffect(() => {
    Socket.joinRoom(id);
    if (location) {
      const { roomData } = location.state;
      if (roomData) {
        const { roomInfo, matches } = roomData;
        if (matches) setMatches(matches);
        if (roomInfo.currentMatch) setCurrentMatch(roomInfo.currentMatch);
        if (roomInfo.currentBoard) setCurrentBoard(roomInfo.currentBoard);
        if (roomInfo.player1) {
          setPlayer1(roomInfo.player1);
          setPlayer1Status(roomInfo.player1Status);
          checkPlayer(roomInfo.player1.username);
        }

        if (roomInfo.player2) {
          setPlayer2(roomInfo.player2);
          setPlayer2Status(roomInfo.player2Status);
          checkPlayer(roomInfo.player2.username);
        }
      }
    }
    // return () => {
    //   setIsPlayer(false);
    //   Socket.readyTrigger(id, false);
    //   Socket.leaveChair(id);
    //   Socket.leaveRoom(id);
    //   if (isStarted) handleLose([]);
    // };
  }, [checkPlayer, id, location]);

  useBeforeunload(async () => {
    if (isPlayer) {
      // leave room khi dang choi
      // check => isPlayer 1 || 2 => xu thua
      setIsPlayer(false);
      if (isStarted) await handleLose([]);
      await Socket.leaveChair(id);
      // setIsStarted(false);
    }
    await Socket.leaveRoom(id);
  });

  useEffect(() => {
    return history.listen(async (location: any) => {
      if (history.action === 'PUSH') {
        setLocationKeys([location.key]);
        if (isPlayer) {
          // leave room khi dang choi
          // check => isPlayer 1 || 2 => xu thua

          Socket.leaveChair(id);
          setIsPlayer(false);
          if (isStarted) handleLose([]);
          // setIsStarted(false);
        }
        await Socket.leaveRoom(id);
      }
      if (history.action === 'POP') {
        if (locationKeys[1] === location.key) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          setLocationKeys(([_, ...keys]: any) => keys);

          // Handle forward event
        } else {
          setLocationKeys((keys: any) => [location.key, ...keys]);
          if (isPlayer) {
            // leave room khi dang choi
            // check => isPlayer 1 || 2 => xu thua
            Socket.readyTrigger(id, false);
            Socket.leaveChair(id);
            setIsPlayer(false);
            if (isStarted) handleLose([]);

            // setIsStarted(false);
          }
          await Socket.leaveRoom(id);
          // Handle back event
        }
      }
    });
  }, [history, id, isPlayer, isStarted, locationKeys]);

  const pickPlayer1 = () => {
    if (isPlayer) return;
    if (player1) return;
    Socket.pickPlayer(id, true);
  };
  const pickPlayer2 = () => {
    if (isPlayer) return;
    if (player2) return;
    Socket.pickPlayer(id, false);
  };

  const setReadyPlayer = (status: any) => {
    if (isStarted) {
      Notification('error', 'Please finish this game!');
      return;
    }
    if (isPlayer) {
      if (finishedMatch) {
        Notification('error', 'Please start new game!');
        return;
      }
      Socket.readyTrigger(id, status);
    }
  };

  const leaveChair = () => {
    if (isStarted) {
      Notification('error', 'Please finish this game!');
      return;
    }
    Socket.readyTrigger(id, false);
    if (isPlayer) {
      Socket.leaveChair(id);
      setIsPlayer(false);
    }
  };

  const leaveRoomHandler = () => {
    if (isStarted) {
      Notification('error', 'Please finish this game!');
      return;
    }
    if (isPlayer) {
      // leave room khi dang choi
      // check => isPlayer 1 || 2 => xu thua
      Socket.leaveChair(id);
      setIsPlayer(false);
      if (isStarted) handleLose([]);

      // setIsStarted(false);
    }
    Socket.leaveRoom(id);
    history.push('/dashboard');
  };

  // when user leave room => user do' thua
  const handleLose = (winLine: any) => {
    if (isPlayer) {
      // const loser: any = player1?._id === user?._id ? player1?._id : player2?._id;
      // const winner: any = player1?._id === loser?._id ? player2?._id : player1?._id;
      // const loser: any = user._id;
      // const winner: any = player1.username === loser.username ? player2._id : player1._id; // loi logic?
      let winner: string;
      const loser: string = user._id;
      if (loser === player1?._id) {
        winner = player2?._id;
      } else {
        winner = player1?._id;
      }
      if (winner !== loser) {
        const data = {
          roomId: id,
          winner,
          loser,
          winnerTurn: player1._id === winner ? 'O' : 'X',
          winLine,
          messages: chats,
          isDraw: false
        };
        Socket.finishGame(data);
      }
    }
  };

  const surrenderHandler = () => {
    handleLose([]);
  };

  const startNewGame = () => {
    if (!isPlayer) {
      Notification('error', 'Please pick player to start new game!');
      return;
    }
    Socket.startNewMatch(id);
  };
  const resetGame = () => {
    setFinishedMatch(false);
    // setCurrentBoard([]);
  };

  // xu thua luc tat tab, quay lai => cho thua

  const filterUsersInvite = (viewers: any, usersOnline: any) => {
    const res: any = usersOnline.filter((item: any) => {
      let duplicate = false;
      viewers.forEach((element: any) => {
        if (element._id === item._id) {
          duplicate = true;
          return true;
        }
        return false;
      });
      return !duplicate;
    });

    return res;
  };

  const handleInvite = (item: any) => {
    if (id) {
      Socket.inviteUser(id, user, item._id);
    }
  };

  const updatePlayer = useCallback(
    (winner: any, loser: any) => {
      let newPlayer1;
      let newPlayer2;
      if (player1?._id === winner) {
        newPlayer1 = { ...player1, cup: player1?.cup + 1, win: player1?.win + 1 };
        if (player2?._id === loser) {
          newPlayer2 = { ...player2, cup: player2?.cup - 1, lose: player2?.lose + 1 };
        }
      } else {
        newPlayer2 = { ...player2, cup: player2?.cup + 1, win: player2?.win + 1 };
        if (player1?._id === loser) {
          newPlayer1 = { ...player1, cup: player1?.cup - 1, lose: player1?.lose + 1 };
        }
      }

      if (newPlayer1) setPlayer1(newPlayer1);
      if (newPlayer2) setPlayer2(newPlayer2);
    },
    [player1, player2, setPlayer1, setPlayer2]
  );

  return (
    <div className="flex flex-row p-10 h-screen overflow-auto">
      <div style={{ flex: 0.8 }} className="flex flex-col">
        <div className="flex flex-row">
          <div className="flex flex-col w-full" style={{ flex: 0.2 }}>
            <Matches matches={matches} />
            {isStarted && <div className="text-center text-2xl text-green-400 my-10">Started!</div>}
          </div>
          <div style={{ flex: 0.8 }} className="flex flex-col justify-between">
            <BoardGame
              player1={player1}
              player2={player2}
              updatePlayer={updatePlayer}
              isStarted={isStarted}
              chats={chats}
              currentBoard={currentBoard}
              finishedMatch={finishedMatch}
              setFinishedMatch={setFinishedMatch}
              isClearBoard={isClearBoard}
              setIsClearBoard={setIsClearBoard}
            />
          </div>
        </div>
        <div className="flex flex-row items-center mt-2">
          <Features
            startNewGame={startNewGame}
            isStarted={isStarted}
            leaveRoomHandler={leaveRoomHandler}
            surrenderHandler={surrenderHandler}
            finishedMatch={finishedMatch}
          />
          <div className="flex flex-row justify-between items-center px-10" style={{ flex: 0.8 }}>
            <Player1
              item={player1}
              readyHandler={setReadyPlayer}
              pickPlayer1={pickPlayer1}
              user={user}
              leaveChairHandler={leaveChair}
              player1Status={player1Status}
            />
            <span>-</span>
            <Player2
              item={player2}
              user={user}
              leaveChairHandler={leaveChair}
              readyHandler={setReadyPlayer}
              pickPlayer2={pickPlayer2}
              player2Status={player2Status}
            />
          </div>
        </div>
      </div>
      <div style={{ flex: 0.2 }}>
        <Tabs defaultActiveKey="1" centered>
          <TabPane tab="Chat" key="1">
            <Chat roomId={id} chats={chats} setChats={setChats} />
          </TabPane>
          <TabPane tab="Viewers" key="2">
            <Viewers viewers={viewers} user={user} />
          </TabPane>
          <TabPane tab="Invite" key="3">
            <Invites users={filterUsersInvite(viewers, usersOnline)} user={user} handleInvite={handleInvite} />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default Game;
