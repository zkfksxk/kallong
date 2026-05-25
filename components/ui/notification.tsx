import { notifications } from '@mantine/notifications';
import { CheckIcon, CloseIcon, InfoIcon } from '@/shared/common/icons';

type NotificationType = 'info' | 'success' | 'fail';

interface NotificationProps {
  type: NotificationType;
  title: string;
  message: string;
}

const notificationIconMap = {
  info: <InfoIcon color='black' size={24} />,
  success: <CheckIcon color='blue' size={24} />,
  fail: <CloseIcon color='red' size={24} />,
};

export const showNotification = ({
  type,
  title,
  message,
}: NotificationProps) => {
  notifications.show({
    title,
    message,
    icon: notificationIconMap[type],
    withCloseButton: false,
    loading: false,
    color: 'transparent',
  });
};
