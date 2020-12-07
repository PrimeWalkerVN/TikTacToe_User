import Title from 'antd/lib/typography/Title';
import * as React from 'react';
import UsersStatus from './UsersStatus';

const Dashboard: React.FC = () => {
  return (
    <div>
      <Title>Dashboard</Title>
      <UsersStatus />
    </div>
  );
};

export default Dashboard;
