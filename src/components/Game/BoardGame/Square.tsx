import React from 'react';

interface Props {
  value: any;
}

const Square: React.FC<Props> = props => {
  const { value } = props;
  return (
    <button type="button" className="border-2 border-black w-10 h-10 square">
      {value}
    </button>
  );
};

export default Square;
