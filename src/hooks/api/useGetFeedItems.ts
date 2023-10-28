import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { api } from '@/utils/api';
import endpoints from '@/constants/endpoints';
import { ICardPayload } from '@/types/cards';
import { FeedFilters } from '@/validationSchemas/feedFiltersSchema/feedFiltersSchema';

export const GET_FEED_ITEMS = 'GET_FEED_ITEMS';

type Params = {
  isMultiDay?: boolean;
  filters?: FeedFilters;
};

export const getFeedItems = async ({ isMultiDay, filters }: Params) => {
  return api({
    url: endpoints.items,
    method: 'POST',
    body: {
      filters,
    },
    label: 'Feed Items',
  })
    .then(data => data?.filter((card: ICardPayload) => (isMultiDay ? card.dateRange : card.date)))
    .catch(() => []);
};

const useGetFeedItems = <T = ICardPayload[]>(
  filters: Params,
  opts?: UseQueryOptions<ICardPayload[], unknown, T, [typeof GET_FEED_ITEMS, typeof filters]>
) => useQuery([GET_FEED_ITEMS, filters], () => getFeedItems(filters), opts);

export default useGetFeedItems;
