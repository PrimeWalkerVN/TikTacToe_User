import { Alert, Button, Form, Input } from 'antd';
import React, { useState } from 'react';
import usersApi from '../../api/userApi';
import Loading from '../common/Loading';
import Notification from '../common/Notification';

type valuesType = {
  email: string;
};
const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string>('');
  const onSubmitHandler = async (values: valuesType) => {
    setIsLoading(true);
    try {
      await usersApi.forgotPassword(values);
      Notification('success', 'Send success!', 'Plase check your email!');
    } catch (err) {
      if (err.response) setErrors(err.response.data.message);
      else setErrors('Something went wrong!');
    }
    setIsLoading(false);
  };

  return (
    <div className="w-full flex flex-col justify-center items-center h-screen">
      {isLoading && <Loading />}
      <div className="container shadow-xl w-1/3 flex flex-col justify-center items-center p-5">
        <div className="text-2xl text-bold m-5 text-center">
          Please provide your email! We'll send you link to reset your password!
        </div>
        <Form onFinish={onSubmitHandler} name="basic" className="flex flex-col" size="large">
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
          {errors && <Alert className="my-5" closable type="error" message="Error" description={errors} />}
          <Form.Item>
            <div className="w-full flex justify-center">
              <Button type="primary" htmlType="submit">
                Send
              </Button>
            </div>
          </Form.Item>

          <button className="hover:text-blue-500 text-bold text-base" type="submit">
            If you do not receive any email! Send again!
          </button>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPassword;
