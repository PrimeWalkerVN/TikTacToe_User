import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs } from 'antd';
import Socket from '../../socket/socket';
import BoardGame from './BoardGame/BoardGame';
import Chat from './Chat/Chat';
import Player2 from './Players/Player2';
import Player1 from './Players/Player1';
import Viewers from './Viewers/Viewers';
import Features from './Features.tsx/Features';

const Game: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { TabPane } = Tabs;
  const [player1, setPlayer1] = useState(null);
  const [player2, setPlayer2] = useState(null);
  const [viewers, setViewers] = useState([]);

  useEffect(() => {
    Socket.subViewerTrigger((err: any, data: any) => {
      if (err) return;
      setViewers(data);
      console.log(data);
    });
    Socket.subPlayerPickChair((err: any, data: any) => {
      if (err) return;

      console.log(data);
    });
  }, []);
  useEffect(() => {
    Socket.joinRoom(id);
    return () => {
      Socket.leaveRoom(id);
    };
  }, [id]);

  const pickPlayer1 = () => {
    console.log('pick player1');
    Socket.pickPlayer(id, true);
  };

  return (
    <div className="flex flex-row p-10">
      <div style={{ flex: 0.8 }} className="flex flex-col">
        <div className="flex flex-row">
          <div
            style={{ flex: 0.2 }}
            className="flex flex-col justify-between rounded-lg shadow-lg p-2 history-panel max-w-sm "
          >
            History
          </div>
          <div style={{ flex: 0.8 }} className="flex flex-col justify-between">
            <BoardGame host={player1} guest={player2} />
          </div>
        </div>
        <div className="flex flex-row items-center my-10">
          <Features />
          <div className="flex flex-row justify-between items-center px-10" style={{ flex: 0.8 }}>
            <Player1 item={player1} pickPlayer1={pickPlayer1} />
            <span>-</span>
            <Player2 item={player2} />
          </div>
        </div>
      </div>
      <div style={{ flex: 0.2 }}>
        <Tabs defaultActiveKey="1" centered>
          <TabPane tab="Chat" key="1">
            <Chat roomId={id} />
          </TabPane>
          <TabPane tab="Viewers" key="2">
            <Viewers />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default Game;
