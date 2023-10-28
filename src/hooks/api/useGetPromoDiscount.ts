import { PROMO_CODES } from '@/mock/PROMO_CODES';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export const GET_PROMO_CODE = 'GET_PROMO_CODE';

export const getPromoCode = async (code: string) => {
  return new Promise<number>((resolve, reject) => {
    const timer = 1000;
    const discountAmount = PROMO_CODES[code];
    if (discountAmount) setTimeout(() => resolve(discountAmount), timer);
    setTimeout(() => reject(new Error('The code provided is not valid')), timer);
  });
};

const useGetPromoDiscount = <T = number>(
  code: string,
  opts?: UseQueryOptions<number, unknown, T, [typeof GET_PROMO_CODE, typeof code]>
) => useQuery([GET_PROMO_CODE, code], () => getPromoCode(code), opts);

export default useGetPromoDiscount;
