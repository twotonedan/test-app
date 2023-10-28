import { useMutation } from '@tanstack/react-query';
import { api } from '@/utils/api';
import endpoints from '@/constants/endpoints';

export type IDeleteProps = {
  viewId: string;
  isCardView: boolean;
};
export const sendData = async ({ viewId, isCardView }: IDeleteProps) => {
  return api({
    url: isCardView ? endpoints.deleteCardView : endpoints.deleteTableView,
    method: 'POST',
    body: {
      viewId,
    },
  })
    .then(data => data.status)
    .catch(() => {});
};

const useSendData = () => {
  return useMutation(sendData);
};

export default useSendData;
