import { Button, Modal, Text } from '@mantine/core';

interface CustomModalProps {
  opened: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  onCancel?: () => void;
  onSubmit?: () => void;
  submitLabel?: string;
  cancelLabel?: string;
  loading?: boolean;
}

export const CustomModal = ({
  opened,
  onClose,
  title,
  description,
  onSubmit,
  onCancel,
  submitLabel = '확인',
  cancelLabel = '취소',
  loading = false,
}: CustomModalProps) => {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      withCloseButton={false}
      centered
      radius='md'
      padding='xl'
      styles={{
        inner: {
          left: '50%',
          transform: 'translateX(-50%)',
        },
      }}
    >
      <Text fw={700} size='lg' ta='center'>
        {title}
      </Text>
      {description && (
        <Text size='sm' ta='center'>
          {description}
        </Text>
      )}
      <div className='w-full flex flex-row flex-1 gap-5 mt-5'>
        <Button
          variant='filled'
          fullWidth
          onClick={() => {
            onClose();
            if (onCancel) onCancel();
          }}
        >
          {cancelLabel}
        </Button>
        <Button variant='filled' fullWidth onClick={onSubmit} loading={loading}>
          {submitLabel}
        </Button>
      </div>
    </Modal>
  );
};
