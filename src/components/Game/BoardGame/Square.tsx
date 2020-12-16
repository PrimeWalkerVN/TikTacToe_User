import React from 'react';

interface Props {
  value: any;
  onClick: any;
}

const Square: React.FC<Props> = props => {
  const { value, onClick } = props;
  return (
    <button
      type="button"
      className={`border-2 border-black w-10 h-10 font-bold text-2xl square ${value === 'X' ? 'isX' : 'isO'}`}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default Square;
