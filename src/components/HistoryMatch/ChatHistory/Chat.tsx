import { Comment, List } from 'antd';
import React from 'react';

const Chat = (props: any) => {
  const { data = [] } = props;
  const CommentList = ({ comments }: any) => (
    <List
      dataSource={comments}
      header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
      itemLayout="horizontal"
      renderItem={(props: any) => <Comment className="px-2" {...props} />}
    />
  );
  return (
    <div className="py-2 overflow-y-scroll h-2/3">
      {data.length > 0 ? <CommentList comments={data} /> : <div className="text-center">No Info </div>}
    </div>
  );
};

export default Chat;
