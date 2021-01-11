import { Avatar, Button } from 'antd';
import React from 'react';
import usersApi from '../../../api/userApi';
import PlayerInfo from './PlayerInfo';

const Player1 = (props: any) => {
  const { item, pickPlayer1, user, leaveChairHandler, readyHandler, player1Status } = props;

  const setReady = () => {
    if (user.username === item.username) readyHandler(!player1Status);
  };
  return (
    <div style={{ flex: 0.5 }} className="flex flex-row justify-between items-center">
      <div className="p-5 w-2/3 flex flex-col items-center">
        {item && (
          <div className="flex flex-row justify-between w-full">
            <Button onClick={setReady} type={player1Status ? 'primary' : 'ghost'}>
              {player1Status ? 'READY!' : 'Ready'}
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
            <div className="flex flex-row items-center w-full p-4">
              <Avatar size={90} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png " />
              <div className="flex flex-col w-full">
                {item.username === user.username ? (
                  <div className="truncate text-blue-600 ml-2 text-xl font-bold">{item.fullName}</div>
                ) : (
                  <div className="truncate ml-2 text-xl font-bold">{item.fullName}</div>
                )}
                <PlayerInfo data={item} />
              </div>
              <div className="text-xl font-bold text-red-500">(O)</div>
            </div>
          ) : (
            <button
              type="button"
              onClick={pickPlayer1}
              className="cursor-pointer text-2xl text-bold text-red-600 hover:text-red-700"
            >
              Pick Player1 (O)
            </button>
          )}
        </div>
      </div>
      <p className="text-4xl text-red-700 text-bold justify-self-start mx-10">0</p>
    </div>
  );
};

export default Player1;
