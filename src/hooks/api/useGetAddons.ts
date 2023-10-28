import { api } from '@/utils/api';
import endpoints from '@/constants/endpoints';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { RelatedItemsPayload } from './useGetRelatedItems';

export const GET_ADDONS_ITEMS = 'GET_ADDONS_ITEMS';

export const getAddonsItems = async () => {
  return api({
    url: endpoints.getAddOns,
    method: 'GET',
    label: 'Add Ons',
  })
    .then(data => data)
    .catch(() => []);
};

const useGetAddonsItems = <T = RelatedItemsPayload>(
  opts?: UseQueryOptions<RelatedItemsPayload, unknown, T, [typeof GET_ADDONS_ITEMS]>
) => useQuery([GET_ADDONS_ITEMS], getAddonsItems, opts);

export default useGetAddonsItems;
