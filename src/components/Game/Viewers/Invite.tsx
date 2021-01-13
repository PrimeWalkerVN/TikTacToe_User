import { Avatar } from 'antd';
import React from 'react';

const Invite = (props: any) => {
  const { item, handleInvite } = props;
  return (
    <div className="flex flex-row items-center justify-between w-full">
      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" size="large" />
      <div className="truncate ml-2">{item.fullName}</div>
      <button
        onClick={() => handleInvite(item)}
        type="submit"
        className="p-2 px-3 mx-5 bg-blue-500 hover:bg-blue-800 text-white"
      >
        Invite
      </button>
    </div>
  );
};

export default Invite;
