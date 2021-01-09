import { Avatar } from 'antd';
import React from 'react';

const Viewer = (props: any) => {
  const { user } = props;
  return (
    <div className="flex flex-row items-center justify-center">
      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" size="large" />
      <div className="truncate ml-2">{user.username}</div>
    </div>
  );
};

export default Viewer;
