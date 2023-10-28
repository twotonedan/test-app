import { RoutesPayload } from '@/mock/ROUTES';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { api } from '@/utils/api';
import endpoints from '@/constants/endpoints';

export const GET_ROUTES = 'GET_ROUTES';

export const getRoutes = async () => {
  return api({
    url: endpoints.routes,
    method: 'GET',
    label: 'Feed',
  })
    .then(data => data)
    .catch(() => ({}));
};

const useGetRoutes = <T = RoutesPayload>(opts?: UseQueryOptions<RoutesPayload, unknown, T, [typeof GET_ROUTES]>) =>
  useQuery([GET_ROUTES], getRoutes, opts);

export default useGetRoutes;
