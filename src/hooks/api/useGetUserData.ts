import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { IUserPayload } from '@/mock/USER_DATA';
import { api } from '@/utils/api';
import endpoints from '@/constants/endpoints';

export const GET_USER_DATA = 'GET_USER_DATA';

export const getUserData = async () => {
  return api({
    url: endpoints.user,
    method: 'GET',
    label: 'User',
  })
    .then(data => data)
    .catch(() => ({}));
};

const useGetUserData = <T = IUserPayload>(opts?: UseQueryOptions<IUserPayload, unknown, T, [typeof GET_USER_DATA]>) =>
  useQuery([GET_USER_DATA], getUserData, opts);

export default useGetUserData;
