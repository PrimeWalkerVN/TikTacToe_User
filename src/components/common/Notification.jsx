import { notification } from 'antd';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Notification = (type, title, desc) => {
  notification[type]({
    message: title,
    description: desc,
    placement: 'bottomRight'
  });
};

export default Notification;
