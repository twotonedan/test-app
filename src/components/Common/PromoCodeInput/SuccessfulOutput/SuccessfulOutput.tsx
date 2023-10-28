import { useCurrencyFormatter } from '@/hooks/contexts/useCurrencyFormatter';
import { Box, Chip, Typography, styled } from '@mui/material';
import { useTranslation } from 'next-i18next';

const StyledWrapper = styled(Box)`
  display: flex;
  align-items: center;
  height: 40px;
`;

const StyledChip = styled(Chip)`
  margin-left: 8px;
  margin-right: auto;
`;

const StyledTypography = styled(Typography)`
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
`;

type Props = {
  resetForm: () => void;
  promoCodeData: {
    key: string;
    amount: number;
  };
};

const SuccessfulOutput = ({ resetForm, promoCodeData }: Props) => {
  const { t } = useTranslation('common');
  const { currencyFormatter } = useCurrencyFormatter();

  return (
    <StyledWrapper className='succes-output'>
      <Typography variant='h4' component='label'>
        {t('promoCode')}
      </Typography>
      <StyledChip size='small' label={promoCodeData.key} onDelete={() => resetForm()} />
      <StyledTypography variant='label'>-{currencyFormatter.format(promoCodeData.amount)}</StyledTypography>
    </StyledWrapper>
  );
};

export default SuccessfulOutput;
