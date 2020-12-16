import { Avatar } from 'antd';
import React from 'react';

const Guest = (props: any) => {
  const { item } = props;
  return (
    <div style={{ flex: 0.5 }} className="flex flex-row justify-between items-center">
      <p className="text-4xl text-red-700 text-bold justify-self-start mx-10">0</p>
      <div className=" overflow-hidden rounded-lg shadow-lg p-5 w-2/3">
        {item && (
          <div className="flex flex-row items-center justify-center">
            <Avatar size={100} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            <div className="truncate ml-2 text-2xl font-bold">{item.fullName}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Guest;
