import React from 'react';

interface Props {
  handleSubmit: any;
}

export const QuickPlay = (props: Props) => {
  const { handleSubmit } = props;
  return (
    <div>
      <button
        className="inline-block px-6 py-2 my-2  text-2xl border-dashed border-2 w-56 h-32 border-green-400 font-medium leading-6 text-center text-green-800 uppercase transition rounded shadow ripple hover:shadow-lg hover:bg-green-800 hover:text-white focus:outline-none"
        type="button"
        onClick={handleSubmit}
      >
        Quick Play
      </button>
    </div>
  );
};
