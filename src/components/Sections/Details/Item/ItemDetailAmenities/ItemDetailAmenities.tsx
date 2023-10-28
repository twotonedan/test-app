import Amenities from '@/components/Common/Amenities/Amenities';
import theme from '@/theme/theme';
import { IAmenity } from '@/types/cards';
import { Box, styled } from '@mui/material';

type Props = {
  amenities: IAmenity[];
};

const StyledSection = styled(Box)`
  ${theme.mixins.layout}
`;

const StyledAmenitiesWrapper = styled(Amenities)`
  justify-content: unset;
  grid-template-columns: repeat(auto-fill, minmax(92px, 1fr));
  gap: 16px;
  padding: 16px;
  border: 1px solid ${theme.palette.customInput.border};
  border-radius: 12px;
  margin-top: 16px;

  ${theme.breakpoints.up('md')} {
    margin-top: 24px;
  }

  ${theme.breakpoints.up('lg')} {
    max-width: 755px;
  }

  > .amenity {
    .icon {
      font-size: 24px;
    }

    .label {
      font-size: 14px;
      line-height: 20px;
    }
  }
`;

const ItemDetailAmenities = ({ amenities }: Props) => {
  return (
    <StyledSection component='section'>
      <StyledAmenitiesWrapper amenities={amenities} />
    </StyledSection>
  );
};

export default ItemDetailAmenities;
