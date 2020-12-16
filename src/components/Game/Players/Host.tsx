import { Avatar } from 'antd';
import React from 'react';

const Host = () => {
  return (
    <div className="">
      <div className="flex flex-row items-center flex-start">
        <div className="truncate ml-2 text-2xl font-bold">PrimeWalker</div>
        <Avatar size={100} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        <p className="text-bold ustify-self-end text-4xl text-red-700">0</p>
      </div>
    </div>
  );
};

export default Host;
