import theme from '@/theme';
import { ILocation } from '@/types/accessories';
import { transientOptions } from '@/utils/transientOptions';
import { Box, Typography, styled } from '@mui/material';
import CheckboxComponent from '../../Checkbox/Checkbox';

const StyledCheckbox = styled(CheckboxComponent, transientOptions)<{ $isSelected: boolean }>`
  border: 1px solid
    ${props => (props.$isSelected ? theme.palette.customInput.borderFilled : theme.palette.customInput.border)};
  border-radius: 8px;
  padding: 8px 4px;
  cursor: pointer;
  width: 100%;
`;

const StyledLocationInformation = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

type Props = {
  isDisabled: boolean;
  isSelected: boolean;
  location: ILocation;
  onClick?: () => void;
  name: string;
};

const LocationCheckbox = ({ location, isSelected, onClick, isDisabled, name }: Props) => {
  return (
    <StyledCheckbox
      $isSelected={isSelected}
      onChange={onClick}
      disabled={isDisabled}
      label={
        <StyledLocationInformation>
          <Typography variant='h4' fontWeight={600}>
            {location.name}
          </Typography>
          <Typography variant='h4'>{location.address}</Typography>
        </StyledLocationInformation>
      }
      checked={isSelected}
      name={`${name}.locations`}
    />
  );
};

export default LocationCheckbox;
