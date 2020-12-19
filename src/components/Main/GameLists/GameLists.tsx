import { List } from 'antd';
import React from 'react';
import Board from './Board';

interface Props {
  data: any;
  clickDetail: any;
}

const GameLists: React.FC<Props> = props => {
  const { data, clickDetail } = props;

  return (
    <div className="w-full">
      <List
        grid={{ gutter: 16, column: 4 }}
        pagination={{ defaultPageSize: 8 }}
        dataSource={data}
        renderItem={item => {
          return (
            <List.Item>
              <Board item={item} clickDetail={clickDetail} />
            </List.Item>
          );
        }}
      />
    </div>
  );
};
export default GameLists;
