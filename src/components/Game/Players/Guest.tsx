import { Avatar } from 'antd';
import React from 'react';

const Guest = () => {
  return (
    <div className="">
      <div className="flex flex-row items-center justify-end">
        <p className="text-4xl text-red-700 text-bold justify-self-start">0</p>
        <Avatar size={100} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        <div className="truncate ml-2 text-2xl font-bold">PrimeWalker</div>
      </div>
    </div>
  );
};

export default Guest;
