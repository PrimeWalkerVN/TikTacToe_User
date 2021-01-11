import { Form, Input, Modal } from 'antd';
import React, { useState } from 'react';

interface Props {
  handleSubmit: any;
}

export const AddBoard = (props: Props) => {
  const { handleSubmit } = props;
  const [isModal, setIsModal] = useState(false);

  const formItemLayout = {
    labelCol: {
      span: 6
    }
  };
  const handleFinish = (values: any) => {
    handleSubmit(values);
    setIsModal(false);
  };
  return (
    <div>
      <button
        className="inline-block px-6 py-2 text-2xl border-dashed border-2 w-56 h-32 border-blue-500 font-medium leading-6 text-center text-blue-800 uppercase transition rounded shadow ripple hover:shadow-lg hover:bg-blue-800 hover:text-white focus:outline-none"
        type="button"
        onClick={() => setIsModal(true)}
      >
        Open new room
      </button>
      <Modal
        visible={isModal}
        okButtonProps={{ form: 'form', htmlType: 'submit' }}
        centered
        closable={false}
        onCancel={() => setIsModal(false)}
      >
        <div className="mx-5">
          <Form
            id="form"
            name="basic"
            onFinish={handleFinish}
            {...formItemLayout}
            className="flex flex-col"
            size="large"
          >
            <Form.Item
              name="name"
              label="Name board"
              rules={[
                {
                  required: true,
                  message: 'Please input your board name'
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input.Password />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
};
