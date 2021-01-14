import React from 'react';
import { useHistory } from 'react-router-dom';
import PlayerRank from './PlayerRank';

const LeaderBoard = (props: any) => {
  const { data } = props;
  const history = useHistory();
  const handleDetail = (item: any) => {
    if (item) {
      history.push('/dashboard/profile', { user: item });
    }
  };
  return (
    <div className="flex flex-col my-5">
      <div className="text-2xl text-bold text-center mb-5 text-purple-700">LEADER BOARD</div>
      <div className="flex flex-col">
        {data &&
          data.map((item: any, index: any) => (
            <PlayerRank
              handleDetail={() => handleDetail(item)}
              rank={index + 1}
              key={index.toString()}
              username={item.fullName}
            />
          ))}
      </div>
    </div>
  );
};

export default LeaderBoard;
