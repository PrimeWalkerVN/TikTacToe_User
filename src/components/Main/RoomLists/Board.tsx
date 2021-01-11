import { LockOutlined, UnlockOutlined } from '@ant-design/icons';
import { Card, Form, Input, Modal } from 'antd';
import React, { useState } from 'react';
import tictac from '../../../assets/images/tictactoe.png';

const { Meta } = Card;
interface Props {
  item: any;
  clickDetail: any;
}
const Board: React.FC<Props> = props => {
  const { item, clickDetail } = props;
  const [isModal, setIsModal] = useState(false);
  const onClickDetail = () => {
    if (item.status === 'playing') return;
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
            <div className="text-base text-red-600">#{item.roomId}</div>
            <div className="truncate mx-2 text-base">{item.name}</div>
            {item.password ? <LockOutlined /> : <UnlockOutlined />}
          </div>
        }
        headStyle={{ fontSize: '1.5rem' }}
        hoverable
        style={{ textAlign: 'center' }}
      >
        <img src={tictac} alt="tictactoe" className="object-contain h-full w-full" />
        <Meta className="pt-2" description={item.status.charAt(0).toUpperCase() + item.status.slice(1)} />
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
