import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import React, { useState } from 'react';

interface Props {
  handleQuick: any;
  handleRemoveQuick: any;
}
const antIcon = <LoadingOutlined style={{ fontSize: 60 }} spin />;
export const QuickPlay = (props: Props) => {
  const { handleQuick, handleRemoveQuick } = props;
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    if (loading === false) handleQuick();
    else {
      handleRemoveQuick();
      setLoading(false);
    }
  };
  return (
    <div>
      <button
        className="inline-block px-6 py-2 my-2  text-2xl border-dashed border-2 w-56 h-32 border-green-400 font-medium leading-6 text-center text-green-800 uppercase transition rounded shadow ripple hover:shadow-lg hover:bg-green-800 hover:text-white focus:outline-none"
        type="button"
        onClick={handleClick}
      >
        {loading ? <Spin indicator={antIcon} /> : ' Quick Play'}
      </button>
    </div>
  );
};
