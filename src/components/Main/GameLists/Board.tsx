import { Card } from 'antd';
import React from 'react';
import tictac from '../../../assets/images/tictactoe.png';

interface Props {
  item: any;
}
const Board: React.FC<Props> = props => {
  const { item } = props;
  return (
    <Card
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
