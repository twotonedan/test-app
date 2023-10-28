import { useCurrencyFormatter } from '@/hooks/contexts/useCurrencyFormatter';
import theme from '@/theme';
import { ILocation } from '@/types/accessories';
import { transientOptions } from '@/utils/transientOptions';
import { Box, Divider, Typography, styled } from '@mui/material';

const StyledLocationButton = styled(Box, transientOptions)<{ $isSelected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid
    ${props => (props.$isSelected ? theme.palette.customInput.borderFilled : theme.palette.customInput.border)};
  border-radius: 8px;
  padding: 8px 16px;
  cursor: pointer;
`;

const StyledRightWrapper = styled(Box)``;

const StyledLocationName = styled(Typography, transientOptions)<{ $isSelected: boolean }>`
  color: ${props => (props.$isSelected ? theme.palette.customText.primary : theme.palette.customText.secondary)};
`;

const StyledLocationPrice = styled(Typography, transientOptions)<{ $isSelected: boolean }>`
  color: ${props => (props.$isSelected ? theme.palette.customText.primary : theme.palette.customText.secondary)};
  padding-left: 8px;
  border-left: 1px solid
    ${props => (props.$isSelected ? theme.palette.customText.primary : theme.palette.customColors.gray)};
`;

type Props = {
  isSelected: boolean;
  location: ILocation;
  onClick?: () => void;
};

const LocationItemWithPrices = ({ isSelected, location, onClick }: Props) => {
  const { currencyFormatter } = useCurrencyFormatter();

  return (
    <StyledLocationButton $isSelected={isSelected} onClick={onClick}>
      <StyledLocationName variant='h4' fontWeight={600} $isSelected={isSelected}>
        {location.name}
      </StyledLocationName>

      <StyledRightWrapper>
        <Divider orientation='vertical' />
        <StyledLocationPrice variant='label' fontWeight={500} $isSelected={isSelected}>
          {currencyFormatter.format(location.price)}
        </StyledLocationPrice>
      </StyledRightWrapper>
    </StyledLocationButton>
  );
};

export default LocationItemWithPrices;
