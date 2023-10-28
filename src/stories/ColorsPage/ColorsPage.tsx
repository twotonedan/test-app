import theme from '@/theme';
import { Box, Divider, Typography } from '@mui/material';
import ColorsContainer from './ColorsContainer';
import { COLORS_DATA } from './COLORS_DATA';

const ColorsPage = () => {
  return (
    <Box padding='32px 64px 48px 48px'>
      <Typography variant='h1' color={theme.palette.customText.secondary} mb='28px'>
        Component Colors
      </Typography>
      <Divider />
      <ColorsContainer colorsData={COLORS_DATA.TEXT_COLORS} colorTitle='Text' />
      <ColorsContainer colorsData={COLORS_DATA.BACKGROUND_COLORS} colorTitle='Background' />
      <ColorsContainer colorsData={COLORS_DATA.ICONS_COLORS} colorTitle='Icons' />
      <ColorsContainer colorsData={COLORS_DATA.DIVIDERS_COLORS} colorTitle='Dividers' />
      <ColorsContainer colorsData={COLORS_DATA.ALERTS_COLORS} colorTitle='Alerts' />
      <Typography variant='h2' fontWeight={600} color={theme.palette.customText.secondary} mb='28px' mt='64px'>
        Buttons
      </Typography>
      <Divider />
      <ColorsContainer
        colorsData={COLORS_DATA.BUTTONS_COLORS.primaryColors}
        colorTitle='Primary'
        isSubcategory
        spaced
      />
      <ColorsContainer
        colorsData={COLORS_DATA.BUTTONS_COLORS.secondaryColors}
        colorTitle='Secondary'
        isSubcategory
        spaced
      />
      <ColorsContainer colorsData={COLORS_DATA.INPUTS_COLORS} colorTitle='Inputs' spaced />
    </Box>
  );
};

export default ColorsPage;
