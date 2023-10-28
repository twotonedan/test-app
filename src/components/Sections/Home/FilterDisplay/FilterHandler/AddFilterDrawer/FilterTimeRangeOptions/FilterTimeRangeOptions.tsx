import { TimeRangeType } from '@/types/enums';
import { ComponentPropsWithoutRef, useMemo } from 'react';
import { useTranslation } from 'next-i18next';
import useSetType from '@/hooks/useSetType';
import ModalSection from '@/components/Common/FiltersModal/ModalSection';
import { useWatch } from 'react-hook-form';
import { Box, Typography, styled } from '@mui/material';
import theme from '@/theme';
import TimeRangeSlider from '@/components/Common/TimeRangeSlider/TimeRangeSlider';
import useTimeRangeFilter from '@/hooks/useTimeRangeFilter';
import { useFeedFilterHandlers } from '@/hooks/contexts/useFeedFilterHandlers';
import Dropdown from '@/components/Common/Dropdown';

const StyledLabelContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledRow = styled(Box)`
  display: flex;
  gap: 4px;
`;

type Props = {
  type: TimeRangeType;
  name: string;
  baseName: string;
  customRangeProps: Omit<ComponentPropsWithoutRef<typeof TimeRangeSlider>, 'name'>;
  predefinedProps: Omit<ComponentPropsWithoutRef<typeof Dropdown>, 'name' | 'label' | 'labelId'>;
  className?: string;
  isAccordion?: boolean;
};

const FilterTimeRangeOptions = ({
  type,
  name,
  baseName,
  customRangeProps,
  predefinedProps,
  className,
  isAccordion = false,
}: Props) => {
  const { t } = useTranslation('common');
  const timeValue = useWatch({ name: `${name}.value` });
  const { filterResetters } = useFeedFilterHandlers();

  const { pickUpLabel, dropOffLabel } = useTimeRangeFilter(
    `${name}.value`,
    customRangeProps.start,
    customRangeProps.end
  );

  useSetType({ name, type });

  const handleClearValues = () => {
    if (type === TimeRangeType.DURATION) {
      filterResetters?.DURATION(baseName);
    } else {
      filterResetters?.SLIDER_RANGE(baseName);
    }
  };

  const getDurationLabel = useMemo(() => {
    let label;
    if (type === TimeRangeType.DURATION) {
      return (
        <Typography color={theme.palette.customText.secondary} variant='subtitle1'>
          {predefinedProps.options.find(option => option.value === timeValue)?.label}
        </Typography>
      );
    }
    return (
      <StyledLabelContainer>
        <StyledRow>
          <Typography color={theme.palette.customText.secondary} fontWeight={600} variant='subtitle1'>
            {t('date.dateRange.start')}
          </Typography>
          <Typography color={theme.palette.customText.secondary} variant='subtitle1'>
            {pickUpLabel}
          </Typography>
        </StyledRow>
        <StyledRow>
          <Typography color={theme.palette.customText.secondary} fontWeight={600} variant='subtitle1'>
            {t('date.dateRange.end')}
          </Typography>
          <Typography color={theme.palette.customText.secondary} variant='subtitle1'>
            {dropOffLabel}
          </Typography>
        </StyledRow>
      </StyledLabelContainer>
    );
    return label;
  }, [dropOffLabel, pickUpLabel, predefinedProps.options, t, timeValue, type]);

  const Components = useMemo(
    () => ({
      [TimeRangeType.SLIDER_RANGE]: (
        <ModalSection
          title={t('time.time')}
          label={getDurationLabel}
          isAccordion={isAccordion}
          className={className}
          onClear={handleClearValues}>
          <TimeRangeSlider name={`${name}.value`} {...customRangeProps} />
        </ModalSection>
      ),
      [TimeRangeType.DURATION]: (
        <ModalSection
          title={t('duration')}
          isAccordion={isAccordion}
          label={getDurationLabel}
          className={className}
          onClear={handleClearValues}>
          <Dropdown label={t('duration')} labelId='durationFilter' name={`${name}.value`} {...predefinedProps} />
        </ModalSection>
      ),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [className, customRangeProps, name, predefinedProps, t]
  );

  return Components[type] || null;
};

export default FilterTimeRangeOptions;
