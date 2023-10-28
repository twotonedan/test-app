import Dropdown from '@/components/Common/Dropdown/Dropdown';
import { ComponentPropsWithoutRef, useMemo } from 'react';
import { useWatch } from 'react-hook-form';
import { useTranslation } from 'next-i18next';

import { format } from 'date-fns';

const formatTime = 'hh:mm a';

export type TimeRangeInputsPickerProps = Omit<ComponentPropsWithoutRef<typeof Dropdown>, 'name' | 'label' | 'labelId'>;

const useTimeRangeFilter = (name: string, start: TimeRangeInputsPickerProps, end: TimeRangeInputsPickerProps) => {
  const { t } = useTranslation('common');
  const startName = `${name}.start`;
  const endName = `${name}.end`;

  const defaultMinStartTime = start.options[0].value;
  const defaultMaxStartTime = start.options[start.options.length - 1].value;

  const defaultMinEndTime = end.options[0]?.value;
  const defaultMaxEndTime = end.options[end.options.length - 1]?.value;

  const startTimeData = useWatch({ name: startName, defaultValue: [defaultMinStartTime, defaultMaxStartTime] });
  const endTimeData = useWatch({ name: endName, defaultValue: [defaultMinEndTime, defaultMaxEndTime] });

  const [startTimeFrom, startTimeTo] = startTimeData;
  const [endTimeFrom, endTimeTo] = endTimeData;

  const pickUpLabel = useMemo(
    () =>
      [
        t('from'),
        format(new Date(2012, 9, 9, startTimeFrom, 0), formatTime),
        t('to'),
        format(new Date(2012, 9, 9, startTimeTo, 0), formatTime),
      ].join(' '),
    [startTimeFrom, startTimeTo, t]
  );

  const dropOffLabel = useMemo(
    () =>
      [
        t('from'),
        format(new Date(2012, 9, 9, endTimeFrom, 0), formatTime),
        t('to'),
        format(new Date(2012, 9, 9, endTimeTo, 0), formatTime),
      ].join(' '),
    [endTimeFrom, endTimeTo, t]
  );

  return {
    defaultMinStartTime,
    defaultMaxStartTime,
    defaultMinEndTime,
    defaultMaxEndTime,
    startTimeFrom,
    startTimeTo,
    endTimeFrom,
    endTimeTo,
    pickUpLabel,
    dropOffLabel,
  };
};

export default useTimeRangeFilter;
