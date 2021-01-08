import { Alert, Button, Form, Input } from 'antd';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import usersApi from '../../api/userApi';
import Loading from '../common/Loading';
import Notification from '../common/Notification';

const Register: React.FC = () => {
  const [errors, setErrors] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const history = useHistory();
  const onSubmitHandler = async (params: any) => {
    setIsLoading(true);
    delete params.confirm;
    try {
      const res: any = await usersApi.register(params);
      history.push('/login');
      Notification('success', 'Register success, please check your email to active your account', res.message);
    } catch (err) {
      if (err.response) setErrors(err.response.data.message.toString());
      else setErrors(err);
    }
    setIsLoading(false);
  };
  const formItemLayout = {
    labelCol: {
      span: 10
    }
  };
  return (
    <div className="w-full flex justify-center items-center h-screen bg-gray-100">
      {isLoading && <Loading />}
      <div className="w-1/4 box-border shadow-2xl px-6 flex flex-col items-center bg-white">
        <span className="text-4xl font-bold py-10">REGISTER</span>
        <Form onFinish={onSubmitHandler} name="basic" className="flex flex-col" {...formItemLayout} size="large">
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!'
              },
              {
                min: 6,
                message: 'username must be at least 6 characters long'
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Full-name"
            name="fullName"
            rules={[
              {
                required: true,
                message: 'Please input your Full-name!'
              }
            ]}
          >
            <Input />
          </Form.Item>
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
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!'
              }
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!'
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('The two passwords that you entered do not match!');
                }
              })
            ]}
          >
            <Input.Password />
          </Form.Item>
          {errors && <Alert className="my-5" closable type="error" message="Error" description={errors} />}
          <Form.Item className="self-center pt-10 w-full">
            <Button className="w-full" type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
        <Link className="pb-5 font-bold " to="/login">
          Already have account?
        </Link>
      </div>
    </div>
  );
};

export default Register;
