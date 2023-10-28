import { Box, Typography, styled } from '@mui/material';
import theme from '@/theme/theme';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

const StyledWrapper = styled(Box)`
  display: flex;
  gap: 4px;
  align-items: center;
`;

const StyledLocationIcon = styled(LocationOnOutlinedIcon)`
  color: ${theme.palette.customText.secondary};
  width: 20px;
  height: 20px;
  margin-left: -4px;
`;

type Props = {
  locationName: string;
};

const BookingLocation = ({ locationName }: Props) => {
  return (
    <StyledWrapper>
      <StyledLocationIcon />
      <Typography variant='subtitle1'>{locationName}</Typography>
    </StyledWrapper>
  );
};

export default BookingLocation;
