import { ShareIcon } from '@/assets';
import { useCartData } from '@/hooks/contexts/useCartData';
import theme from '@/theme/theme';
import { ButtonBase, SvgIcon, Typography, styled } from '@mui/material';
import { useTranslation } from 'next-i18next';

const StyledWrapper = styled(ButtonBase)`
  display: flex;
  align-items: center;
  border-radius: 999px;
  background-color: ${theme.palette.customColors.lightGray};
  padding: 10px 12px 10px 10px;
  grid-gap: 9px;
  cursor: pointer;

  :hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;

const StyledTypography = styled(Typography)`
  font-weight: 600;
`;

const ShareButton = () => {
  const { t } = useTranslation('common');
  const { cartLength } = useCartData();

  return (
    <StyledWrapper>
      <StyledTypography variant='h4'>{`${cartLength} ${t('items')}`}</StyledTypography>
      <SvgIcon component={ShareIcon} inheritViewBox sx={{ fontSize: '17px' }} />
    </StyledWrapper>
  );
};

export default ShareButton;
