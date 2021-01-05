import { Alert, Button, Form, Input } from 'antd';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import usersApi from '../../api/userApi';
import Loading from '../common/Loading';
import Notification from '../common/Notification';

type valueTypes = {
  password: string;
  confirm: string;
};
const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const token = query.get('token');
  const [errors, setErrors] = useState<string>('');

  const onSubmitHandler = async (values: valueTypes) => {
    if (!token) return;
    setIsLoading(true);
    try {
      await usersApi.resetPassword({ token, password: values.password });
      Notification('success', 'Update success!', 'Please try login again!');
    } catch (err) {
      if (err.response) setErrors(err.response.data.message);
      else setErrors('Something went wrong!');
    }
    setIsLoading(false);
  };

  const formItemLayout = {
    labelCol: {
      span: 10
    }
  };
  return (
    <div className="w-full flex flex-col justify-center items-center h-screen">
      {isLoading && <Loading />}
      <div className="container shadow-xl w-1/3 flex flex-col justify-center items-center p-5">
        <div className="text-2xl text-bold m-5 text-center">Reset password</div>
        <Form onFinish={onSubmitHandler} name="basic" className="flex flex-col" size="large" {...formItemLayout}>
          <Form.Item
            label="New Password"
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
          <Form.Item>
            <div className="w-full flex justify-center">
              <Button type="primary" className="w-1/2" htmlType="submit">
                Confirm
              </Button>
            </div>
          </Form.Item>
          <Link className="pb-5 font-bold underline flex justify-center" to="/login">
            If you want to login? Click here
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;
