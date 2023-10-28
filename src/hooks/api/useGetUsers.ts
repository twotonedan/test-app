import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { api } from '@/utils/api';
import endpoints from '@/constants/endpoints';
import { IUser } from '@/mock/USERS_LIST';

export const GET_USERS = 'GET_USERS';

export const getUsers = async () => {
  return api({
    url: endpoints.users,
    method: 'GET',
    label: 'Get Users',
  })
    .then(data => data)
    .catch(() => []);
};

const useGetUsers = <T = IUser[]>(opts?: UseQueryOptions<IUser[], unknown, T, [typeof GET_USERS]>) =>
  useQuery([GET_USERS], getUsers, opts);

export default useGetUsers;
