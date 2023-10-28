import theme from '@/theme/theme';
import { Box, styled } from '@mui/material';
import { ReactNode } from 'react';

const StyledWrapper = styled(Box)`
  ${theme.mixins.layout}
  height: 100%;
  flex-grow: 1;
  align-items: flex-start;
  justify-content: flex-start;

  ${theme.breakpoints.up('lg')} {
    padding-right: 24px;
    width: 100%;
  }
`;

type Props = {
  children: ReactNode;
  className?: string;
};

const LeftDesktopWrapper = ({ children, className }: Props) => {
  return <StyledWrapper className={className}>{children}</StyledWrapper>;
};

export default LeftDesktopWrapper;
