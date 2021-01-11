import React from 'react';
import User from './User';

interface Props {
  users: any;
  user: any;
}
const UsersStatus: React.FC<Props> = props => {
  const { users, user } = props;

  return (
    <div className="flex flex-col shadow-lg p-5">
      {users.length > 0 &&
        users.map((item: any) => {
          if (item._id !== user._id)
            return <User key={item._id.toString()} username={item.fullName} status={item.status} />;
          return null;
        })}

      {users.length === 1 && users[0]._id === user._id && <div> No user online </div>}
    </div>
  );
};

export default UsersStatus;
