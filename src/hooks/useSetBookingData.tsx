import { IDateRange } from '@/types/common';
import { useFormContext } from 'react-hook-form';
import { defaultState } from './queries/BookingQuery/useGetBookingQuery';

type Props = {
  name: string;
};

const useSetBookingData = ({ name }: Props) => {
  const { setValue } = useFormContext();

  const handleSetBookingData = ({ date, dateRange }: { date?: Date; dateRange?: IDateRange }) => {
    const isMultiDay = !!dateRange;

    setValue(name, {
      ...defaultState,
      ...(isMultiDay ? { dateRange, isMultiDay: true } : { date, isMultiDay: false }),
    });
  };

  return { handleSetBookingData };
};

export default useSetBookingData;
