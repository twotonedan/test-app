import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { api } from '@/utils/api';
import { AccessoriesPayload } from '@/mock/ACCESSORIES_ITEMS';
import endpoints from '@/constants/endpoints';

export const GET_ACCESSORIES = 'GET_ACCESSORIES';

export const getAccessories = async () => {
  return api({
    url: endpoints.accessories,
    method: 'POST',
    label: 'Accessories',
  })
    .then(data => data)
    .catch(() => []);
};

const useGetAccessories = <T = AccessoriesPayload>(
  opts?: UseQueryOptions<AccessoriesPayload, unknown, T, [typeof GET_ACCESSORIES]>
) => useQuery([GET_ACCESSORIES], getAccessories, opts);

export default useGetAccessories;
