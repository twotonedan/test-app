import theme from '@/theme/theme';
import { Box, styled } from '@mui/material';
import Skeleton from './Skeleton';

const StyledWrapper = styled(Box)`
  ${theme.mixins.layout}
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-gap: 16px;
`;

const Skeletons = () => (
  <StyledWrapper>
    <Skeleton />
    <Skeleton />
  </StyledWrapper>
);

export default Skeletons;
