import { memo } from 'react';
import { styled, Box, Typography, Button, SvgIcon } from '@mui/material';

import theme from '@/theme';
import { useTranslation } from 'next-i18next';
import FooterDrawer from '@/components/Common/FooterDrawer/FooterDrawer';
import { PaymentErrorImage } from '@/assets';
import useIsMobile from '@/hooks/useIsMobile';
import { StripeErrorsList, DeclinedErrorList } from './StripeErrorsList';

const StyledContainer = styled(Box)`
  ${theme.breakpoints.up('md')} {
    width: 474px;
  }
  ${theme.breakpoints.up('lg')} {
    width: 596px;
  }
`;

const StyledMessage = styled(Box)`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
  ${theme.breakpoints.up('md')} {
    margin-top: 0px;
  }
`;

const StyledFooter = styled(FooterDrawer)`
  box-shadow: none;
`;

const StyledInnerWrapper = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const StyledTitle = styled(Typography)`
  font-weight: 600;
  font-size: 20px;
  text-align: center;
  margin-bottom: 8px;
`;

const StyledSubTitle = styled(Typography)`
  font-weight: 400;
  font-size: 16px;
  text-align: center;
  max-width: 99%;
  margin: 0 auto;
  ${theme.breakpoints.up('md')} {
    max-width: 100%;
  }
`;

const StyledButton = styled(Button)`
  width: 100%;
  margin-top: auto;
  ${theme.breakpoints.up('md')} {
    width: 100%;
    margin-top: 102px;
  }
`;

export type StripeError = {
  code: string;
  statusCode: number;
  declineCode: string;
};

type Props = {
  onClose?: () => void;
  stripeError: StripeError | undefined;
};

const ErrorCheckout = ({ stripeError, onClose }: Props) => {
  const { t } = useTranslation('common');
  const isMobile = useIsMobile();
  let message = StripeErrorsList[stripeError?.code as keyof typeof StripeErrorsList]?.id;
  if (!message) {
    message = 'subTitle';
  }
  const reason = DeclinedErrorList[stripeError?.declineCode as keyof typeof DeclinedErrorList]?.id;
  return (
    <>
      <StyledContainer>
        <StyledMessage>
          <SvgIcon component={PaymentErrorImage} inheritViewBox sx={{ width: '128px', height: '128px' }} />
          <span>
            <StyledTitle>{t('postCheckout.error.title')}</StyledTitle>
            <StyledSubTitle>{t(`postCheckout.error.${message}`)}</StyledSubTitle>
            {reason && <StyledSubTitle>{t(`postCheckout.declineError.${reason}`)}</StyledSubTitle>}
          </span>
        </StyledMessage>
      </StyledContainer>
      {!isMobile ? (
        <StyledButton variant='contained' onClick={onClose}>
          {t('tryAgain')}
        </StyledButton>
      ) : (
        <StyledFooter>
          <StyledInnerWrapper>
            <StyledButton variant='contained' onClick={onClose}>
              {t('tryAgain')}
            </StyledButton>
          </StyledInnerWrapper>
        </StyledFooter>
      )}
    </>
  );
};

export default memo(ErrorCheckout);
