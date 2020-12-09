import Avatar from 'antd/lib/avatar/avatar';
import React from 'react';

interface Props {
  username: string;
  avatar?: string;
  status: string;
}
const User: React.FC<Props> = props => {
  const { username, avatar = 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png', status } = props;
  return (
    <div className="flex flex-row items-center justify-between w-40 m-2">
      <Avatar src={avatar} />
      <div className="truncate ml-2">{username}</div>
      <div style={{ backgroundColor: status === 'online' ? 'green' : 'red' }} className="rounded-full w-3 h-3 ml-2" />
    </div>
  );
};

export default User;
