import { ItemPrice } from '@/hooks/contexts/useCalculatePrice';
import { useCurrencyFormatter } from '@/hooks/contexts/useCurrencyFormatter';
import theme from '@/theme/theme';
import { pluralize } from '@/utils/pluralize';
import { Box, Typography, styled } from '@mui/material';
import { map } from 'lodash';
import { useTranslation } from 'next-i18next';

const StyledPriceRow = styled(Box)`
  display: flex;
  justify-content: space-between;
`;

const StyledPriceContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;

  ${theme.breakpoints.up('lg')} {
    padding: 24px;
  }
`;

const StyledPriceTitle = styled(Typography)`
  font-weight: 600;
`;

type Props = {
  title: string;
  duration: number;
  subTotal: number;
  accessories: ItemPrice['accessories'];
};

const ItemCartPricingSummary = ({ title, duration, subTotal, accessories }: Props) => {
  const { t } = useTranslation('common');
  const { currencyFormatter } = useCurrencyFormatter();

  return (
    <StyledPriceContainer>
      <StyledPriceRow>
        <StyledPriceTitle variant='h4'>{`${title} (${pluralize(
          duration,
          t('day'),
          t('days'),
          true
        )})`}</StyledPriceTitle>
        <Typography variant='h4'>{currencyFormatter.format(subTotal)}</Typography>
      </StyledPriceRow>
      {map(accessories, (accessory, key) => (
        <StyledPriceRow key={key}>
          <Typography variant='h4'>{`${accessory.$metadata.alt} ${
            accessory.$quantity > 1 ? `(x ${accessory.$quantity})` : ''
          }`}</Typography>
          <Typography variant='h4'>{currencyFormatter.format(accessory.total)}</Typography>
        </StyledPriceRow>
      ))}
    </StyledPriceContainer>
  );
};

export default ItemCartPricingSummary;
