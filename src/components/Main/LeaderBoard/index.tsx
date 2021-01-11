import React from 'react';
import PlayerRank from './PlayerRank';

const LeaderBoard = (props: any) => {
  const { data } = props;
  return (
    <div className="flex flex-col my-5">
      <div className="text-2xl text-bold text-center mb-5 text-purple-700">LEADER BOARD</div>
      <div className="flex flex-col">
        {data &&
          data.map((item: any, index: any) => (
            <PlayerRank rank={index + 1} key={index.toString()} username={item.username} />
          ))}
      </div>
    </div>
  );
};

export default LeaderBoard;
