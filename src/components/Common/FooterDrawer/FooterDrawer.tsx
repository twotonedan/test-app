import theme from '@/theme/theme';
import { Paper, alpha, styled } from '@mui/material';
import { ReactNode } from 'react';

const StyledWrapper = styled(Paper)`
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 2;
  padding: 16px 0;
  background: ${() => alpha(theme.palette.background.default, 0.8)};
  backdrop-filter: blur(2px);
  border-radius: 0;
  margin-top: auto;
`;

type Props = {
  children: ReactNode;
  className?: string;
  elevation?: number;
};

const FooterDrawer = ({ children, className, elevation = 3 }: Props) => {
  return (
    <StyledWrapper elevation={elevation} className={className}>
      {children}
    </StyledWrapper>
  );
};

export default FooterDrawer;
