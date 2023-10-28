import { Components, Theme } from '@mui/material';

const MuiListItemIcon: Components<Omit<Theme, 'components'>>['MuiListItemIcon'] = {
  styleOverrides: {
    root: {
      minWidth: '44px',
    },
  },
};

export default MuiListItemIcon;
