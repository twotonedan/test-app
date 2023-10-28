import { IBookingInformation } from '@/validationSchemas/bookingInformationSchema/bookingInformationSchema';
import { useMutation } from '@tanstack/react-query';
import { api } from '@/utils/api';
import endpoints from '@/constants/endpoints';

export interface IDataPayload {
  bookingInformation: Partial<IBookingInformation>;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export const sendData = async (dataPayload: IDataPayload) => {
  return api({
    url: endpoints.joinWaitlist,
    method: 'POST',
    body: {
      ...dataPayload,
    },
    label: 'Join Waitlist',
  })
    .then(data => data.status)
    .catch(() => {});
};

const useSendData = () => {
  return useMutation(sendData);
};

export default useSendData;
