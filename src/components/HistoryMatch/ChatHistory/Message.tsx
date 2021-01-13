import { Avatar } from 'antd';
import React from 'react';

const Message = () => {
  return (
    <div className="flex flex-row items-center">
      <div className="p-2 self-start" style={{ border: 'orange' }}>
        <Avatar size="large" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
      </div>
      <div className="flex flex-col">
        <div className="text-lg font-bold">Name</div>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque in molestias, rerum voluptates quas quos
          recusandae consectetur totam numquam asperiores, dolore cupiditate! Quo iure omnis modi quae explicabo odit
          amet.
        </div>
      </div>
    </div>
  );
};

export default Message;
