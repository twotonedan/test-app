import useDateRangePicker from '@/hooks/components/useDateRangePicker';
import { IDateRangeCalendarInfo } from '@/types/common';
import { now } from 'lodash';
import { memo, useDeferredValue } from 'react';
import SwiperCalendar from '../SwiperCalendar/SwiperCalendar';

type Props = {
  name: string;
  className?: string;
  initialMinDate: Date | number;
  monthsQuantity: number;
  calendarInfo?: IDateRangeCalendarInfo;
  withPrices?: boolean;
  useDesktopMode?: boolean;
};

const DateRangePicker = ({
  name,
  className,
  calendarInfo,
  withPrices,
  initialMinDate = now(),
  monthsQuantity = 12,
  useDesktopMode,
}: Props) => {
  const swiperCalendarProps = useDateRangePicker({ name, calendarInfo, withPrices });
  const deferredCalendarProps = useDeferredValue(swiperCalendarProps);

  return (
    <SwiperCalendar
      className={className}
      {...deferredCalendarProps}
      initialMinDate={initialMinDate}
      monthsQuantity={monthsQuantity}
      useDesktopMode={useDesktopMode}
    />
  );
};

export default memo(DateRangePicker);
