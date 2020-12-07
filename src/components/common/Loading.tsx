import React from 'react';

import { Spin, Modal } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 100 }} spin />;

const Loading: React.FC = () => {
  return (
    <Modal
      centered
      confirmLoading
      visible
      width={200}
      closable={false}
      footer={null}
      bodyStyle={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
      wrapClassName="modal-loading"
    >
      <Spin indicator={antIcon} />
    </Modal>
  );
};

export default Loading;
