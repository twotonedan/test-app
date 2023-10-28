import { useMutation } from '@tanstack/react-query';
import { api } from '@/utils/api';
import endpoints from '@/constants/endpoints';
import { IBooking } from '@/types/dockQueue';

export const updateBooking = async (booking: IBooking) => {
  return api({
    url: endpoints.updateBooking,
    method: 'POST',
    body: {
      ...booking,
    },
  })
    .then(data => data.status)
    .catch(() => {});
};

const useUpdateBooking = () => {
  return useMutation(updateBooking);
};

export default useUpdateBooking;
