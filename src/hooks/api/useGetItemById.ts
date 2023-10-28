import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { api } from '@/utils/api';
import endpoints from '@/constants/endpoints';
import { ICardPayload } from '@/types/cards';

export const GET_ITEM_BY_ID = 'GET_ITEM_BY_ID';

export const getItemById = async (id: string) => {
  return api({
    url: `${endpoints.unit}${id}`,
    label: 'Item',
  })
    .then((data: ICardPayload) => data)
    .catch(() => ({}));
};

const useGetItemById = <T = ICardPayload | undefined>(
  id: string,
  opts?: UseQueryOptions<ICardPayload | Record<string, never>, unknown, T, [typeof GET_ITEM_BY_ID, typeof id]>
) => useQuery([GET_ITEM_BY_ID, id], () => getItemById(id), opts);

export default useGetItemById;
