import { SupportedIcons } from '@/constants/icons/supportedIcons';
import { IAmenity } from '@/types/cards';
import { Box, styled, SvgIcon, Typography } from '@mui/material';

type Props = IAmenity;

const StyledWrapper = styled(Box)`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-start;
  grid-gap: 4px;
  overflow: hidden;
`;

const StyledLabel = styled(Typography)`
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Amenity = ({ icon, text }: Props) => {
  return (
    <StyledWrapper className='amenity'>
      <SvgIcon component={SupportedIcons[icon]} color='primary' fontSize='small' className='icon' />
      <StyledLabel variant='inherit' className='label'>
        {text}
      </StyledLabel>
    </StyledWrapper>
  );
};

export default Amenity;
