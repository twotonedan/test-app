import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { api } from '@/utils/api';
import endpoints from '@/constants/endpoints';

export const GET_TERMS_AND_CONDITIONS = 'GET_TERMS_AND_CONDITIONS';

interface ITermsPayload {
  id: string;
  text: string;
}

export const getTermsAndConditions = async () => {
  return api({
    url: endpoints.terms,
    label: 'Terms',
  })
    .then((data: ITermsPayload) => data?.text || '')
    .catch(() => '');
};

const useGetTermsAndConditions = <T = string>(
  opts?: UseQueryOptions<string, unknown, T, [typeof GET_TERMS_AND_CONDITIONS]>
) => useQuery([GET_TERMS_AND_CONDITIONS], getTermsAndConditions, opts);

export default useGetTermsAndConditions;
