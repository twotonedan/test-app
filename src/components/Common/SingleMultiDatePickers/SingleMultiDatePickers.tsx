import { Box, styled } from '@mui/material';
import { ComponentPropsWithoutRef, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { useFormContext } from 'react-hook-form';
import { DEFAULT_DATE_SELECTED_RANGE } from '@/constants/default/FILTERS';
import DatePicker from '../DatePickerInput';
import DateRangeInputs from '../DateRangeInputs';

const StyledWrapper = styled(Box)`
  width: 100%;
`;

type Props = Omit<ComponentPropsWithoutRef<typeof DateRangeInputs>, 'name' | 'className'> & {
  isMultiDay?: boolean;
  name: string;
  singleDate?: ComponentPropsWithoutRef<typeof DatePicker>;
  className?: string;
};

const SingleMultiDatePickers = ({ isMultiDay, name, start, end, singleDate, className }: Props) => {
  const { setValue, getValues } = useFormContext();
  const { t } = useTranslation('common');

  useEffect(() => {
    const dateRange = getValues(`${name}.dateRange`);
    const date = getValues(`${name}.date`);

    if (isMultiDay) {
      setValue(`${name}.date`, undefined);
      setValue(`${name}.dateRange`, dateRange || DEFAULT_DATE_SELECTED_RANGE);
    } else {
      setValue(`${name}.dateRange`, undefined);
      setValue(`${name}.date`, date || null);
    }
  }, [getValues, isMultiDay, name, setValue]);

  return (
    <StyledWrapper className={className}>
      {isMultiDay ? (
        <DateRangeInputs name={`${name}.dateRange`} start={start} end={end} />
      ) : (
        <DatePicker
          name={`${name}.date`}
          validateFields={`${name}.date`}
          label={t('date.selectDate')}
          {...singleDate}
          disableOpenPicker
        />
      )}
    </StyledWrapper>
  );
};

export default SingleMultiDatePickers;
