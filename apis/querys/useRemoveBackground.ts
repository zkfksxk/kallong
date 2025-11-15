import { useMutation } from '@tanstack/react-query';
import { axiosObj } from '../AxiosObj';
import queryKeys from '../queryKeys';

export const removeBackground = async (imageFile: File) => {
  const formData = new FormData();
  formData.append('image', imageFile);

  const response = await axiosObj.post('/api/remove-bg', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const useRemoveBackground = () => {
  return useMutation({
    mutationKey: [queryKeys.REMOVE_BACKGROUND],
    mutationFn: removeBackground,
    onError: (error) => {
      console.error('배경 제거 실패:', error);
      alert('배경 제거 중 오류가 발생했습니다.');
    },
  });
};
