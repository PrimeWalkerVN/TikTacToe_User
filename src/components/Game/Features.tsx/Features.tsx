import React from 'react';

const Features = () => {
  return (
    <div style={{ flex: 0.2 }} className="flex flex-col justify-between">
      <div className="flex flex-row justify-between mb-2">
        <button
          type="button"
          className=" w-32 h-20 inline-block py-2 text-xl font-bold leading-6 text-center text-white uppercase transition bg-green-700 rounded shadow ripple hover:shadow-lg hover:bg-green-800 focus:outline-none"
        >
          Leave chair
        </button>
        <button
          type="button"
          className="w-32 h-20 inline-block py-2 text-xl font-bold leading-6 text-center text-white uppercase transition bg-gray-500 rounded shadow ripple hover:shadow-lg hover:bg-gray-600 focus:outline-none"
        >
          Surrender
        </button>
      </div>
      <div className="flex flex-row justify-between">
        <button
          type="button"
          className=" w-32 h-20 inline-block py-2 text-xl font-bold leading-6 text-center text-white uppercase transition bg-blue-700 rounded shadow ripple hover:shadow-lg hover:bg-blue-800 focus:outline-none"
        >
          Ready
        </button>
        <button
          type="button"
          className="w-32 h-20 inline-block px-2 py-2 text-xl font-bold leading-6 text-center text-white uppercase transition bg-red-500 rounded shadow ripple hover:shadow-lg hover:bg-red-600 focus:outline-none"
        >
          Leave room
        </button>
      </div>
    </div>
  );
};

export default Features;
