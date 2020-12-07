import { Dropdown, Menu } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import React from 'react';

interface Props {
  name: string;
  username: string;
  logoutHandler(): void;
  profileHandler(): void;
  redirectHomeHandler(): void;
}
const Header: React.FC<Props> = props => {
  const { name, username, logoutHandler, profileHandler, redirectHomeHandler } = props;
  const menu = (
    <Menu>
      <Menu.Item onClick={profileHandler}>Profile</Menu.Item>
      <Menu.Item onClick={logoutHandler}>Logout</Menu.Item>
    </Menu>
  );

  return (
    <header className="flex justify-between items-center bg-blue-600 py-4 px-10">
      <div onClick={redirectHomeHandler} className="text-white text-2xl font-serif cursor-pointer">
        {name}
      </div>
      <Dropdown className="cursor-pointer" overlay={menu} placement="bottomCenter">
        <div className="flex items-center">
          <span className="text-xl font-bold text-white mr-4">{username}</span>
          <Avatar size="default">ABC</Avatar>
        </div>
      </Dropdown>
    </header>
  );
};

export default Header;
