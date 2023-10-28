import BookingButtons from '@/components/BookingButtons/BookingButtons';
import { useCurrencyFormatter } from '@/hooks/contexts/useCurrencyFormatter';
import theme from '@/theme';
import { transientOptions } from '@/utils/transientOptions';
import { Paper, Box, Typography, Divider, styled } from '@mui/material';
import { useTranslation } from 'next-i18next';

const StyledWrapper = styled(Paper)`
  width: 100%;
  background: #fff;
  z-index: 2;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  padding-bottom: 20px;
  border-top-right-radius: 0px;
  border-top-left-radius: 0px;

  ${theme.breakpoints.up('md')} {
    display: flex;
    padding-bottom: 24px;
    min-height: 108px;
  }

  ${theme.breakpoints.up('lg')} {
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
    min-height: 92px;
    padding: 0 24px;
  }
`;

const StyledInfoWrapper = styled(Box)`
  ${theme.mixins.layout};
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${theme.breakpoints.up('md')} {
    padding: 20px 24px 0px 24px;
  }

  ${theme.breakpoints.up('lg')} {
    padding: 0;
  }
`;

const StyledLeftTextWrapper = styled(Box)`
  display: flex;
  column-gap: 8px;
  align-items: center;
`;

const StyledText = styled(Typography)`
  font-weight: 500;
`;

const StyledUnavailableText = styled(StyledText)`
  text-decoration: line-through;
  color: ${theme.palette.error.main};
`;

const StyledPriceText = styled(Typography)`
  color: ${theme.palette.text.secondary};
  font-weight: 500;
  width: max-content;
`;

const StyledPriceSubText = styled(StyledPriceText)`
  font-weight: unset;
`;

const StyledMobileRightTextWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  ${theme.breakpoints.up('md')} {
    display: none;
  }
`;

const StyledRightTextWrapper = styled(Box)`
  display: none;

  ${theme.breakpoints.up('md')} {
    display: flex;
    align-items: center;
    gap: 16px;
  }
`;

const StyledTextWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const StyledMobileBookingButtonsWrapper = styled(Box)`
  display: block;

  ${theme.breakpoints.up('md')} {
    display: none;
  }
`;

const StyledTabletButtonsWrapper = styled(Box, transientOptions)<{ $isUnavailable: boolean }>`
  width: ${props => (props.$isUnavailable ? '320px' : '156px')};

  ${theme.breakpoints.up('lg')} {
    width: ${props => (props.$isUnavailable ? '448px' : '220px')};
  }
`;

const StyledDivider = styled(Divider, transientOptions)<{ $isUnavailable: boolean }>`
  margin-bottom: ${props => (props.$isUnavailable ? 8 : 20)}px;

  ${theme.breakpoints.up('md')} {
    display: none;
  }
`;

const StyledBookingButtons = styled(BookingButtons)`
  ${theme.breakpoints.up('md')} {
    .bookingButtons-unavailableQuestion {
      display: none;
    }
  }
`;

type Props = {
  onClickSave?: () => void;
  onClickWaitlist?: () => void;
  withPrice?: boolean;
  isUnavailable?: boolean;
  price?: number;
  allowWaitlist?: boolean;
};

const BottomBar = ({ onClickSave, onClickWaitlist, withPrice = true, isUnavailable, allowWaitlist, price }: Props) => {
  const { t } = useTranslation(['common', 'actions']);
  const { currencyFormatter } = useCurrencyFormatter();

  return (
    <StyledWrapper>
      <StyledInfoWrapper>
        <StyledLeftTextWrapper>
          <StyledText variant='h4' color={theme.palette.customColors.strongLightBlue}>
            *{t('common:holiday')}
          </StyledText>
          <Typography variant='label' color={theme.palette.action.disabled}>
            -
          </Typography>
          <StyledUnavailableText variant='h4'>*{t('common:notAvailable')}</StyledUnavailableText>
        </StyledLeftTextWrapper>
        {withPrice && (
          <StyledMobileRightTextWrapper>
            <StyledPriceText variant='subtitle1'>
              {t('common:from')} {currencyFormatter.format(price || 0)}
            </StyledPriceText>
            <StyledPriceSubText variant='subtitle1'>{t('common:totalPrice').toLowerCase()}</StyledPriceSubText>
          </StyledMobileRightTextWrapper>
        )}
        <StyledRightTextWrapper>
          {price && withPrice && (
            <StyledTextWrapper>
              <StyledPriceText variant='subtitle1'>
                {t('common:from')} {currencyFormatter.format(price || 0)}
              </StyledPriceText>
              <StyledPriceSubText variant='subtitle1'>{t('common:totalPrice').toLowerCase()}</StyledPriceSubText>
            </StyledTextWrapper>
          )}
          <StyledTabletButtonsWrapper $isUnavailable={isUnavailable || false}>
            <StyledBookingButtons
              isUnavailable={isUnavailable}
              mainButtonLabel={t('actions:save')}
              onMainButtonClick={onClickSave}
              allowWaitlist={allowWaitlist}
              onClickWaitlist={onClickWaitlist}
            />
          </StyledTabletButtonsWrapper>
        </StyledRightTextWrapper>
      </StyledInfoWrapper>
      <StyledDivider $isUnavailable={isUnavailable || false} />
      <StyledMobileBookingButtonsWrapper>
        <StyledBookingButtons
          isUnavailable={isUnavailable}
          mainButtonLabel={t('actions:save')}
          onMainButtonClick={onClickSave}
          allowWaitlist={allowWaitlist}
          onClickWaitlist={onClickWaitlist}
        />
      </StyledMobileBookingButtonsWrapper>
    </StyledWrapper>
  );
};

export default BottomBar;
