import { Components, Theme } from '@mui/material';

const MuiInputBase: Components<Omit<Theme, 'components'>>['MuiInputBase'] = {
  styleOverrides: {
    sizeSmall: {
      height: '40px',
    },
    root: {},
  },
};

export default MuiInputBase;
