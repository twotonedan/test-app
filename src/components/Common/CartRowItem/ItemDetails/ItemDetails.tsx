import { Box, Typography, styled } from '@mui/material';
import { IQuantityLimits } from '@/types/common';
import { useCurrencyFormatter } from '@/hooks/contexts/useCurrencyFormatter';
import { ILocation } from '@/types/accessories';
import theme from '@/theme/theme';
import QuantityCounter from '../../QuantityCounter/QuantityCounter';
import EditLocationButton from '../../Upsell/UpsellModal/EditLocationButton';

const StyledRow = styled(Box)`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`;

const StyledQuantityCounter = styled(QuantityCounter)`
  height: 32px;
  ${theme.breakpoints.up('lg')} {
    height: 40px;
  }
`;

const StyledPrice = styled(Typography)`
  font-size: 16px;
  line-height: 22px;
  font-weight: 600;
  ${theme.breakpoints.up('lg')} {
    font-size: 18px;
  }
`;

const StyledEditLocationButton = styled(EditLocationButton)`
  width: unset;
  padding: 4px 0;
`;

type Props = {
  quantity: number;
  limits: IQuantityLimits;
  handleAddClick: (quantity: number) => void;
  handleRemoveClick: (quantity: number) => void;
  price: number;
  isLocationType?: boolean;
  selectedLocation?: ILocation;
  handleEditLocation: () => void;
};

const ItemDetails = ({
  quantity,
  limits,
  handleAddClick,
  handleRemoveClick,
  price,
  isLocationType,
  selectedLocation,
  handleEditLocation,
}: Props) => {
  const { currencyFormatter } = useCurrencyFormatter();

  return (
    <StyledRow className='bottom-row'>
      {isLocationType ? (
        <StyledEditLocationButton onClick={handleEditLocation} selectedLocation={selectedLocation} />
      ) : (
        <StyledQuantityCounter
          sizeSmall
          quantity={quantity}
          limits={limits}
          handleAddClick={handleAddClick}
          handleRemoveClick={handleRemoveClick}
          disableSubstract
          hideTrash
        />
      )}

      <StyledPrice>{currencyFormatter.format(price)}</StyledPrice>
    </StyledRow>
  );
};

export default ItemDetails;
