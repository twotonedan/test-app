import theme from '@/theme/theme';
import { transientOptions } from '@/utils/transientOptions';
import { ChevronLeftRounded, ChevronRightRounded } from '@mui/icons-material';
import { Box, Button, Typography, css, styled } from '@mui/material';
import { ClockPickerView } from '@mui/x-date-pickers';
import { useTranslation } from 'next-i18next';
import { useMemo } from 'react';

const StyledDurationControlsWrapper = styled(Box)`
  display: flex;
  align-items: center;
  column-gap: 4px;
  overflow: visible;
`;

const StyledDurationIconButton = styled(Button, transientOptions)<{ $hide: boolean }>`
  ${theme.mixins.resetButton}
  padding: 4px;
  color: ${theme.palette.customText.primary};
  ${props => props.$hide && 'visibility: hidden;'}
`;

const StyledDurationControlTypography = styled(Typography, transientOptions)<{ disabled?: boolean }>`
  font-weight: 500;
  user-select: none;
  text-transform: uppercase;

  ${({ disabled }) =>
    disabled &&
    css`
      color: ${theme.palette.action.disabled};
    `}
`;

type Props = {
  onClickMinutes: () => void;
  onClickHours: () => void;
  currentView: ClockPickerView;
};

const ClockViewControl = ({ onClickMinutes, onClickHours, currentView }: Props) => {
  const { t } = useTranslation('common');
  const isViewSettedHours = currentView === 'hours';
  const label = useMemo(() => t(`${isViewSettedHours ? 'hours' : 'minutes'}`), [isViewSettedHours, t]);

  return (
    <StyledDurationControlsWrapper>
      <StyledDurationIconButton $hide={isViewSettedHours} onClick={onClickHours}>
        <ChevronLeftRounded />
      </StyledDurationIconButton>
      <StyledDurationControlTypography variant='label'>{label}</StyledDurationControlTypography>
      <StyledDurationIconButton $hide={!isViewSettedHours} onClick={onClickMinutes}>
        <ChevronRightRounded />
      </StyledDurationIconButton>
    </StyledDurationControlsWrapper>
  );
};

export default ClockViewControl;
