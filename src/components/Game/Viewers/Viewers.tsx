import React from 'react';
import Invite from './Invite';
import Viewer from './Viewer';

const Viewers = (props: any) => {
  const { viewers, user, invite } = props;
  return (
    <div className="flex flex-col items-start px-10">
      {viewers.length > 0 &&
        viewers.map((item: any) => {
          if (item._id !== user._id)
            if (!invite) return <Viewer key={item._id.toString()} username={item.fullName} />;
            else return <Invite key={item._id.toString()} username={item.fullName} />;
          return null;
        })}
      {viewers.length === 1 && viewers[0]._id === user._id && <div> No viewers </div>}
    </div>
  );
};

export default Viewers;
