import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { REUSABLE_CARDS } from '@/mock/REUSABLE_CARDS';
import { ReusableCardType } from '@/types/reusableCards';

export const GET_REUSABLE_CARDS = 'GET_REUSABLE_CARDS';

export const getReusableCards = async () => {
  return new Promise<ReusableCardType[]>(resolve => {
    const timer = 1000;
    setTimeout(() => resolve(REUSABLE_CARDS), timer);
  });
};

const useGetReusableCardData = <T = ReusableCardType[]>(
  opts?: UseQueryOptions<ReusableCardType[], unknown, T, [typeof GET_REUSABLE_CARDS]>
) => useQuery([GET_REUSABLE_CARDS], getReusableCards, opts);

export default useGetReusableCardData;
