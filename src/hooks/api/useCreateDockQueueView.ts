import { useMutation } from '@tanstack/react-query';
import { api } from '@/utils/api';
import endpoints from '@/constants/endpoints';
import { IViewFormValues } from '@/types/dockQueue';

export interface IDataPayload {
  isCardView: boolean;
  formValues: IViewFormValues;
}

export const sendData = async (dataPayload: IDataPayload) => {
  const { isCardView, formValues } = dataPayload;
  let url = ''; // if id exists, then it's an update
  if (isCardView) {
    url = formValues.id ? endpoints.createCardView : endpoints.updateCardView;
  } else {
    url = formValues.id ? endpoints.createTableView : endpoints.updateTableView;
  }
  return api({
    url,
    method: 'POST',
    body: {
      ...formValues,
    },
  })
    .then(data => data.status)
    .catch(() => {});
};

const useSendData = () => {
  return useMutation(sendData);
};

export default useSendData;
