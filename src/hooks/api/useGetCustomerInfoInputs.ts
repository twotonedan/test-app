import { ICustomerInfoInputsPayload } from '@/mock/CUSTOMER_INFO_INPUTS';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { api } from '@/utils/api';
import endpoints from '@/constants/endpoints';

export const GET_CUSTOMER_INFO_INPUTS = 'GET_CUSTOMER_INFO_INPUTS';

export const getCustomerInfoInputs = async () => {
  return api({
    url: endpoints.customerInfoInputs,
    label: 'Customer Info Inputs',
  })
    .then((data: ICustomerInfoInputsPayload[]) => data)
    .catch(() => []);
};

const useGetCustomerInfoInputs = <T = ICustomerInfoInputsPayload[]>(
  opts?: UseQueryOptions<ICustomerInfoInputsPayload[], unknown, T, [typeof GET_CUSTOMER_INFO_INPUTS]>
) => useQuery([GET_CUSTOMER_INFO_INPUTS], getCustomerInfoInputs, opts);

export default useGetCustomerInfoInputs;
