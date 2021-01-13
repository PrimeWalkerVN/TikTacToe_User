import { Tabs } from 'antd';
import React from 'react';
import Chat from '../Game/Chat/Chat';
import Player1 from '../Game/Players/Player1';
import Player2 from '../Game/Players/Player2';
import BoardGame from './BoardGameHistory/BoardGame';

interface ComponentProps {
  data: any;
}

const HistoryMatch = (props: ComponentProps) => {
  const { data } = props;
  const { TabPane } = Tabs;
  return (
    <div className="flex flex-row p-10 h-screen overflow-auto">
      <div style={{ flex: 0.8 }} className="flex flex-col">
        <div className="flex flex-row">
          <div className="flex flex-col w-full" style={{ flex: 0.2 }}>
            {/* <Matches matches={matches} /> */}
            <div className="text-center text-2xl text-green-400 my-10">Completed!</div>
          </div>
          <div style={{ flex: 0.8 }} className="flex flex-col justify-between">
            <BoardGame player1={data.player1} player2={data.player2} gameData={data.gameData} />
          </div>
        </div>
        <div className="flex flex-row items-center mt-2">
          <div className="flex flex-row justify-between items-center px-10" style={{ flex: 0.8 }}>
            <Player1 item={data.player1} user={data.user} />
            <span>-</span>
            <Player2 item={data.player2} user={data.user} />
          </div>
        </div>
      </div>
      <div style={{ flex: 0.2 }}>
        <Tabs defaultActiveKey="1" centered>
          <TabPane tab="Chat" key="1">
            <Chat />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default HistoryMatch;
