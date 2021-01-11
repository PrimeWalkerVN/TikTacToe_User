import React from 'react';

const Matches = (props: any) => {
  const { matches } = props;
  return (
    <div className="flex flex-col rounded-lg shadow-lg p-2 history-panel ">
      {matches && matches.map((item: any, index: any) => <div className="m-2 bg-gray-200 p-2">Match {index + 1}</div>)}
    </div>
  );
};

export default Matches;
