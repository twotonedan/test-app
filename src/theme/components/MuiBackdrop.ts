import { alpha, Components, Theme } from '@mui/material';

const MuiBackdrop: Components<Omit<Theme, 'components'>>['MuiBackdrop'] = {
  styleOverrides: {
    invisible: () => ({
      backgroundColor: 'transparent',
    }),
    root: ({ theme }) => ({
      backgroundColor: alpha(theme.palette.customBackdrop.background, 0.75),
    }),
  },
};

export default MuiBackdrop;
