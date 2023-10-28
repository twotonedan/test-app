import theme from '@/theme';
import { Box, IconButton, styled, SvgIcon, Typography } from '@mui/material';
import { ElementType } from 'react';
import { transientOptions } from '@/utils/transientOptions';

const StyledWrapper = styled(IconButton)`
  ${theme.mixins.resetButton}
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledIconWrapper = styled(Box, transientOptions)<{ $isSelected: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 100%;
  background-color: ${theme.palette.customColors.barelyBlue};
  margin-bottom: 8px;

  ${props =>
    props.$isSelected &&
    `
  border: 2px solid ${theme.palette.primary.main};

  ::after {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  content: '';
  border: 2px solid ${theme.palette.common.white};
  border-radius: 100%;
}
  `}
`;

const StyledTypography = styled(Typography, transientOptions)<{ $isSelected: boolean }>`
  max-width: 60px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 20px;
  color: ${theme.palette.customText.secondary};

  ${props =>
    props.$isSelected &&
    `
    color: ${theme.palette.customText.primary};
    font-weight: 500;
  `}
`;

type Props = {
  icon: ElementType;
  name: string;
  handleClick: (categoryName: string) => void;
  isSelected: boolean;
};

const CategoryItem = ({ icon, name, handleClick, isSelected }: Props) => {
  return (
    <StyledWrapper onClick={() => handleClick(name)} disableRipple>
      <StyledIconWrapper $isSelected={isSelected}>
        <SvgIcon
          color='secondary'
          component={icon as unknown as ElementType}
          sx={{ fontSize: '30px' }}
          inheritViewBox
        />
      </StyledIconWrapper>
      <StyledTypography variant='subtitle1' $isSelected={isSelected}>
        {name}
      </StyledTypography>
    </StyledWrapper>
  );
};

export default CategoryItem;
