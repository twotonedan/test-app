import FooterDrawer from '@/components/Common/FooterDrawer';
import theme from '@/theme';
import { ErrorOutline } from '@mui/icons-material';
import { styled, Typography, Button, Box, Skeleton } from '@mui/material';
import { useTranslation } from 'next-i18next';
import PromoCode from '../PromoCode/PromoCode';

const StyledTypography = styled(Typography)`
  font-weight: 600;
`;

const StyledButton = styled(Button)`
  width: 50%;

  ${theme.breakpoints.up('md')} {
    width: auto;
  }
`;

const StyledInnerWrapper = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  gap: 8px;

  ${theme.breakpoints.up('md')} {
    flex-direction: row;
  }
`;

const StyledContentWrapper = styled(Box)`
  column-gap: 20px;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StyledErrorWrapper = styled(Box)`
  ${theme.mixins.layout}
  display: flex;
  align-self: flex-start;
  padding-left: 8px;
  grid-gap: 4px;
`;

const StyledErrorLabel = styled(Typography)`
  font-size: 14px;
  line-height: 20px;
`;

const StyledSkeleton = styled(Skeleton)`
  width: 120px;
`;

const StyledBottom = styled(Box)`
  ${theme.mixins.layout}
  column-gap: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  ${theme.breakpoints.up('md')} {
    width: auto;
    margin-left: auto;
    justify-content: space-between;
    width: inherit;
  }
`;

type Props = {
  amount: string;
  isLoading?: boolean;
  onClick?: () => void;
  isButtonDisabled?: boolean;
  errorMessage?: string;
};

const CartFooter = ({ isLoading, amount, onClick, isButtonDisabled, errorMessage }: Props) => {
  const { t } = useTranslation('common');
  return (
    <FooterDrawer>
      <StyledInnerWrapper>
        {errorMessage && (
          <StyledErrorWrapper>
            <ErrorOutline fontSize='small' sx={{ color: theme.palette.error.main }} />
            <StyledErrorLabel variant='label'>{errorMessage}</StyledErrorLabel>
          </StyledErrorWrapper>
        )}

        <StyledContentWrapper>
          <PromoCode />
          <StyledBottom>
            <StyledTypography variant='h2'>
              {t('common:total')} {isLoading ? <StyledSkeleton /> : amount}
            </StyledTypography>
            <StyledButton variant='contained' onClick={onClick} disabled={isButtonDisabled || isLoading}>
              {t('common:checkOut.title')}
            </StyledButton>
          </StyledBottom>
        </StyledContentWrapper>
      </StyledInnerWrapper>
    </FooterDrawer>
  );
};

export default CartFooter;
