import { Components, Theme } from '@mui/material';

const MuiListItem: Components<Omit<Theme, 'components'>>['MuiListItem'] = {
  styleOverrides: {
    root: {
      paddingLeft: '8px',
      paddingRight: '8px',
    },
  },
};

export default MuiListItem;
