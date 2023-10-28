import { UseMutationOptions, useMutation, useQueryClient } from '@tanstack/react-query';
import { IUserPayload } from '@/mock/USER_DATA';
import { api } from '@/utils/api';
import endpoints from '@/constants/endpoints';
import { GET_USER_DATA } from './useGetUserData';

export interface IDataPayload {
  password: string;
}

export const createAccount = async (dataPayload: IDataPayload) => {
  return api({
    url: endpoints.createAccount,
    method: 'POST',
    label: 'Create Account',
    body: dataPayload,
  })
    .then(data => data)
    .catch(() => ({}));
};

const useCreateAccount = (options?: UseMutationOptions<IUserPayload, unknown, IDataPayload>) => {
  const queryClient = useQueryClient();
  return useMutation(createAccount, {
    ...options,
    onSuccess(...params) {
      queryClient.invalidateQueries([GET_USER_DATA]);
      options?.onSuccess?.(...params);
    },
  });
};

export default useCreateAccount;
