import React from 'react';

interface Props {
  handleSubmit: any;
}

export const AddBoard = (props: Props) => {
  const { handleSubmit } = props;
  return (
    <button
      className="inline-block px-6 py-2 text-2xl border-dashed border-2 w-2/3 h-32 border-blue-500 font-medium leading-6 text-center text-blue-800 uppercase transition rounded shadow ripple hover:shadow-lg hover:bg-blue-800 hover:text-white focus:outline-none"
      type="button"
      onClick={handleSubmit}
    >
      Open new game
    </button>
  );
};
