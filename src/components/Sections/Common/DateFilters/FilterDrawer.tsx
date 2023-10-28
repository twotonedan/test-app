import DateRangePicker from '@/components/Common/DateRangePicker';
import DayOfWeekHeader from '@/components/Common/DateRangePicker/DayOfWeekHeader';
import SingleDatePicker from '@/components/Common/SingleDatePicker';
import SingleMultiDatePickers from '@/components/Common/SingleMultiDatePickers';
import Switch from '@/components/Common/Switch';
import { DEFAULT_DATE_SELECTED_RANGE } from '@/constants/default/FILTERS';
import theme from '@/theme';
import { IDateRangeCalendarInfo } from '@/types/common';
import { Box, Button, Divider, Paper, styled } from '@mui/material';
import { useDeferredValue } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import { useCalendarSelectionData } from '@/hooks/contexts/useCalendarSelectionData';
import useFiltersByCategory from '@/hooks/useFiltersByCategory';
import HeaderModalActions from '@/components/Common/HeaderModalActions/HeaderModalActions';
import useIsDesktop from '@/hooks/useIsDesktop';
import BottomBar from './BottomBar';
import DurationControl from './DurationControl';

const StyledWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  height: 100%;

  ${theme.breakpoints.up('lg')} {
    width: 100%;
    max-width: 904px;
    box-shadow: 0px 2px 24px 0px rgba(42, 51, 60, 0.08);
    background-color: ${theme.palette.common.white};
    border-radius: 16px;
  }
`;

const StyledHeader = styled(Paper)`
  padding-top: 8px;
  z-index: 2;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  box-shadow: none;

  ${theme.breakpoints.up('lg')} {
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    border-bottom-right-radius: 0px;
    border-bottom-left-radius: 0px;
    padding: 24px 24px 0;
  }
`;

const StyledModalActions = styled(HeaderModalActions)`
  ${theme.breakpoints.up('lg')} {
    display: none;
  }
`;

const StyledSingleMultiDatePickers = styled(SingleMultiDatePickers)`
  ${theme.mixins.layout}
  margin-top: 8px;

  ${theme.breakpoints.up('lg')} {
    max-width: 568px;
    margin: 0;
    padding: 0;
  }
`;

const StyledCalendarOptions = styled(Box)`
  ${theme.mixins.layout}
  padding-top: 18px;
  padding-bottom: 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;

  ${theme.breakpoints.up('lg')} {
    margin: 0;
    padding: 0;
  }
`;

const StyledSwitch = styled(Switch)`
  align-items: center;

  .MuiTypography-root {
    color: ${theme.palette.customText.secondary};
  }

  ${theme.breakpoints.up('lg')} {
    margin-left: 5px;
  }
`;

const StyledCalendarSectionWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
`;

const StyledDayOfWeekHeader = styled(DayOfWeekHeader)`
  ${theme.mixins.layout};

  ${theme.breakpoints.up('lg')} {
    display: none;
  }
`;

const StyledCalendarWrapper = styled(Box)`
  ${theme.mixins.layout};
  height: 100%;

  ${theme.breakpoints.up('lg')} {
    margin: 0;
    padding: 0;
    height: 418px;
    background-color: ${theme.palette.common.white};
  }
`;

const StyledResetButton = styled(Button)`
  display: none;

  ${theme.breakpoints.up('lg')} {
    display: flex;
    text-transform: capitalize;
    padding: 8px 14px;
  }
`;

const StyledDesktopTopHeader = styled(Box)`
  ${theme.breakpoints.up('lg')} {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
`;

const StyledDivider = styled(Divider)`
  ${theme.breakpoints.up('lg')} {
    display: none;
  }
`;

const monthsQuantity = 12;
const minDate = new Date();

type Props = {
  name: string;
  baseName: string;
  onClickBack: () => void;
  onClickSave: () => void;
  isMultiDay: boolean;
  withPrices?: boolean;
  calendarInfo?: IDateRangeCalendarInfo;
  allowWaitlist?: boolean;
  onClickWaitlist?: () => void;
};

const FilterDrawer = ({
  name,
  baseName,
  onClickBack,
  onClickSave,
  withPrices,
  isMultiDay,
  calendarInfo,
  allowWaitlist,
  onClickWaitlist,
}: Props) => {
  const { t } = useTranslation(['common', 'actions']);
  const { setValue, control } = useFormContext();
  const filtersByCategory = useFiltersByCategory(control);
  const deferredIsMultiDay = useDeferredValue(isMultiDay);
  const calendarSelectionData = useCalendarSelectionData();
  const isDesktop = useIsDesktop();

  const handleReset = () => {
    if (isMultiDay) return setValue(`${baseName}.dateRange`, DEFAULT_DATE_SELECTED_RANGE);
    return setValue(`${baseName}.date`, null);
  };

  return (
    <StyledWrapper>
      <StyledHeader>
        <StyledModalActions handleReset={handleReset} onClickBack={onClickBack} />
        <StyledDesktopTopHeader>
          <StyledResetButton onClick={handleReset}>{t('actions:reset')}</StyledResetButton>

          <StyledSingleMultiDatePickers name={baseName} isMultiDay={isMultiDay} />
        </StyledDesktopTopHeader>
        <StyledCalendarSectionWrapper>
          <StyledCalendarOptions>
            <StyledSwitch
              name={`${baseName}.isMultiDay`}
              label={t('multiDay')}
              defaultChecked={isMultiDay}
              disabled={!(filtersByCategory?.settings?.allowMultidayChange ?? true)}
            />
            {isMultiDay && <DurationControl name={name} />}
          </StyledCalendarOptions>
          <StyledDivider />
          <StyledDayOfWeekHeader />
        </StyledCalendarSectionWrapper>
      </StyledHeader>
      <Divider />
      <StyledCalendarWrapper>
        {deferredIsMultiDay ? (
          <DateRangePicker
            name={name}
            monthsQuantity={monthsQuantity}
            initialMinDate={minDate}
            withPrices={withPrices}
            calendarInfo={calendarInfo}
            useDesktopMode={isDesktop}
          />
        ) : (
          <SingleDatePicker
            name={name}
            monthsQuantity={monthsQuantity}
            initialMinDate={minDate}
            withPrices={withPrices}
            calendarInfo={calendarInfo}
            useDesktopMode={isDesktop}
          />
        )}
      </StyledCalendarWrapper>
      <Divider />
      <BottomBar
        onClickSave={onClickSave}
        withPrice={withPrices}
        allowWaitlist={allowWaitlist}
        onClickWaitlist={onClickWaitlist}
        {...calendarSelectionData}
      />
    </StyledWrapper>
  );
};

export default FilterDrawer;
