import { format, set, startOfToday } from 'date-fns';
import { useTranslation } from 'next-i18next';
import { HOURS_OF_DAY_OPTIONS_START, HOURS_OF_DAY_OPTIONS_END } from '@/constants';

type TimeRangeProps = {
  pickUpStart: number | undefined;
  pickUpEnd: number | undefined;
  dropOffStart: number | undefined;
  dropOffEnd: number | undefined;
};

const useFormatHours = () => {
  const { t } = useTranslation('common');

  const formatHours = (hours: number, minutes = 0) => {
    const date = set(startOfToday(), { hours, minutes });
    return format(date, 'HH:mm');
  };

  const formatTimeRangeHours = ({ pickUpStart, pickUpEnd, dropOffStart, dropOffEnd }: TimeRangeProps) => {
    return `${t('time.timeRange.start')}: ${t('from')} ${
      HOURS_OF_DAY_OPTIONS_START.find(o => o.value === pickUpStart)?.label
    } - ${t('to')}: ${HOURS_OF_DAY_OPTIONS_START.find(o => o.value === pickUpEnd)?.label}, ${t(
      'time.timeRange.end'
    )}: ${t('from')} ${HOURS_OF_DAY_OPTIONS_END.find(o => o.value === dropOffStart)?.label} - ${t('to')}: ${
      HOURS_OF_DAY_OPTIONS_END.find(o => o.value === dropOffEnd)?.label
    }`;
  };

  return { formatHours, formatTimeRangeHours };
};

export default useFormatHours;
