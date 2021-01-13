import React from 'react';
import Socket from '../../../socket/socket';
import Invite from './Invite';
import Viewer from './Viewer';

const Invites = (props: any) => {
  const { users, user, handleInvite } = props;
  return (
    <div className="flex flex-col items-start px-10">
      {users.length > 0 &&
        users.map((item: any) => {
          if (item._id !== user._id)
            return <Invite handleInvite={handleInvite} key={item._id.toString()} item={item} />;
          return null;
        })}
      {users.length === 1 && users[0]._id === user._id && <div> No users online </div>}
    </div>
  );
};

export default Invites;
