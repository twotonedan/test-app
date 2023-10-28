import { Breakpoint } from '@mui/material';
import { MixinsOptions } from '@mui/material/styles/createMixins';
import '@mui/material/styles/createPalette';

declare module '@mui/material/styles/createPalette' {
  export interface Palette {
    customText: {
      primary: string;
      secondary: string;
    };
    customButtons: {
      primary: {
        backgroundFocus: string;
      };
      secondary: {
        backgroundHover: string;
        backgroundFocus: string;
      };
      viewList: {
        private: string;
        default: string;
        standard: string;
      };
    };
    customInput: {
      border: string;
      borderFilled: string;
    };
    customBackdrop: {
      background: string;
    };
    customColors: {
      lightGray: string;
      lightGreen: string;
      smoothGray: string;
      gray: string;
      strongGray: string;
      barelyBlue: string;
      lapisLazuli: string;
      strongLightBlue: string;
      steelBlue: string;
      lightBlack: string;
      labelGray: string;
      orangeCarrot: string;
      white: string;
      tabGray: string;
      paleGray: string;
      strongGreen: string;
      activeGreen: string;
    };
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface PaletteOptions extends Palette {}
}

declare module '@mui/material/Typography/typographyClasses' {
  export interface TypographyClasses {
    label: string;
  }
}

declare module '@mui/material/Typography/Typography' {
  export interface TypographyPropsVariantOverrides {
    label: true;
  }
}

declare module '@mui/material/styles/createMixins' {
  export interface MixinsOptions {
    layout: CSSProperties;
    resetButton: CSSProperties;
  }
}

declare module '@mui/material/styles/createTheme' {
  export interface ThemeOptions {
    paddings: {
      [k in Breakpoint]?: string;
    };
  }

  export interface Theme extends ThemeOptions {
    mixins: MixinsOptions;
  }
}
