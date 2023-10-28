import { SupportedIcons } from '@/constants/icons/supportedIcons';
import usePaymentRequest from '@/hooks/stripe/usePaymentRequest';
import theme from '@/theme/theme';
import { BrowserType } from '@/types/enums';
import { Box, Button, Divider, SvgIcon, Typography, styled } from '@mui/material';
import { PaymentRequestPaymentMethodEvent } from '@stripe/stripe-js';
import { useTranslation } from 'next-i18next';
import { useMemo } from 'react';

const StyledTypography = styled(Typography)`
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  color: ${theme.palette.primary.main};
`;

const StyledButton = styled(Button)`
  margin-bottom: 32px;
  grid-gap: 8px;

  ${theme.breakpoints.up('lg')} {
    margin: 16px 0;
  }
`;

const StyledDivider = styled(Divider)`
  margin-bottom: 32px;

  ${theme.breakpoints.up('lg')} {
    margin-bottom: 16px;
  }
`;

type Props = {
  onPaymentRequest: (e: PaymentRequestPaymentMethodEvent) => void;
  className?: string;
};

const AppleGoogleButton = ({ onPaymentRequest, className }: Props) => {
  const { paymentRequest, browserType } = usePaymentRequest({ onPaymentRequest });
  const { t } = useTranslation('common');

  const icon = useMemo(() => {
    return {
      [BrowserType.APPLE]: SupportedIcons.APPLE,
      [BrowserType.GOOGLE]: SupportedIcons.GOOGLE,
    };
  }, []);

  if (!browserType) return null;

  return (
    <Box className={className}>
      <StyledButton variant='outlined' fullWidth onClick={() => paymentRequest?.show()}>
        <SvgIcon component={icon[browserType]} fontSize='small' inheritViewBox />
        <StyledTypography>Pay</StyledTypography>
      </StyledButton>
      <StyledDivider>{t('or')}</StyledDivider>
    </Box>
  );
};

export default AppleGoogleButton;
