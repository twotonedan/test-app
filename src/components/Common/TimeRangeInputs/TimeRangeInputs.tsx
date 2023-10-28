import { Box, Typography, styled } from '@mui/material';
import { ComponentPropsWithoutRef, useMemo } from 'react';
import { useTranslation } from 'next-i18next';
import { transientOptions } from '@/utils/transientOptions';
import theme from '@/theme/theme';

import { useWatch } from 'react-hook-form';
import Dropdown from '../Dropdown';

const StyledWrapper = styled(Box, transientOptions)<{ $withLabel: boolean }>`
  display: flex;
  flex-direction: ${props => (props.$withLabel ? 'column' : 'row')};
  gap: 16px;
`;

const StyledFilterTitle = styled(Typography)`
  display: none;

  ${theme.breakpoints.up('md')} {
    display: block;
    text-transform: uppercase;
    width: 100%;
    color: ${theme.palette.customText.secondary};
  }
`;

const StyledDropdownsWrapper = styled(Box)`
  width: 100%;
  display: flex;
  gap: 8px;
`;

export type TimeRangeInputsPickerProps = Omit<ComponentPropsWithoutRef<typeof Dropdown>, 'name' | 'label' | 'labelId'>;

type Props = {
  name: string;
  className?: string;
  start?: TimeRangeInputsPickerProps;
  end?: TimeRangeInputsPickerProps;
  withHourLabel?: boolean;
};

const TimeRangeInputs = ({ name, className, start, end, withHourLabel = false }: Props) => {
  const { t } = useTranslation('common');
  const startName = `${name}.start`;
  const endName = `${name}.end`;

  const startTimeData = useWatch({ name: startName });

  const endOptions = useMemo(
    () =>
      end?.options.filter(option => {
        return option.value > startTimeData;
      }) || [],
    [end?.options, startTimeData]
  );

  return (
    <StyledWrapper className={className} $withLabel={withHourLabel}>
      {withHourLabel && (
        <StyledFilterTitle variant='label' fontWeight={600}>
          {t('hours')}
        </StyledFilterTitle>
      )}
      <StyledDropdownsWrapper>
        <Dropdown
          label={t('time.pickUpTime')}
          labelId={`${startName}-label`}
          name={startName}
          validateFields={[startName, endName]}
          options={start?.options || []}
          {...start}
        />
        <Dropdown
          label={t('time.dropOffTime')}
          labelId={`${endName}-label`}
          name={endName}
          validateFields={[startName, endName]}
          {...end}
          options={endOptions}
        />
      </StyledDropdownsWrapper>
    </StyledWrapper>
  );
};

export default TimeRangeInputs;
