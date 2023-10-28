import { Box, Typography, styled } from '@mui/material';
import { ComponentPropsWithoutRef } from 'react';
import { useTranslation } from 'next-i18next';
import { transientOptions } from '@/utils/transientOptions';
import theme from '@/theme/theme';

import useTimeRangeFilter from '@/hooks/useTimeRangeFilter';
import Dropdown from '../Dropdown';
import SliderRange from '../SliderRange/SliderRange';

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

const StyledContainer = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const StyledTextContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StyledLabelsContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
`;

const StyledSliderContainer = styled(Box)`
  padding: 0 8px;
`;

export type TimeRangeInputsPickerProps = Omit<ComponentPropsWithoutRef<typeof Dropdown>, 'name' | 'label' | 'labelId'>;

type Props = {
  name: string;
  className?: string;
  start: TimeRangeInputsPickerProps;
  end: TimeRangeInputsPickerProps;
  withHourLabel?: boolean;
};

const TimeRangeSlider = ({ name, className, start, end, withHourLabel = false }: Props) => {
  const { t } = useTranslation('common');
  const startName = `${name}.start`;
  const endName = `${name}.end`;
  const { defaultMinStartTime, defaultMaxStartTime, defaultMinEndTime, defaultMaxEndTime, pickUpLabel, dropOffLabel } =
    useTimeRangeFilter(name, start, end);

  return (
    <StyledWrapper className={className} $withLabel={withHourLabel}>
      {withHourLabel && (
        <StyledFilterTitle variant='label' fontWeight={600}>
          {t('hours')}
        </StyledFilterTitle>
      )}
      <StyledContainer>
        <StyledTextContainer>
          <StyledLabelsContainer>
            <Typography color={theme.palette.customText.secondary} variant='label'>
              {t('time.pickUp')}
            </Typography>
            <Typography color={theme.palette.customText.secondary} variant='label'>
              {pickUpLabel}
            </Typography>
          </StyledLabelsContainer>
          <StyledSliderContainer>
            <SliderRange
              name={startName}
              defaultValue={[defaultMinStartTime, defaultMaxStartTime]}
              step={1}
              marks
              max={defaultMaxStartTime}
            />
          </StyledSliderContainer>
        </StyledTextContainer>
        <StyledTextContainer>
          <StyledLabelsContainer>
            <Typography color={theme.palette.customText.secondary} variant='label'>
              {t('time.dropOff')}
            </Typography>
            <Typography color={theme.palette.customText.secondary} variant='label'>
              {dropOffLabel}
            </Typography>
          </StyledLabelsContainer>
          <StyledSliderContainer>
            <SliderRange
              name={endName}
              defaultValue={[defaultMinEndTime, defaultMaxEndTime]}
              step={1}
              marks
              max={defaultMaxEndTime}
            />
          </StyledSliderContainer>
        </StyledTextContainer>
      </StyledContainer>
    </StyledWrapper>
  );
};

export default TimeRangeSlider;
