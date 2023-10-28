import useMuiDrawer from '@/hooks/components/useMuiDrawer';
import NiceModal, { NiceModalHocProps, useModal } from '@ebay/nice-modal-react';
import { Box, Button, Drawer, Tab, Tabs, Typography, styled } from '@mui/material';
import { memo, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'next-i18next';
import theme from '@/theme/theme';
import { TimePeriod } from '@/types/enums';
import { ClockPicker, ClockPickerView, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { addHours, format, getHours, isValid } from 'date-fns';
import { useFormContext, useWatch } from 'react-hook-form';
import { transientOptions } from '@/utils/transientOptions';
import HeaderModalActions from '../../HeaderModalActions/HeaderModalActions';
import TimeInput from '../TimeInput';
import ClockViewControl from './ClockViewControl';

const StyledDrawer = styled(Drawer)`
  & > .MuiPaper-root {
    width: 100%;
    border-radius: 0;
    position: relative;
    display: flex;
    flex-direction: column;
    padding-top: 8px;
  }
`;

const StyledHeader = styled(Box)`
  display: flex;
  flex-direction: column;
`;

const StyledInputWrapper = styled(Box)`
  ${theme.mixins.layout}
  margin-top: 8px;
`;

const StyledInnerHeader = styled(Box)`
  ${theme.mixins.layout}
  display: flex;
  margin-top: 28px;
  justify-content: space-between;
  box-sizing: border-box;
  overflow: hidden;
`;

const StyledTabs = styled(Tabs)`
  border-radius: 200px;
  background-color: ${theme.palette.customColors.gray};
  width: fit-content;
  min-height: unset;

  .left-button {
    padding-right: 6px;
  }

  .right-button {
    padding-left: 6px;
  }

  .MuiTabs-indicator {
    background-color: ${theme.palette.primary.main};
    height: 100%;
    width: 54px;
    border-radius: 200px;
    z-index: 1;
  }
`;

const StyledTab = styled(Tab)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: unset;
  color: ${theme.palette.customColors.tabGray};
  background-color: transparent;
  padding: 12px 16px;
  min-width: unset;
  position: relative;
  z-index: 2;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;

  &.Mui-selected {
    border-radius: 200px;
    color: white;
    padding: 12px 18px;
    width: 54px;
  }
`;

const StyledClockPicker = styled(ClockPicker, transientOptions)<{ $noDate: boolean }>`
  margin: 16px auto 0;

  .Mui-selected {
    ${props => props.$noDate && `color: unset !important;`}
  }

  .MuiClock-clock {
    height: 280px;
    width: 280px;
    background-color: ${theme.palette.customColors.lightGray};
  }

  .MuiClockPointer-root {
    scale: 1.2;
  }

  .MuiClock-wrapper {
    scale: 1.2;
    margin-top: 8px;
  }

  .MuiClockNumber-root {
    font-size: 13px;
  }
`;

const StyledFooter = styled(Box)`
  ${theme.mixins.layout}
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  border-top: 1px solid ${theme.palette.customColors.gray};
`;

const StyledTypography = styled(Typography)`
  font-weight: 500;
  line-height: 14px;
  color: ${theme.palette.customText.secondary};
  text-transform: uppercase;
`;

const StyledButton = styled(Button)`
  margin: 20px 0;
`;

interface ModalProps extends NiceModalHocProps {
  onClickBack: () => void;
  formName: string;
  inputLabel: string;
}

const TimeModal = NiceModal.create(({ onClickBack, formName, inputLabel }: ModalProps) => {
  const { t } = useTranslation(['common', 'actions']);
  const modal = useModal();
  const { isOpen } = useMuiDrawer(modal);
  const time = useWatch({ name: formName });
  const timePeriod = useMemo(() => (getHours(time) >= 12 ? TimePeriod.PM : TimePeriod.AM), [time]);
  const { setValue: setClockDate } = useFormContext();
  const handleChange = useCallback(
    () => time && setClockDate(formName, addHours(time, 12), { shouldValidate: true }),
    [formName, setClockDate, time]
  );
  const handleReset = useCallback(
    () => setClockDate(formName, null, { shouldValidate: true }),
    [formName, setClockDate]
  );
  const [clockView, setClockView] = useState<ClockPickerView>('hours');
  const isValidTime = useMemo(() => isValid(time), [time]);
  const timeLabel = useMemo(
    () => `${t('common:info')}: ${isValidTime ? format(time, 'hh mm a') : '--:--'}`,
    [isValidTime, t, time]
  );

  return (
    <StyledDrawer open={isOpen}>
      <StyledHeader>
        <HeaderModalActions onClickBack={onClickBack} handleReset={handleReset} />
        <StyledInputWrapper>
          <TimeInput name={formName} label={inputLabel} disableOpenPicker />
        </StyledInputWrapper>
        <StyledInnerHeader>
          <StyledTabs value={timePeriod} onChange={handleChange}>
            <StyledTab label={t('common:am')} className='left-button' value={TimePeriod.AM} />
            <StyledTab label={t('common:pm')} className='right-button' value={TimePeriod.PM} />
          </StyledTabs>
          <ClockViewControl
            currentView={clockView}
            onClickHours={() => setClockView('hours')}
            onClickMinutes={() => setClockView('minutes')}
          />
        </StyledInnerHeader>
      </StyledHeader>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <StyledClockPicker
          $noDate={!isValidTime}
          date={isValidTime ? time : null}
          onChange={newDate => setClockDate(formName, newDate, { shouldValidate: true })}
          view={clockView}
          ampm
        />
      </LocalizationProvider>
      <StyledFooter>
        <StyledTypography variant='label'>{timeLabel}</StyledTypography>
        <StyledButton variant='contained' onClick={onClickBack}>
          {t('actions:save')}
        </StyledButton>
      </StyledFooter>
    </StyledDrawer>
  );
});

export default memo(TimeModal);
