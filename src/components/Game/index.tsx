import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Socket from '../../socket/socket';
import BoardGame from './BoardGame/BoardGame';
import Chat from './Chat/Chat';
import Guest from './Players/Guest';
import Host from './Players/Host';

const Game: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [host, setHost] = useState(null);
  const [guest, setGuest] = useState(null);
  useEffect(() => {
    Socket.subGuestJoined((err: any, data: any) => {
      if (err) return;
      setHost(data.host);
      setGuest(data.guest);
    });
  }, []);
  useEffect(() => {
    Socket.joinGame(id);
  }, [id]);

  return (
    <div className="flex flex-col p-10">
      <div className="flex flex-row">
        <div style={{ flex: 0.8 }} className="flex flex-col justify-between">
          <BoardGame host={host} guest={guest} />
          <div className="flex flex-row items-center my-10">
            <div style={{ flex: 0.2 }} className="flex flex-row justify-between">
              <button
                type="button"
                className=" w-32 h-24 inline-block px-6 py-2 text-2xl font-bold leading-6 text-center text-white uppercase transition bg-blue-700 rounded shadow ripple hover:shadow-lg hover:bg-blue-800 focus:outline-none"
              >
                Start
              </button>
              <button
                type="button"
                className="w-32 h-24 inline-block px-6 py-2 text-2xl font-bold leading-6 text-center text-white uppercase transition bg-red-500 rounded shadow ripple hover:shadow-lg hover:bg-red-600 focus:outline-none"
              >
                Leave
              </button>
            </div>
            <div className="flex flex-row justify-between items-center px-10" style={{ flex: 0.8 }}>
              <Host item={host} />
              <span>-</span>
              <Guest item={guest} />
            </div>
          </div>
        </div>
        <div style={{ flex: 0.2 }}>
          <Chat roomId={id} />
        </div>
      </div>
    </div>
  );
};

export default Game;
