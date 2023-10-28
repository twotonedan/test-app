import theme from '@/theme';

export const COLORS_DATA = {
  TEXT_COLORS: [
    { colorName: 'Primary Text', colorHex: theme.palette.customText.primary },
    { colorName: 'Secondary Text', colorHex: theme.palette.customText.secondary },
  ],
  BACKGROUND_COLORS: [{ colorName: 'White Foam', colorHex: theme.palette.common.white }],
  ICONS_COLORS: [{ colorName: 'Icons', colorHex: theme.palette.customText.secondary }],
  DIVIDERS_COLORS: [{ colorName: 'Dividers', colorHex: theme.palette.customColors.gray }],
  ALERTS_COLORS: [
    { colorName: 'Error', colorHex: theme.palette.error.main },
    { colorName: 'Success', colorHex: theme.palette.success.main },
  ],
  BUTTONS_COLORS: {
    primaryColors: [
      { colorName: 'Text', colorHex: theme.palette.common.white },
      { colorName: 'Background/Enabled', colorHex: theme.palette.primary.main },
      { colorName: 'Background/Hovered', colorHex: theme.palette.primary.dark },
      { colorName: 'Background/ Focused & Pressed', colorHex: theme.palette.customButtons.primary.backgroundFocus },
      { colorName: 'Text/Disabled', colorHex: theme.palette.action.disabled },
      { colorName: 'Background/Disabled', colorHex: theme.palette.action.disabledBackground },
    ],
    secondaryColors: [
      { colorName: 'Text & Stroke', colorHex: theme.palette.primary.main },
      { colorName: 'Background/Enabled', colorHex: theme.palette.common.white },
      { colorName: 'Background/Hovered', colorHex: theme.palette.customButtons.secondary.backgroundHover },
      { colorName: 'Background/ Focused & Pressed', colorHex: theme.palette.customButtons.secondary.backgroundFocus },
      { colorName: 'Text/Disabled', colorHex: theme.palette.action.disabled },
      { colorName: 'Stroke/Disabled', colorHex: theme.palette.action.disabledBackground },
    ],
  },
  INPUTS_COLORS: [
    { colorName: 'Text', colorHex: theme.palette.customText.primary },
    { colorName: 'Border/Enabled', colorHex: theme.palette.customInput.border },
    { colorName: 'Border/Focused', colorHex: theme.palette.primary.main },
    { colorName: 'Border/Filled', colorHex: theme.palette.customInput.borderFilled },
    { colorName: 'Text/Disabled', colorHex: theme.palette.action.disabled },
    { colorName: 'Border/Disabled', colorHex: theme.palette.action.disabledBackground },
    { colorName: 'Error', colorHex: theme.palette.error.main },
  ],
};
