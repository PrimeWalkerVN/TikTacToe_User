import React from 'react';

const Features = (props: any) => {
  const { isStarted, leaveRoomHandler, finishedMatch, startNewGame } = props;
  return (
    <div style={{ flex: 0.2 }} className="flex flex-col items-center">
      {!isStarted && finishedMatch && (
        <button
          type="button"
          onClick={startNewGame}
          className="w-32 h-20 my-2 inline-block px-2 py-2 text-xl font-bold leading-6 text-center text-white uppercase transition bg-blue-500 rounded shadow ripple hover:shadow-lg hover:bg-blue-600 focus:outline-none"
        >
          New Game
        </button>
      )}
      <div className="flex flex-row justify-around">
        {isStarted && (
          <div>
            <button
              type="button"
              className="w-32 h-20 inline-block py-2 text-xl font-bold leading-6 text-center text-white uppercase transition bg-gray-500 rounded shadow ripple hover:shadow-lg hover:bg-gray-600 focus:outline-none"
            >
              Surrender
            </button>
          </div>
        )}
        <button
          type="button"
          onClick={leaveRoomHandler}
          className="w-32 h-20 inline-block px-2 py-2 text-xl font-bold leading-6 text-center text-white uppercase transition bg-red-500 rounded shadow ripple hover:shadow-lg hover:bg-red-600 focus:outline-none"
        >
          Leave room
        </button>
      </div>
    </div>
  );
};

export default Features;
