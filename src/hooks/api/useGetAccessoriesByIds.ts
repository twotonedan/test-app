import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { api } from '@/utils/api';
import { IAccessory } from '@/types/accessories';
import endpoints from '@/constants/endpoints';

export const GET_ACCESSORIES_BY_IDS = 'GET_ACCESSORIES_BY_IDS';

export const getAccessoriesByIds = async (ids: string[]) => {
  return api({
    url: endpoints.accessories,
    method: 'POST',
    body: {
      ids,
    },
    label: 'Accessories',
  })
    .then((data: IAccessory[]) => data.filter((accessoryItem: IAccessory) => ids.includes(accessoryItem.id)))
    .catch(() => []);
};

const useGetAccessoriesByIds = <T = IAccessory[]>(
  ids: string[],
  opts?: UseQueryOptions<IAccessory[], unknown, T, [typeof GET_ACCESSORIES_BY_IDS, typeof ids]>
) => useQuery([GET_ACCESSORIES_BY_IDS, ids], () => getAccessoriesByIds(ids), opts);

export default useGetAccessoriesByIds;
