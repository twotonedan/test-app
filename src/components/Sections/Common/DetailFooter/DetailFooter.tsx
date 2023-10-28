import FooterDrawer from '@/components/Common/FooterDrawer';

import theme from '@/theme';
import { ErrorOutline } from '@mui/icons-material';
import { styled, Typography, Button, Box, Skeleton } from '@mui/material';
import { useTranslation } from 'next-i18next';

const StyledTotal = styled(Typography)`
  display: none;

  ${theme.breakpoints.up('md')} {
    display: flex;
    gap: 8px;
  }
`;

const StyledMobileTotal = styled(Box)`
  display: flex;
  justify-content: space-between;
  width: 100%;

  ${theme.breakpoints.up('md')} {
    display: none;
  }
`;

const StyledTitle = styled(Typography)``;
const StyledAmount = styled(Typography)``;

const StyledButton = styled(Button)`
  width: 100%;

  ${theme.breakpoints.up('md')} {
    width: auto;
  }
`;

const StyledInnerWrapper = styled(Box)`
  ${theme.mixins.layout}
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  gap: 8px;

  ${theme.breakpoints.up('md')} {
    padding-top: 17px;
    padding-bottom: 17px;
  }

  ${theme.breakpoints.up('md')} {
    padding-top: 23px;
    padding-bottom: 23px;
  }
`;

const StyledContentWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;

  ${theme.breakpoints.up('md')} {
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const StyledErrorWrapper = styled(Box)`
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

const StyledAdded = styled(Typography)`
  color: ${theme.palette.customText.secondary};
`;

type Props = {
  title: string;
  amount: string;
  buttonText: string;
  isLoading?: boolean;
  onClick?: () => void;
  isButtonDisabled?: boolean;
  errorMessage?: string;
  quantityAdded?: number;
};

const DetailFooter = ({
  title,
  isLoading,
  amount,
  buttonText,
  onClick,
  isButtonDisabled,
  errorMessage,
  quantityAdded,
}: Props) => {
  const { t } = useTranslation();

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
          <StyledTotal variant='h2' fontWeight={600}>
            {title} {isLoading ? <StyledSkeleton /> : amount}
            {quantityAdded && (
              <StyledAdded variant='h2' fontWeight={600} as='span'>{`(${quantityAdded} ${t('added')})`}</StyledAdded>
            )}
          </StyledTotal>

          <StyledMobileTotal>
            <StyledTitle variant='h2' fontWeight={600}>
              {title}
            </StyledTitle>
            <StyledAmount variant='h2' fontWeight={600}>
              {isLoading ? <StyledSkeleton /> : amount}
            </StyledAmount>
          </StyledMobileTotal>

          <StyledButton variant='contained' onClick={onClick} disabled={isButtonDisabled || isLoading}>
            {buttonText}
          </StyledButton>
        </StyledContentWrapper>
      </StyledInnerWrapper>
    </FooterDrawer>
  );
};

export default DetailFooter;
