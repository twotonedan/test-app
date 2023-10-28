import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AvailableMultiDatesPayload } from '@/mock/AVAILABLE_DATES';
import { IDateRange } from '@/types/common';
import { api } from '@/utils/api';
import endpoints from '@/constants/endpoints';
import { isSameDay } from 'date-fns';

export const GET_ITEM_MULTI_DAY_AVAILABILITY = 'GET_ITEM_MULTI_DAY_AVAILABILITY';

type Props = {
  limit?: number;
  excludeDates?: IDateRange[];
};

export const getItemMultiDayAvailability = async ({ limit, excludeDates }: Props) => {
  return api({
    url: endpoints.itemSingleDayAvailability,
    method: 'POST',
    label: 'Feed',
    body: {
      excludeDates,
      limit,
    },
  })
    .then((data: AvailableMultiDatesPayload) => {
      const filteredData = excludeDates?.length
        ? data.filter(
            ({ dateRange }) =>
              !excludeDates.some(
                excludeDate =>
                  excludeDate &&
                  isSameDay(dateRange.start, excludeDate.start) &&
                  isSameDay(dateRange.end, excludeDate.end)
              )
          )
        : data;
      return limit ? filteredData.slice(0, limit) : filteredData;
    })
    .catch(() => []);
};

const useGetItemMultiDayAvailability = <T = AvailableMultiDatesPayload>(
  props: Props, // TODO: Receive ID of item to fetch availability for
  opts?: UseQueryOptions<AvailableMultiDatesPayload, unknown, T, [typeof GET_ITEM_MULTI_DAY_AVAILABILITY, typeof props]>
) => useQuery([GET_ITEM_MULTI_DAY_AVAILABILITY, props], () => getItemMultiDayAvailability(props), opts);

export default useGetItemMultiDayAvailability;
