import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Tabs } from 'antd';
import { useSelector } from 'react-redux';
import Socket from '../../socket/socket';
import BoardGame from './BoardGame/BoardGame';
import Chat from './Chat/Chat';
import Player2 from './Players/Player2';
import Player1 from './Players/Player1';
import Viewers from './Viewers/Viewers';
import Features from './Features.tsx/Features';
import { RootState } from '../../types/Reducer';
import roomApi from '../../api/roomApi';

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

  const { TabPane } = Tabs;
  const user: any = useSelector((state: RootState) => state.user.user);
  const usersOnline: any = useSelector((state: RootState) => state.room.usersOnline);
  const [player1, setPlayer1] = useState<any>(null);
  const [player2, setPlayer2] = useState<any>(null);
  const [player1Status, setPlayer1Status] = useState(false);
  const [player2Status, setPlayer2Status] = useState(false);
  const [isPlayer, setIsPlayer] = useState(false);
  const [matches, setMatches] = useState([]);
  const [isStarted, setIsStarted] = useState(false);
  const [viewers, setViewers] = useState([]);

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
  }, []);

  useEffect(() => {
    Socket.joinRoom(id);
    if (props.location.state) {
      const { roomData } = props.location.state;
      const { roomInfo, matches } = roomData;
      if (matches) setMatches(matches);
      if (roomInfo.player1) {
        setPlayer1(roomInfo.player1);
        setPlayer1Status(roomInfo.player1Status);
        checkPlayer(roomInfo.player1.username);
      }

      if (roomInfo.player2) {
        setPlayer2(roomInfo.player2);
        setPlayer1Status(roomInfo.player2Status);
        checkPlayer(roomInfo.player2.username);
      }
    }

    return () => {
      setIsPlayer(false);
      Socket.readyTrigger(id, false);
      Socket.leaveChair(id);
      Socket.leaveRoom(id);
    };
  }, [id]);

  const checkPlayer = (username: any) => {
    if (username === user.username) setIsPlayer(true);
  };

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
    if (isPlayer) {
      Socket.readyTrigger(id, status);
    }
  };

  const leaveChair = () => {
    Socket.readyTrigger(id, false);
    if (isPlayer) {
      Socket.leaveChair(id);
      setIsPlayer(false);
    }
  };

  const leaveRoomHandler = () => {
    if (isPlayer) {
      Socket.leaveChair(id);
      setIsPlayer(false);
      setIsStarted(false);

      // leave room khi dang choi
      // check => isPlayer 1 || 2 => xu thua
    }
    Socket.leaveRoom(id);
    history.push('/dashboard');
  };

  // user when user leave room => user do' thua
  const handleFinish = (winLine: any) => {
    if (isPlayer) {
      const loser: any = player1?.username ?? user?.username === null ? player1?._id : player2?._id;
      const winner: any = player1?.username ?? user?.username === null ? player1?._id : player2?._id;
      const data = {
        roomId: id,
        winner,
        loser,
        winLine,
        messages: chats,
        isDraw: false
      };
      Socket.finishGame(data);
    }
  };

  // xu thua luc tat tab, quay lai => cho thua

  return (
    <div className="flex flex-row p-10">
      <div style={{ flex: 0.8 }} className="flex flex-col">
        <div className="flex flex-row">
          <div
            style={{ flex: 0.2 }}
            className="flex flex-col justify-between rounded-lg shadow-lg p-2 history-panel max-w-sm "
          >
            {matches && matches.map((item: any) => <div>Match : {item._id}</div>)}
          </div>
          <div style={{ flex: 0.8 }} className="flex flex-col justify-between">
            <BoardGame player1={player1} player2={player2} isStarted={isStarted} chats={chats} />
          </div>
        </div>
        <div className="flex flex-row items-center mt-2">
          <Features isStarted={isStarted} leaveRoomHandler={leaveRoomHandler} />
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
            <Viewers viewers={usersOnline} user={user} />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default Game;
