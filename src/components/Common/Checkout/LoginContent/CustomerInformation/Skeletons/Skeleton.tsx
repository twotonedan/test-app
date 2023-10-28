import { Box, Skeleton as MUISkeleton, styled } from '@mui/material';

const StyledWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-gap: 8px;
  width: 100%;
`;

const Skeleton = () => {
  return (
    <StyledWrapper>
      <MUISkeleton variant='rounded' width='100%' height={50} />
      <MUISkeleton variant='rounded' width='100%' height={80} />
    </StyledWrapper>
  );
};

export default Skeleton;
