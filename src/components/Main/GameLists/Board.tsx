import { Card } from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';
import tictac from '../../../assets/images/tictactoe.png';
import gamesApi from '../../../api/gameApi';
import Notification from '../../common/Notification';

interface Props {
  item: any;
}
const Board: React.FC<Props> = props => {
  const { item } = props;
  const history = useHistory();
  const TOKEN = localStorage.getItem('access_token');

  const joinGame = async () => {
    const params = { token: TOKEN, gameId: item.gameId };
    try {
      const res: any = await gamesApi.joinGame(params);
      if (res) {
        history.push(`/dashboard/game/${item.gameId}`);
      }
    } catch (err) {
      Notification('error', 'Error', err.message);
    }
  };

  return (
    <Card
      onClick={() => joinGame()}
      title={<div>#{item.gameId}</div>}
      headStyle={{ fontSize: '1.5rem' }}
      hoverable
      style={{ textAlign: 'center' }}
    >
      <div className="w-full">
        <img src={tictac} alt="tictactoe" className="object-contain h-32 w-64" />
      </div>
    </Card>
  );
};

export default Board;
