import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { api } from '@/utils/api';
import endpoints from '@/constants/endpoints';
import { ICompanyPayload } from '@/types/company';
import COMPANY_DATA from '@/mock/COMPANY_DATA';

export const GET_COMPANY = 'GET_COMPANY';

export const getCompany = async () => {
  return api({
    url: endpoints.initialState,
    label: 'Company',
  })
    .then(() => {
      return COMPANY_DATA;
    })
    .catch(() => ({}));
};

const useGetCompany = <T = ICompanyPayload>(
  opts?: UseQueryOptions<ICompanyPayload | Record<string, never>, unknown, T, [typeof GET_COMPANY]>
) => useQuery([GET_COMPANY], getCompany, opts);

export default useGetCompany;
