import React, { useEffect, useState } from 'react';

const Timer = (props: any) => {
  const { counter, setCounter } = props;
  const [count, setCount] = useState(counter);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev: any) => {
        if (prev === 1) setCounter(0);
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <div className=" text-xl text-bold text-red-500 ml-10">Timeout: {count}</div>;
};

export default Timer;
