import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { api } from '@/utils/api';
import { IViews } from '@/mock/DOCK_QUEUE';
import endpoints from '@/constants/endpoints';

export const GET_DOCK_QUEUE_VIEWS = 'GET_DOCK_QUEUE_VIEWS';
export const getDockQueueViews = async () => {
  return api({
    url: endpoints.dockQueueViews,
    label: 'Dock Queue Views',
  })
    .then(data => data)
    .catch(() => []);
};

const useGetDockQueueViews = <T = IViews>(opts?: UseQueryOptions<IViews, unknown, T, [typeof GET_DOCK_QUEUE_VIEWS]>) =>
  useQuery([GET_DOCK_QUEUE_VIEWS], getDockQueueViews, opts);

export default useGetDockQueueViews;
