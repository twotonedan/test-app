import { Box, IconButton, Typography, styled } from '@mui/material';
import theme from '@/theme/theme';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useTranslation } from 'next-i18next';

const StyledWrapper = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  ${theme.breakpoints.up('lg')} {
    justify-content: start;
    gap: 16px;
  }
`;

const StyledGroup = styled(Box)`
  display: flex;
  align-items: center;
  gap: 6px;
`;

type Props = {
  title: string;
  url?: string;
};

const BookingUnitTitle = ({ title, url }: Props) => {
  const { t } = useTranslation('common');
  return (
    <StyledWrapper>
      <Typography fontWeight={600} color={theme.palette.customText.primary} fontSize={16}>
        {title}
      </Typography>
      {url && (
        <IconButton color='primary'>
          <StyledGroup>
            <SettingsOutlinedIcon />
            <Typography variant='h4' fontWeight={600} color={theme.palette.primary.main}>
              {t('bookingUnit.manage')}
            </Typography>
          </StyledGroup>
        </IconButton>
      )}
    </StyledWrapper>
  );
};

export default BookingUnitTitle;
