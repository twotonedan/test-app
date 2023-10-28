import { Theme } from '@mui/material';
import { CSSProperties, MixinsOptions } from '@mui/material/styles/createMixins';

export default (theme: Theme) =>
  ({
    layout: {
      width: '100%',
      margin: '0 auto',
      paddingLeft: theme.paddings.xs,
      paddingRight: theme.paddings.xs,

      [theme.breakpoints.up('md')]: {
        paddingLeft: theme.paddings.sm,
        paddingRight: theme.paddings.sm,
      } as CSSProperties,
      [theme.breakpoints.up('lg')]: {
        maxWidth: theme.breakpoints.values.lg,
        paddingLeft: theme.paddings.md,
        paddingRight: theme.paddings.md,
      } as CSSProperties,
    },
    resetButton: {
      border: 'none',
      margin: 0,
      padding: 0,
      width: 'auto',
      height: 'auto',
      overflow: 'visible',
      minWidth: 'unset',
      font: 'inherit',
      lineHeight: 'normal',
      WebkitFontSmoothing: 'inherit',
      MozOsxFontSmoothing: 'inherit',
      WebkitAppearance: 'none',
      cursor: 'pointer',
    },
  } as MixinsOptions);
