import { Button, Form, Input, Modal } from 'antd';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Loading from '../common/Loading';

const ActiveEmail = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const status = query.get('status') || 'expired';
  console.log(status);
  const username = query.get('username');
  const [isLoading, setIsLoading] = useState(false);
  const [isModal, setIsModal] = useState(false);

  const sendAgain = (values: any) => {
    console.log('send again');
    console.log(values);
    setIsModal(false);
  };
  return (
    <div className="w-full flex flex-col justify-center items-center h-screen">
      {isLoading && <Loading />}
      <div className="container h-64 shadow-xl w-1/3 flex flex-col justify-center items-center">
        <div className="text-3xl text-bold">Hi {username}, Welcome to Tic tac toe game!</div>
        {status === 'success' ? (
          <div className="text-green-400 text-lg text-bold">Your email is now active!</div>
        ) : (
          <div className="flex items-center justify-between p-5">
            <div className="text-red-400 text-lg text-bold px-10">Your active link is expired!</div>
            <button
              type="button"
              onClick={() => setIsModal(true)}
              className="inline-block px-2 text-xs font-medium leading-6 text-center text-blue-700 uppercase transition bg-transparent border-2 border-blue-700 rounded-full ripple hover:bg-blue-100 focus:outline-none"
            >
              Send again!
            </button>
          </div>
        )}
        <Link className="pb-5 font-bold underline" to="/login">
          Go to login
        </Link>
      </div>
      <Modal
        visible={isModal}
        okButtonProps={{ form: 'form', htmlType: 'submit' }}
        centered
        closable={false}
        onCancel={() => setIsModal(false)}
      >
        <div className="mx-5">
          <Form id="form" name="basic" onFinish={sendAgain} className="flex flex-col" size="large">
            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!'
                },
                {
                  required: true,
                  message: 'Please input your E-mail!'
                }
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default ActiveEmail;
