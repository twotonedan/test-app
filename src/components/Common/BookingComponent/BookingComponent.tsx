import TimeRangeInputs from '@/components/Common/TimeRangeInputs';
import useSetType from '@/hooks/useSetType';
import { BookingInformationType } from '@/types/enums';
import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'next-i18next';
import Dropdown from '@/components/Common/Dropdown';
import useGetBookingInformation from '@/hooks/api/useGetBookingInformation';
import { SelectChangeEvent, Skeleton, styled } from '@mui/material';
import { ControllerRenderProps } from 'react-hook-form';
import Duration from './Duration';

const StyledSkeleton = styled(Skeleton)`
  height: 40px;
  border-radius: 4px;
`;

type Props = {
  name: string;
  type: BookingInformationType;
  validateFields?: string[];
  withHourLabel?: boolean;
  onChange?: () => void;
};

const BookingComponent = ({ name: baseName, type, validateFields, withHourLabel, onChange }: Props) => {
  const { t } = useTranslation('common');
  const name = `${baseName}.value`;
  useSetType({ name: baseName, type });

  const fieldsToValidate = useMemo(() => [...(validateFields || []), name], [name, validateFields]);
  const { data: availableBooking, isLoading } = useGetBookingInformation(type);

  const handleOnChange = useCallback(
    (e: SelectChangeEvent, field: ControllerRenderProps) => {
      field.onChange(e);
      onChange?.();
    },
    [onChange]
  );

  const bookingComponents = useMemo(
    () => ({
      [BookingInformationType.DURATION]: availableBooking?.type === BookingInformationType.DURATION && (
        <Duration
          baseName={name}
          options={availableBooking.options}
          validateFields={fieldsToValidate}
          onChange={handleOnChange}
        />
      ),
      [BookingInformationType.CUSTOM_RANGE]: availableBooking?.type === BookingInformationType.CUSTOM_RANGE && (
        <TimeRangeInputs
          name={name}
          start={{ options: availableBooking.startOptions, validateFields: fieldsToValidate, onChange: handleOnChange }}
          end={{ options: availableBooking.endOptions, validateFields: fieldsToValidate, onChange: handleOnChange }}
          withHourLabel={withHourLabel}
        />
      ),
      [BookingInformationType.PREDEFINED]: availableBooking?.type === BookingInformationType.PREDEFINED && (
        <Dropdown
          label={`${t('rentalTime')}`}
          labelId={name}
          name={name}
          options={availableBooking.options}
          validateFields={fieldsToValidate}
        />
      ),
    }),
    [availableBooking, fieldsToValidate, name, t, withHourLabel, handleOnChange]
  );

  return isLoading ? <StyledSkeleton variant='rectangular' /> : bookingComponents[type] || null;
};

export default memo(BookingComponent);
