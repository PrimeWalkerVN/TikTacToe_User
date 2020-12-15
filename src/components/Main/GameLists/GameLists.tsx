import { List } from 'antd';
import React from 'react';
import Board from './Board';

interface Props {
  data: any;
}

const GameLists: React.FC<Props> = props => {
  const { data } = props;
  return (
    <div className="w-full">
      <List
        grid={{ gutter: 16, column: 4 }}
        pagination={{ defaultPageSize: 8 }}
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <Board item={item} />
          </List.Item>
        )}
      />
    </div>
  );
};
export default GameLists;
