import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { api } from '@/utils/api';
import endpoints from '@/constants/endpoints';
import { ICardPayload } from '@/types/cards';

export const GET_RELATED_ITEMS = 'GET_RELATED_ITEMS';

export type RelatedItemsPayload = ICardPayload[];

export const getRelatedItems = async () => {
  return api({
    url: endpoints.unitList,
    label: 'Related Items',
  })
    .then((data: RelatedItemsPayload) => data)
    .catch(() => []);
};

const useGetRelatedItems = <T = RelatedItemsPayload>(
  opts?: UseQueryOptions<RelatedItemsPayload, unknown, T, [typeof GET_RELATED_ITEMS]>
) => useQuery([GET_RELATED_ITEMS], getRelatedItems, opts);

export default useGetRelatedItems;
