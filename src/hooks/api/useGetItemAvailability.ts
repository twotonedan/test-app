import { IDateRange } from '@/types/common';
import useGetItemMultiDayAvailability from './useGetItemMultiDayAvailabilty';
import useGetItemSingleDayAvailability from './useGetItemSingleDayAvailabilty';

type Props = {
  isSingleDate: boolean;
  limit?: number;
  selectedDate?: Date | IDateRange;
};

const useGetItemAvailability = ({ isSingleDate, limit, selectedDate }: Props) => {
  const { data: singleDayAvailability } = useGetItemSingleDayAvailability(
    { limit, excludeDates: [selectedDate as Date] },
    { enabled: isSingleDate }
  );
  const { data: multiDayAvailability } = useGetItemMultiDayAvailability(
    { limit, excludeDates: [selectedDate as IDateRange] },
    { enabled: !isSingleDate }
  );
  const availability = isSingleDate ? singleDayAvailability : multiDayAvailability;

  return { availability, singleDayAvailability, multiDayAvailability, isLoading: false };
};

export default useGetItemAvailability;
