import { useMutation } from '@tanstack/react-query';
import { api } from '@/utils/api';
import endpoints from '@/constants/endpoints';
import { IListFilter } from '@/types/dockQueue';

export const sendData = async (filterConfig: IListFilter) => {
  const listName = 'listName';
  return api({
    url: endpoints.joinWaitlist,
    method: 'POST',
    body: {
      listName,
      filterConfig,
    },
  })
    .then(data => data.status)
    .catch(() => {});
};

const useSendData = () => {
  return useMutation(sendData);
};

export default useSendData;
