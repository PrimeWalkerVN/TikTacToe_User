import { Avatar, Button, Comment, Form, Input, List } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Socket from '../../../socket/socket';
import { RootState } from '../../../types/Reducer';

const { TextArea } = Input;

const Chat = (props: any) => {
  const [submitting, setSubmitting] = useState(false);
  const { roomId, chats, setChats } = props;
  const [value, setValue] = useState('');
  let messageEnd: any = useRef(null);
  const user: any = useSelector((state: RootState) => state.user.user);

  const CommentList = ({ comments }: any) => (
    <List
      dataSource={comments}
      header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
      itemLayout="horizontal"
      renderItem={(props: any) => <Comment className="px-2" {...props} />}
    />
  );
  useEffect(() => {
    messageEnd.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start'
    });
  }, [chats]);

  useEffect(() => {
    Socket.subMessageToChat((err: any, data: any) => {
      if (err) return;
      setChats((oldChats: any) => [...oldChats, data.message]);
    });
  }, [roomId]);

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
        datetime: moment().fromNow()
      };
      Socket.sendMessage(roomId, newMessage);
    }, 500);
  };

  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  return (
    <div className="flex flex-col justify-between rounded-lg shadow-lg p-2 chat-panel max-w-sm ">
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
