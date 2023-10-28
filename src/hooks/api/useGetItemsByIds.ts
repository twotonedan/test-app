import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { api } from '@/utils/api';
import endpoints from '@/constants/endpoints';
import { ICardPayload } from '@/types/cards';

export const GET_ITEMS_BY_IDS = 'GET_ITEMS_BY_IDS';

export const getItemsByIds = async (ids: string[]) => {
  return api({
    url: endpoints.items,
    method: 'POST',
    body: {
      ids,
    },
    label: 'Items',
  })
    .then((data: ICardPayload[]) => data)
    .catch(() => []);
};

const useGetItemsByIds = <T = ICardPayload[] | undefined>(
  ids: string[],
  opts?: UseQueryOptions<ICardPayload[], unknown, T, [typeof GET_ITEMS_BY_IDS, typeof ids]>
) => useQuery([GET_ITEMS_BY_IDS, ids], () => getItemsByIds(ids), opts);

export default useGetItemsByIds;
