import React from 'react';

const renderRank = (rank: any) => {
  if (rank === 1) return <div className="text-xl font-bold mx-5 text-red-600 ">#{rank}.</div>;
  if (rank === 2) return <div className="text-xl font-bold mx-5 text-yellow-500">#{rank}.</div>;
  if (rank === 3) return <div className="text-xl font-bold mx-5 text-blue-500">#{rank}.</div>;
  return <div className="text-xl font-bold mx-5 ">#{rank}.</div>;
};
const PlayerRank = (props: any) => {
  const { rank, username, handleDetail } = props;
  return (
    <div onClick={handleDetail} className="flex flex-row bg-gray-100 my-2 py-1 hover:bg-gray-200 cursor-pointer">
      {renderRank(rank)}
      <div className="text-xl text-center w-44 text-bold truncate">{username}</div>
    </div>
  );
};

export default PlayerRank;
