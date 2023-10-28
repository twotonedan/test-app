import Dropdown from '@/components/Common/Dropdown';
import { Box, SelectChangeEvent, styled } from '@mui/material';
import { ControllerRenderProps, useWatch } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import useGetBookingTimeRangeByDuration from '@/hooks/api/useGetBookingTimeRangeByDuration';

const StyledWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  grid-gap: 20px;
`;

type Props = {
  baseName: string;
  options: { label: string; value: number }[];
  validateFields?: string[];
  onChange?: (e: SelectChangeEvent, field: ControllerRenderProps) => void;
};

const Duration = ({ baseName, options, validateFields, onChange }: Props) => {
  const { t } = useTranslation('common');
  const name = `${baseName}.duration`;
  const duration = useWatch({ name });

  const { data: timeRangeOptions = [] } = useGetBookingTimeRangeByDuration(duration);

  return (
    <StyledWrapper>
      <Dropdown
        label={`${t('duration')}`}
        labelId={name}
        name={name}
        options={options}
        validateFields={validateFields}
        onChange={onChange}
      />
      {duration && (
        <Dropdown
          label={`${t('rentalTime')}`}
          labelId={`${baseName}.range`}
          name={`${baseName}.range`}
          options={timeRangeOptions}
          validateFields={validateFields}
          onChange={onChange}
        />
      )}
    </StyledWrapper>
  );
};

export default Duration;
