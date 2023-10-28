import { IFooterList } from '@/types/footer';
import { api } from '@/utils/api';
import endpoints from '@/constants/endpoints';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export const GET_FOOTER_ITEMS = 'GET_FOOTER_ITEMS';

export type FooterItemsPayload = IFooterList[];

export const getFooterItems = async () => {
  return api({
    url: endpoints.footerItems,
    method: 'GET',
    label: 'Footer Items',
  })
    .then(data => data)
    .catch(() => []);
};

const useGetFooterItems = <T = FooterItemsPayload>(
  opts?: UseQueryOptions<FooterItemsPayload, unknown, T, [typeof GET_FOOTER_ITEMS]>
) => useQuery([GET_FOOTER_ITEMS], getFooterItems, opts);

export default useGetFooterItems;
