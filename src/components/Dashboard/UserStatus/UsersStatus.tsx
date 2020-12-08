import React from 'react';
import User from './User';

const UsersStatus: React.FC = () => {
  const users = [
    { id: 1, username: 'thanh', status: 'offline' },
    { id: 2, username: 'thanh2', status: 'offline' }
  ];
  return (
    <div className="border-gray-200">
      {users.map(user => (
        <User key={user.id} username={user.username} status={user.status} />
      ))}
    </div>
  );
};

export default UsersStatus;
