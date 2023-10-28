import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { api } from '@/utils/api';
import endpoints from '@/constants/endpoints';

export const GET_USER_CREDITS = 'GET_USER_CREDITS';

export const getUserCredits = async () => {
  return api({
    url: endpoints.user,
    method: 'GET',
    label: 'User',
  })
    .then(data => data.credits)
    .catch(() => 0);
};

const useGetUserCredits = <T = number>(opts?: UseQueryOptions<number, unknown, T, [typeof GET_USER_CREDITS]>) =>
  useQuery([GET_USER_CREDITS], getUserCredits, opts);

export default useGetUserCredits;
