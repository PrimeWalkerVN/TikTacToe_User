import { Avatar, Button } from 'antd';
import React from 'react';
import PlayerInfo from './PlayerInfo';

const Player2 = (props: any) => {
  const { item, pickPlayer2, user, leaveChairHandler, readyHandler, player2Status } = props;
  const setReady = () => {
    if (user.username === item.username) readyHandler(!player2Status);
  };
  return (
    <div style={{ flex: 0.5 }} className="flex flex-row justify-between items-center">
      <p className="text-4xl text-red-700 text-bold justify-self-start mx-10">0</p>
      <div className="p-5 w-2/3 flex flex-col items-center">
        {item && (
          <div className="flex flex-row justify-between w-full">
            <Button onClick={setReady} type={player2Status ? 'primary' : 'ghost'}>
              Ready
            </Button>
            {user.username === item.username && (
              <Button onClick={leaveChairHandler} type="default">
                Leave
              </Button>
            )}
          </div>
        )}
        <div className="overflow-hidden rounded-lg shadow-lg h-24 flex items-center w-full justify-center">
          {item ? (
            <div className="flex flex-row items-center w-full p-4 justify-end">
              <div className="flex flex-col w-full items-end px-4">
                <div className="truncate ml-2 text-xl font-bold">{item.fullName}</div>
                <PlayerInfo reverse data={item} />
              </div>
              <Avatar size={90} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png " />
            </div>
          ) : (
            <button
              type="button"
              onClick={pickPlayer2}
              className="cursor-pointer text-2xl text-bold text-blue-600 hover:text-blue-800"
            >
              Pick Player2 (X)
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Player2;
