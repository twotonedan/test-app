import { Components, Theme } from '@mui/material';

const MuiIconButton: Components<Omit<Theme, 'components'>>['MuiIconButton'] = {
  styleOverrides: {
    root: {
      padding: '6px',
      margin: '-6px',
    },
  },
};

export default MuiIconButton;
