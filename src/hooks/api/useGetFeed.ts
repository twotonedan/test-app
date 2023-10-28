import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { api } from '@/utils/api';
import endpoints from '@/constants/endpoints';
import { IFeedPayload } from '@/types/feed';

export const GET_FEED = 'GET_FEED';

export const getFeed = async () => {
  return api({
    url: endpoints.feedData,
    method: 'GET',
    label: 'Feed',
  })
    .then(data => data)
    .catch(() => ({}));
};

const useGetFeed = <T = IFeedPayload>(
  opts?: UseQueryOptions<IFeedPayload | Record<string, never>, unknown, T, [typeof GET_FEED]>
) => useQuery([GET_FEED], getFeed, opts);

export default useGetFeed;
