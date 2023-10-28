import theme from '@/theme/theme';
import { Box, Button, Typography, styled } from '@mui/material';
import { useTranslation } from 'next-i18next';

const StyledWrapper = styled(Box)`
  ${theme.mixins.layout}
  display: flex;
  flex-direction: column;

  ${theme.breakpoints.up('md')} {
    padding: 0;
  }
`;

const StyledBottomContainer = styled(Box)`
  display: flex;
  grid-gap: 8px;
`;

const StyledButton = styled(Button)`
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  height: 40px;
`;

const StyledUnavailableLabel = styled(Typography)`
  font-weight: 500;
  color: ${theme.palette.customText.secondary};
  margin: 0 0 8px 8px;
`;

type Props = {
  isUnavailable?: boolean;
  isDisabled?: boolean;
  onMainButtonClick?: () => void;
  allowWaitlist?: boolean;
  onClickWaitlist?: () => void;
  mainButtonLabel: string;
  isDisabledMainButton?: boolean;
  className?: string;
};

const BookingButtons = ({
  isUnavailable,
  isDisabled,
  onMainButtonClick,
  allowWaitlist = true,
  onClickWaitlist,
  mainButtonLabel,
  isDisabledMainButton,
  className,
}: Props) => {
  const { t } = useTranslation(['actions', 'common']);

  const showWaitlistButton = isUnavailable && allowWaitlist;

  return (
    <StyledWrapper className={className}>
      {isUnavailable && (
        <StyledUnavailableLabel className='bookingButtons-unavailableQuestion' variant='h4'>
          {t('common:unavailableDatesQuestion')}
        </StyledUnavailableLabel>
      )}
      <StyledBottomContainer>
        {showWaitlistButton && (
          <StyledButton
            variant='outlined'
            className='bookingButtons-joinTheWaitlist'
            disabled={isDisabled}
            fullWidth
            onClick={onClickWaitlist}>
            {t('actions:joinTheWaitlist')}
          </StyledButton>
        )}
        <StyledButton
          variant='contained'
          className='bookingButtons-mainButton'
          disabled={isDisabledMainButton}
          fullWidth
          onClick={onMainButtonClick}>
          {mainButtonLabel}
        </StyledButton>
      </StyledBottomContainer>
    </StyledWrapper>
  );
};

export default BookingButtons;
