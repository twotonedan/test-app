import theme from '@/theme';
import { Box, Divider, styled, Typography } from '@mui/material';
import ColorDisplay, { IColorData } from '../ColorDisplay/ColorDisplay';

const StyledRow = styled(Box)<{ spaced?: boolean }>`
  display: flex;
  grid-gap: ${props => (props.spaced ? '56px' : '24px')};
  margin-top: 24px;
`;

type IColorsContainer = {
  colorsData: IColorData[];
  colorTitle: string;
  isSubcategory?: boolean;
  spaced?: boolean;
};

const ColorsContainer = ({ colorsData, colorTitle, isSubcategory, spaced }: IColorsContainer) => {
  return (
    <Box>
      <Typography
        variant={isSubcategory ? 'h3' : 'h2'}
        fontWeight={600}
        mt={isSubcategory ? '24px' : '48px'}
        color={theme.palette.customText.secondary}
        mb='16px'>
        {colorTitle}
      </Typography>
      <Divider />
      <StyledRow spaced={spaced}>
        {colorsData.map(({ colorName, colorHex }) => {
          return <ColorDisplay key={colorHex} colorName={colorName} colorHex={colorHex} />;
        })}
      </StyledRow>
    </Box>
  );
};

export default ColorsContainer;
