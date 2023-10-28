import theme from '@/theme';
import { Box, Button, Drawer, Paper, Typography, styled } from '@mui/material';
import { useFormContext, useWatch } from 'react-hook-form';
import HeaderModalActions from '@/components/Common/HeaderModalActions/HeaderModalActions';
import { StaticDatePicker } from '@mui/x-date-pickers';
import { noop } from 'lodash';
import { useCallback, useDeferredValue, useMemo } from 'react';
import { transientOptions } from '@/utils/transientOptions';
import { format, isValid } from 'date-fns';
import { useTranslation } from 'next-i18next';
import DatePickerInput from '@/components/Common/DatePickerInput/DatePickerInput';
import useSingleDatePicker from '@/hooks/components/useSingleDatePicker';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import useMuiDrawer from '@/hooks/components/useMuiDrawer';

const StyledDrawer = styled(Drawer)`
  & > .MuiPaper-root {
    background-color: ${theme.palette.common.white};
    width: 100%;
    box-shadow: none;
    border-radius: 0;
  }
`;

const StyledWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const StyledHeaderModalActions = styled(HeaderModalActions)`
  padding: 0;
`;

const StyledHeader = styled(Paper)`
  padding-top: 8px;
  z-index: 2;
  border: 0;
`;

const StyledCalendarWrapper = styled(Box)`
  ${theme.mixins.layout};
  height: 100%;
  position: relative;
`;

const StyledStaticDatePicker = styled(StaticDatePicker, transientOptions)<{ $showDaysOfWeek: boolean }>`
  height: 100%;
  overflow: none;

  .MuiCalendarOrClockPicker-root > div,
  .MuiCalendarPicker-root {
    width: 100%;
    max-height: unset;
    overflow: unset;
    height: 100%;
  }

  .MuiPickerStaticWrapper-content {
    min-width: unset;
    height: 0;
    flex-grow: 1;
    overflow: auto;
  }

  .MuiDayPicker-monthContainer {
    position: relative;
  }

  .MuiPickersFadeTransitionGroup-root,
  .MuiCalendarPicker-root,
  .MuiCalendarOrClockPicker-root {
    height: 100%;
  }

  .MuiMonthPicker-root {
    width: 100%;
    margin: 0;
  }

  .PrivatePickersMonth-root {
    text-transform: capitalize;
    height: 48px;
  }

  .MuiPickersCalendarHeader-root {
    padding: 0 16px;
    margin-bottom: 16px;
    z-index: 2;
  }

  .MuiDayPicker-weekDayLabel {
    color: ${theme.palette.customText.primary};
    font-weight: 500;
  }

  .MuiYearPicker-root {
    max-height: none;
    height: 100%;
    overflow: auto;
  }

  ${theme.breakpoints.up('md')} {
    && .Mui-selected-range,
    && .Mui-selected-range:hover {
      ::after {
        width: 70px;
      }
    }
  }

  div[role='row'] {
    margin: 12px 0;
    justify-content: space-between;

    &:first-of-type {
      margin-top: unset;
    }

    &:last-of-type {
      margin-bottom: unset;
    }
  }
`;

const StyledBottomBarWrapper = styled(Paper)`
  width: 100%;
  background: #fff;
  z-index: 2;
  border-radius: 0;
  padding: 20px 16px;
  border-top: 1px solid ${theme.palette.customColors.gray};
  min-height: 80px;
`;

const StyledInnerWrapper = styled(Box)`
  ${theme.mixins.layout};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledDatePickerInputWrapper = styled(Box)`
  ${theme.mixins.layout};
  margin-top: 12px;
`;

const StyledDate = styled(Typography)``;

type Props = {
  name: string;
  onClickBack: () => void;
  onClickSave: () => void;
  disableFuture?: boolean;
  minDate?: Date;
  maxDate?: Date;
};

const CustomStaticDateModal = NiceModal.create(
  ({ name, onClickBack, onClickSave, disableFuture, minDate, maxDate }: Props) => {
    const { t } = useTranslation(['common', 'actions']);
    const { setValue } = useFormContext();
    const modal = useModal();
    const { isOpen } = useMuiDrawer(modal);
    const selectedDate = useWatch({ name });
    const customPicker = useSingleDatePicker({ name });
    const { handleRenderDay, ...calendarProps } = useDeferredValue(customPicker);
    const handleReset = () => setValue(name, null, { shouldValidate: true });

    const handleChange = useCallback(
      (date: unknown) => {
        const selectedActualDate = date as Date;
        setValue(name, selectedActualDate.toISOString(), { shouldValidate: true });
      },
      [name, setValue]
    );

    const renderDate = useMemo(() => {
      const date = new Date(selectedDate);
      return isValid(date) ? `${t('date.singleDate')}: ${format(date, 'MM/dd/yyyy')}` : t('date.noDateSelected');
    }, [selectedDate, t]);

    return (
      <StyledDrawer open={isOpen}>
        <StyledWrapper>
          <StyledHeader variant='outlined'>
            <StyledHeaderModalActions handleReset={handleReset} onClickBack={onClickBack} />
            <StyledDatePickerInputWrapper>
              <DatePickerInput name={name} validateFields={name} label={t('date.selectDate')} disableOpenPicker />
            </StyledDatePickerInputWrapper>
          </StyledHeader>

          <StyledCalendarWrapper>
            <StyledStaticDatePicker
              {...calendarProps}
              // @ts-ignore
              renderInput={noop}
              displayStaticWrapperAs='desktop'
              value={selectedDate || maxDate}
              views={['year', 'month', 'day']}
              renderDay={(day, __, props) => handleRenderDay(day as Date, props)}
              disableFuture={disableFuture}
              onChange={handleChange}
              minDate={minDate}
              maxDate={maxDate}
              openTo='year'
            />
          </StyledCalendarWrapper>

          <StyledBottomBarWrapper>
            <StyledInnerWrapper>
              <StyledDate variant='label' fontWeight={500} lineHeight='14px'>
                {renderDate}
              </StyledDate>
              <Button variant='contained' disabled={false} onClick={onClickSave}>
                {t('actions:save')}
              </Button>
            </StyledInnerWrapper>
          </StyledBottomBarWrapper>
        </StyledWrapper>
      </StyledDrawer>
    );
  }
);

export default CustomStaticDateModal;
