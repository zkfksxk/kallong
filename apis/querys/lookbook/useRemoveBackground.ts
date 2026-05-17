import { useMutation } from '@tanstack/react-query';
import { axiosObj } from '@/apis/AxiosObj';
import queryKeys from '@/apis/queryKeys';

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
    mutationKey: queryKeys.removeBackground.all,
    mutationFn: removeBackground,
  });
};
