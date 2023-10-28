import { Box, Divider, Typography, styled } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useCalculatePrice } from '@/hooks/contexts/useCalculatePrice';
import { useCurrencyFormatter } from '@/hooks/contexts/useCurrencyFormatter';
import theme from '@/theme/theme';
import useIsMobile from '@/hooks/useIsMobile';
import PromoCodeInput from '../../PromoCodeInput';

const StyledWrapper = styled(Box)`
  ${theme.mixins.layout}
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  grid-gap: 16px;
`;

const StyledPriceContainer = styled(Box)`
  display: flex;
  justify-content: space-between;

  &.total-wrapper {
    margin-bottom: 48px;
  }
`;

const StyledSubtotal = styled(Typography)`
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
`;

const StyledDivider = styled(Divider)`
  ${theme.breakpoints.up('md')} {
    margin-top: 8px;
    margin-bottom: 24px;
  }
`;

const StyledTotal = styled(Typography)`
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
`;

const PromoCode = () => {
  const { t } = useTranslation('common');
  const { prices } = useCalculatePrice();
  const { currencyFormatter } = useCurrencyFormatter();
  const isMobile = useIsMobile();

  return (
    <StyledWrapper>
      {isMobile && <Divider />}
      <StyledPriceContainer>
        <StyledSubtotal variant='label'>{t('subtotal')}</StyledSubtotal>
        <StyledSubtotal variant='label'>{currencyFormatter.format(prices.subTotal)}</StyledSubtotal>
      </StyledPriceContainer>
      <PromoCodeInput />
      <StyledDivider />
      {isMobile && (
        <StyledPriceContainer className='total-wrapper'>
          <StyledTotal variant='label'>{t('total')}</StyledTotal>
          <StyledTotal variant='label'>{currencyFormatter.format(prices.total)}</StyledTotal>
        </StyledPriceContainer>
      )}
    </StyledWrapper>
  );
};

export default PromoCode;
