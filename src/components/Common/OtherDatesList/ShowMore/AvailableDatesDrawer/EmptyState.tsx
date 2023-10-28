import theme from '@/theme';
import { Box, Button, styled, Typography } from '@mui/material';
import { ReactElement } from 'react';

const StyledWrapper = styled(Box)`
  background-color: ${theme.palette.customColors.lightGray};
  border-radius: 12px;
  margin: 16px 0 24px;
  height: 100%;
  padding: 24px;
  width: 100%;

  ${theme.breakpoints.up('md')} {
    border-radius: 0;
  }
`;

const StyledSubWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;

  ${theme.breakpoints.up('md')} {
    margin-top: 104px;
    height: auto;
  }
`;

const StyledTitle = styled(Typography)`
  font-weight: 600;
  line-height: 26px;
  margin: 32px 0 8px;
`;

const StyledSubtitle = styled(Typography)`
  font-size: 16px;
  line-height: 22px;
  color: ${theme.palette.customColors.labelGray};
`;

const StyledButton = styled(Button)`
  margin-top: 24px;

  ${theme.breakpoints.up('md')} {
    max-width: max-content;
  }
`;

type Props = {
  className?: string;
  icon: ReactElement;
  title: string;
  subTitle: string;
  buttonLabel?: string;
  onButtonClick?: () => void;
};

const EmptyState = ({ className, icon, subTitle, title, buttonLabel, onButtonClick }: Props) => {
  return (
    <StyledWrapper className={className}>
      <StyledSubWrapper>
        {icon}
        <StyledTitle variant='h2'>{title}</StyledTitle>
        <StyledSubtitle variant='subtitle1'>{subTitle}</StyledSubtitle>
        {buttonLabel && (
          <StyledButton fullWidth variant='contained' onClick={onButtonClick}>
            {buttonLabel}
          </StyledButton>
        )}
      </StyledSubWrapper>
    </StyledWrapper>
  );
};

export default EmptyState;
