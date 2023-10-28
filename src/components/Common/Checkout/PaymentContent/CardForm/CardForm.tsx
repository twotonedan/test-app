import { Box, Grid, Typography, styled } from '@mui/material';
import theme from '@/theme';

import {
  StripeCardCvcElementChangeEvent,
  StripeCardExpiryElementChangeEvent,
  StripeCardNumberElementChangeEvent,
} from '@stripe/stripe-js';
import { useTranslation } from 'next-i18next';
import InputAdornment from '@mui/material/InputAdornment';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { CardProps, useNewPaymentState } from '@/hooks/contexts/useNewPaymentCard';
import { useUserState } from '@/hooks/contexts/useUserState';
import { useEffect, useState } from 'react';
import { StripeTextFieldCVC, StripeTextFieldExpiry, StripeTextFieldNumber } from '../StripeInput/StripeInputs';
import {
  CustomStripeTextFieldNumber,
  CustomStripeTextFieldExpiry,
  CustomStripeTextFieldCVC,
} from '../StripeInput/CustomInputs/CustomInputs';

const StyledContainer = styled(Box)`
  margin-top: 24px;
  width: 100%;
`;

const StyledTypographySubTitle = styled(Typography)`
  font-size: 14px;
  font-weight: 500;
  margin: 12px 0;
`;

const StyledCheckIcon = styled(CheckCircleOutlineIcon)`
  color: ${theme.palette.customColors.lightGreen};
`;

type Props = {
  customData?: {
    last4: string;
    expMonth: number;
    expYear: number;
    brand: string;
  };
  defaultIsCustom?: boolean;
};

function CardForm({ defaultIsCustom = false, customData }: Props) {
  const [isCustom, setIsCustom] = useState<boolean>(defaultIsCustom);
  const { cardState, setCardState, resetCardState } = useNewPaymentState();

  const { isLoggedIn } = useUserState();
  const { t } = useTranslation('common');

  const onCardNumberChange = (e: StripeCardNumberElementChangeEvent) => {
    setCardState((prev: CardProps) => ({
      ...prev,
      number: { error: e?.error?.message ?? '', completed: e.complete },
    }));
  };

  const onExpireChange = (e: StripeCardExpiryElementChangeEvent) => {
    setCardState((prev: CardProps) => ({
      ...prev,
      expire: { error: e?.error?.message ?? '', completed: e.complete },
    }));
  };

  const onCVCChange = (e: StripeCardCvcElementChangeEvent) => {
    setCardState((prev: CardProps) => ({
      ...prev,
      cvc: { error: e?.error?.message ?? '', completed: e.complete },
    }));
  };

  const handleHideCustomInputs = () => setIsCustom?.(false);

  useEffect(() => () => resetCardState(), [resetCardState]);

  return (
    <>
      {!isLoggedIn && <StyledTypographySubTitle>{t('payment.subTitle')}</StyledTypographySubTitle>}
      <StyledContainer>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            {isCustom && (
              <CustomStripeTextFieldNumber customData={customData} handleHideCustomInputs={handleHideCustomInputs} />
            )}
            <StripeTextFieldNumber
              isHidden={isCustom}
              error={Boolean(cardState.number.error)}
              labelErrorMessage={cardState.number.error}
              onChange={onCardNumberChange}
            />
          </Grid>
          <Grid item xs={6} md={6}>
            {isCustom && (
              <CustomStripeTextFieldExpiry customData={customData} handleHideCustomInputs={handleHideCustomInputs} />
            )}
            <StripeTextFieldExpiry
              isHidden={isCustom}
              error={Boolean(cardState.expire.error)}
              labelErrorMessage={cardState.expire.error}
              onChange={onExpireChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>{cardState.expire.completed && <StyledCheckIcon />}</InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={6} md={6}>
            {isCustom && <CustomStripeTextFieldCVC handleHideCustomInputs={handleHideCustomInputs} />}
            <StripeTextFieldCVC
              isHidden={isCustom}
              error={Boolean(cardState.cvc.error)}
              labelErrorMessage={cardState.cvc.error}
              onChange={onCVCChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>{cardState.cvc.completed && <StyledCheckIcon />}</InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </StyledContainer>
    </>
  );
}

export default CardForm;
