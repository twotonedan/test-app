import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { api } from '@/utils/api';
import { IViews } from '@/mock/DOCK_QUEUE';
import endpoints from '@/constants/endpoints';

export const GET_WATER_QUEUE_VIEWS = 'GET_WATER_QUEUE_VIEWS';
export const getWaterQueueViews = async () => {
  return api({
    url: endpoints.waterQueueViews,
    label: 'Water Queue Views',
  })
    .then(data => data)
    .catch(() => []);
};

const useGetWaterQueueViews = <T = IViews>(
  opts?: UseQueryOptions<IViews, unknown, T, [typeof GET_WATER_QUEUE_VIEWS]>
) => useQuery([GET_WATER_QUEUE_VIEWS], getWaterQueueViews, opts);

export default useGetWaterQueueViews;
