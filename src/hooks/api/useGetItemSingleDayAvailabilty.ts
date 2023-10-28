import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AvailableSingleDatesPayload } from '@/mock/AVAILABLE_DATES';
import { api } from '@/utils/api';
import endpoints from '@/constants/endpoints';
import { isSameDay } from 'date-fns';

export const GET_ITEM_SINGLE_DAY_AVAILABILITY = 'GET_ITEM_SINGLE_DAY_AVAILABILITY';

type Props = {
  limit?: number;
  excludeDates?: Date[];
};

export const getItemSingleDayAvailability = async ({ limit, excludeDates }: Props) => {
  return api({
    url: endpoints.itemSingleDayAvailability,
    method: 'POST',
    label: 'Feed',
    body: {
      excludeDates,
      limit,
    },
  })
    .then((data: AvailableSingleDatesPayload) => {
      const filteredData = excludeDates?.length
        ? data.filter(date => !excludeDates.some(excludeDate => excludeDate && isSameDay(excludeDate, date.date)))
        : data;
      return limit ? filteredData.slice(0, limit) : filteredData;
    })
    .catch(() => []);
};

const useGetItemSingleDayAvailability = <T = AvailableSingleDatesPayload>(
  props: Props, // TODO: Receive ID of item to fetch availability for
  opts?: UseQueryOptions<
    AvailableSingleDatesPayload,
    unknown,
    T,
    [typeof GET_ITEM_SINGLE_DAY_AVAILABILITY, typeof props]
  >
) => useQuery([GET_ITEM_SINGLE_DAY_AVAILABILITY, props], () => getItemSingleDayAvailability(props), opts);

export default useGetItemSingleDayAvailability;
