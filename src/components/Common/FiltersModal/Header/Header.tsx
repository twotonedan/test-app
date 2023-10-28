import theme from '@/theme';
import { CloseRounded } from '@mui/icons-material';
import { Box, IconButton, styled, Typography } from '@mui/material';

const StyledWrapper = styled(Box)`
  ${theme.mixins.layout}
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  padding-right: 16px !important;
  padding-left: 16px !important;
`;

type Props = {
  onClose: () => void;
  title: string;
  className?: string;
};

const Header = ({ onClose, title, className }: Props) => {
  return (
    <StyledWrapper component='header' className={className}>
      <Typography variant='h2' sx={{ lineHeight: '26px' }}>
        {title}
      </Typography>
      <IconButton onClick={onClose}>
        <CloseRounded color='primary' />
      </IconButton>
    </StyledWrapper>
  );
};

export default Header;
