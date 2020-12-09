import React from 'react';
import User from './User';

interface Props {
  users: any;
  user: any;
}
const UsersStatus: React.FC<Props> = props => {
  const { users, user } = props;

  return (
    <div className="flex flex-col">
      {users.length > 0 &&
        users.map((item: any) => {
          if (item._id !== user._id) return <User key={item.id} username={item.fullName} status={item.status} />;
          return null;
        })}
    </div>
  );
};

export default UsersStatus;
