import { memo } from 'react';
import { styled, Box, Typography, Button } from '@mui/material';

import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';

import theme from '@/theme';
import { useTranslation } from 'next-i18next';

const StyledReservationsLink = styled(Box)`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 4px;
  & .MuiButtonBase-root {
    padding-left: 4px;
  }
  ${theme.breakpoints.up('lg')} {
    margin-top: 0;
    height: 62px;
    width: 260px;
    & .MuiButtonBase-root {
      padding-right: 0;
    }
  }
`;

const SuccessCheckout = () => {
  const { t } = useTranslation('common');

  return (
    <StyledReservationsLink>
      <Typography>{t('postCheckout.goTo')}</Typography>
      <Button color='primary'>
        {t('postCheckout.myReservations')}&nbsp;&nbsp;
        <ArrowForwardOutlinedIcon fontSize='small' />
      </Button>
    </StyledReservationsLink>
  );
};

export default memo(SuccessCheckout);
