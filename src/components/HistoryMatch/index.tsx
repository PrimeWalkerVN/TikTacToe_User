import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import usersApi from '../../api/userApi';
import { RootState } from '../../types/Reducer';
import Loading from '../common/Loading';
import Notification from '../common/Notification';
import BoardGame from './BoardGameHistory/BoardGame';
import Chat from './ChatHistory/Chat';
import Player1 from './PlayersHistory/Player1';
import Player2 from './PlayersHistory/Player2';

const HistoryMatch = (props: any) => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [player1, setPlayer1] = useState<any>({});
  const [player2, setPlayer2] = useState<any>({});
  const { location } = props;
  const user: any = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    if (location.state) {
      setData(location.state.item);
    }
  }, [location]);

  useEffect(() => {
    if (data) {
      const getData = async () => {
        setIsLoading(true);
        try {
          const res1 = await usersApi.getUser({ userId: data.winner });
          const res2 = await usersApi.getUser({ userId: data.loser });
          if (data.winnerTurn) {
            if (data.winnerTurn === 'O') {
              setPlayer1(res1.body);
              setPlayer2(res2.body);
            } else {
              setPlayer1(res2.body);
              setPlayer2(res1.body);
            }
          }
        } catch (err) {
          Notification('error', 'Error', "Can't get detail!");
        } finally {
          setIsLoading(false);
        }
      };
      getData();
    }
  }, [data]);

  return (
    <div className="flex flex-row p-10 h-screen overflow-auto">
      {isLoading && <Loading />}
      <div style={{ flex: 0.8 }} className="flex flex-col">
        <div>
          <BoardGame gameData={data?.history} winLine={data?.winLine} />
        </div>
        <div className="flex flex-row justify-between items-center px-10" style={{ flex: 0.8 }}>
          <Player1 item={player1} winner={data?.winner} loser={data?.loser} user={user} />
          <span>-</span>
          <Player2 item={player2} winner={data?.winner} loser={data?.loser} user={user} />
        </div>
      </div>
      <div style={{ flex: 0.2 }} className="flex flex-col">
        <div className="text-xl font-bold">Chat History:</div>
        <Chat data={data?.messages} />
      </div>
    </div>
  );
};

export default HistoryMatch;
