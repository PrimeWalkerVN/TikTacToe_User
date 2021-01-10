import React from 'react';
import CupIcon from '../../../assets/images/players/icons8-world_cup.png';
import WinIcon from '../../../assets/images/players/icons8-win.png';
import LoseIcon from '../../../assets/images/players/icons8-squinting_face_with_tongue.png';

const PlayerInfo = (props: any) => {
  const { reverse, data } = props;
  return (
    <div className="flex w-full justify-around" style={{ flexDirection: reverse ? 'row-reverse' : 'row' }}>
      <div className="flex flex-row items-center">
        <img className="h-6 w-6" src={CupIcon} alt="Logo" />
        <div className="mx-1 text-base">{data.cup}</div>
      </div>
      <div className="flex flex-rowm items-center">
        <img className="h-6 w-6" src={WinIcon} alt="Logo" />
        <div className="mx-1 text-base">{data.win}</div>
      </div>
      <div className="flex flex-row items-center">
        <img className="h-6 w-6" src={LoseIcon} alt="Logo" />
        <div className="mx-1 text-base">{data.lose}</div>
      </div>
    </div>
  );
};

export default PlayerInfo;
