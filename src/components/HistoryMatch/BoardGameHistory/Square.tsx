import React from 'react';

interface Props {
  value: any;
  onClick: any;
  isWinning: any;
}

const Square: React.FC<Props> = props => {
  const { value, onClick, isWinning } = props;
  return (
    <button
      type="button"
      className={`border-2 border-black w-8 h-8 font-bold text-2xl square ${value === 'X' ? 'isX' : 'isO'} ${
        isWinning && 'winning'
      }`}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default Square;
