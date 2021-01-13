import { Avatar, Button } from 'antd';
import React from 'react';
import PlayerInfo from './PlayerInfo';

const Player2 = (props: any) => {
  const { item, user } = props;

  return (
    <div style={{ flex: 0.5 }} className="flex flex-row justify-between items-center">
      <p className="text-4xl text-red-700 text-bold justify-self-start mx-10">0</p>
      <div className="p-5 w-2/3 flex flex-col items-center">
        <div className="overflow-hidden rounded-lg shadow-lg h-24 flex items-center w-full justify-center">
          {item ? (
            <div className="flex flex-row items-center w-full p-4 justify-end">
              <div className="text-xl font-bold text-blue-600">(X)</div>
              <div className="flex flex-col w-full items-end px-4">
                {item.username === user.username ? (
                  <div className="truncate text-blue-600 ml-2 text-xl font-bold">{item.fullName}</div>
                ) : (
                  <div className="truncate ml-2 text-xl font-bold">{item.fullName}</div>
                )}
                <PlayerInfo reverse data={item} />
              </div>
              <Avatar size={90} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png " />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Player2;
