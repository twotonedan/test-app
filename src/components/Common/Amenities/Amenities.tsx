import { IAmenity } from '@/types/cards';
import { Box, styled } from '@mui/material';
import Amenity from './Amenity';

type Props = {
  amenities: IAmenity[];
  className?: string;
};

const StyledWrapper = styled(Box)`
  width: 100%;
  display: grid;
  justify-content: space-between;
  gap: 10px;
`;

const Amenities = ({ amenities, className }: Props) => {
  return (
    <StyledWrapper className={className}>
      {amenities.map(amenity => {
        return <Amenity key={amenity.id} {...amenity} />;
      })}
    </StyledWrapper>
  );
};

export default Amenities;
