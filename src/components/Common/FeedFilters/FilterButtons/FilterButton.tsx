import { SupportedIcons } from '@/constants/icons/supportedIcons';
import theme from '@/theme/theme';
import { SupportedIconsEnum } from '@/types/enums';
import { transientOptions } from '@/utils/transientOptions';
import { Box, Button, SvgIcon, Typography, styled } from '@mui/material';

const StyledButton = styled(Button, transientOptions)<{
  $fullWidth?: boolean;
  $isCircle?: boolean;
  $hasValue: boolean;
  $isLocation?: boolean;
}>`
  width: ${props => (props.$fullWidth ? '100%' : 'max-content')};
  border: 1px solid
    ${props => (props.$hasValue ? theme.palette.customInput.borderFilled : theme.palette.customInput.border)};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => (props.$isCircle ? '10px' : '4px 16px')};
  min-width: ${props => (props.$isLocation ? 'none' : 'max-content')};
  gap: 4px;
  box-shadow: 0px 1px 2px 0px rgba(42, 51, 60, 0.16);
  background: ${theme.palette.customColors.white};
  height: 40px;
  transition: all 0.3s;
  position: relative;

  &:hover {
    border: 1px solid ${theme.palette.customText.primary};

    p {
      color: ${theme.palette.customText.primary};
    }
  }
`;

const StyledText = styled(Typography, transientOptions)<{ $hasValue?: boolean }>`
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  color: ${props => (props.$hasValue ? theme.palette.customText.primary : theme.palette.customText.secondary)};

  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StyledIconWrapper = styled(Box)`
  color: ${theme.palette.customText.primary};
  display: flex;
  align-items: center;
`;

const StyledOrangeDot = styled(Box)`
  position: absolute;
  top: 0;
  right: 0px;
  width: 12px;
  height: 12px;
  border-radius: 200px;
  background: ${theme.palette.customColors.orangeCarrot};
`;

type Props = {
  value?: string | string[];
  placeholder?: string;
  icon?: SupportedIconsEnum;
  fullWidth?: boolean;
  iconSize?: number;
  onClick: () => void;
  filterSelected?: boolean;
  className?: string;
  isLocationFilter?: boolean;
};

const FilterButton = ({
  value,
  placeholder,
  icon,
  fullWidth,
  iconSize = 16,
  onClick,
  filterSelected,
  className,
  isLocationFilter,
}: Props) => {
  return (
    <StyledButton
      $fullWidth={fullWidth}
      $isCircle={!value && !placeholder}
      onClick={onClick}
      className={className}
      $hasValue={!!value}
      $isLocation={isLocationFilter}>
      {filterSelected && <StyledOrangeDot />}
      {(value || placeholder) && <StyledText $hasValue={!!value}>{value || placeholder}</StyledText>}
      {icon && (
        <StyledIconWrapper>
          <SvgIcon component={SupportedIcons[icon]} sx={{ fontSize: `${iconSize}px` }} inheritViewBox />
        </StyledIconWrapper>
      )}
    </StyledButton>
  );
};

export default FilterButton;
