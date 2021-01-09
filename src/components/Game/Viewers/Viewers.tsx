import React from 'react';
import Viewer from './Viewer';

const Viewers = () => {
  const users = [
    {
      username: 1
    },
    {
      username: 2
    }
  ];
  return (
    <div>
      {users.map((item: any) => (
        <Viewer user={item} />
      ))}
    </div>
  );
};

export default Viewers;
