import { Avatar, Button, Comment, Form, Input, List } from 'antd';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import { RootState } from '../../../types/Reducer';
import Socket from '../../../socket/socket';

const { TextArea } = Input;
interface ChatType {
  author: string;
  avatar: string;
  content: any;
  datetime: any;
}
const Chat = () => {
  const [chats, setChats] = useState<ChatType[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const { id } = useParams<{ id: string }>();
  const [value, setValue] = useState('');
  let messageEnd: any = useRef(null);
  const socket: any = Socket.getInstance();
  const user: any = useSelector((state: RootState) => state.user.user);
  const TOKEN = localStorage.getItem('access_token');

  const CommentList = ({ comments }: any) => (
    <List
      dataSource={comments}
      header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
      itemLayout="horizontal"
      renderItem={(props: any) => <Comment className="px-2" {...props} />}
    />
  );
  useEffect(() => {
    socket.emit('joinGame', { token: TOKEN, gameId: id });

    messageEnd.scrollIntoView({ behavior: 'smooth' });
  }, [chats, socket]);

  socket.on('newMessage', (data: any) => {
    setChats([...chats, data.message]);
  });

  const handleSubmit = () => {
    if (!value) {
      return;
    }

    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setValue('');
      const newMessage = {
        author: user.fullName,
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        content: value,
        datetime: 'Now'
      };
      socket.emit('sendMessage', { gameId: id, newMessage });
    }, 1000);
  };

  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  return (
    <div className="flex flex-col justify-between rounded-lg shadow-lg p-2 chat-panel max-w-sm ">
      <div className="text-lg font-bold">Chat:</div>
      <div className="py-2 overflow-y-scroll h-1/2">
        {chats.length > 0 ? <CommentList comments={chats} /> : <div className="text-center">No Info </div>}
        <div
          ref={node => {
            messageEnd = node;
          }}
        />
      </div>
      <div className="flex flex-row w-full mt-5">
        <div className="p-1">
          <Avatar size="large" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        </div>
        <Form className="w-full">
          <Form.Item>
            <TextArea rows={4} onChange={handleChange} value={value} />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={handleSubmit} type="primary">
              Send
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Chat;
