import { LockOutlined, UnlockOutlined } from '@ant-design/icons';
import { Card, Form, Input, Modal } from 'antd';
import React, { useState } from 'react';
import tictac from '../../../assets/images/tictactoe.png';

interface Props {
  item: any;
  clickDetail: any;
}
const Board: React.FC<Props> = props => {
  const { item, clickDetail } = props;
  const [isModal, setIsModal] = useState(false);
  const onClickDetail = () => {
    if (item.password) {
      setIsModal(true);
    } else clickDetail(item);
  };

  const handleSubmit = (values: any) => {
    if (values.password) {
      clickDetail(item, values.password);
    }
    setIsModal(false);
  };

  return (
    <div>
      <Card
        onClick={onClickDetail}
        title={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <div className="flex justify-between items-center">
            <div>#{item.gameId}</div>
            <div>{item.name}</div>
            {item.password ? <LockOutlined /> : <UnlockOutlined />}
          </div>
        }
        headStyle={{ fontSize: '1.5rem' }}
        hoverable
        style={{ textAlign: 'center' }}
      >
        <div className="w-full">
          <img src={tictac} alt="tictactoe" className="object-contain h-32 w-64" />
        </div>
      </Card>
      <Modal
        visible={isModal}
        okButtonProps={{ form: 'form', htmlType: 'submit' }}
        centered
        closable={false}
        onCancel={() => setIsModal(false)}
      >
        <div className="mx-5">
          <Form id="form" name="basic" onFinish={handleSubmit} className="flex flex-col" size="large">
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input game password!'
                }
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default Board;
