import { DotsIcon } from '@/assets';
import styled from '@emotion/styled';
import { Typography, SvgIcon, Divider, Box } from '@mui/material';
import useTwoDigitsFormatDate from '@/hooks/formatters/useTwoDigitsFormatDate';
import { useTranslation } from 'next-i18next';
import { expirationToDate } from '@/utils/formatDates';
import { PaymentBrands } from '../StripeInput/StripeInputs';

const StyledCardBrand = styled(Box)`
  display: flex;
  align-items: center;
  margin-left: 8px;
`;

const StyledCard = styled(Box)`
  display: flex;
  gap: 8px;
  justify-content: start;
  align-items: center;
`;

const StyledCardNumbers = styled(Typography)`
  display: flex;
  align-items: center;
  gap: 4px;
`;

type Props = {
  brand: string;
  last4: string;
  expMonth: number;
  expYear: number;
};

const CardRow = ({ brand, last4, expMonth, expYear }: Props) => {
  const { t } = useTranslation('common');
  const { formatMonthYear } = useTwoDigitsFormatDate();

  return (
    <StyledCard>
      <StyledCardBrand>
        <SvgIcon
          component={PaymentBrands[brand.toLowerCase() as keyof typeof PaymentBrands]}
          viewBox='0 0 24 24'
          width='24'
          height='24'
          className='icon'
        />
      </StyledCardBrand>
      <StyledCardNumbers variant='h4'>
        <SvgIcon component={DotsIcon} viewBox='0 0 20 20' width='20' height='20' className='icon' />
        {last4}
      </StyledCardNumbers>
      <Divider orientation='vertical' variant='middle' flexItem />
      <Typography variant='h4'>
        {t('payment.expires')} {formatMonthYear(expirationToDate(expMonth, expYear), true)}
      </Typography>
    </StyledCard>
  );
};

export default CardRow;
