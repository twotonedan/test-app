import { Components, Theme } from '@mui/material';

const MuiList: Components<Omit<Theme, 'components'>>['MuiList'] = {
  styleOverrides: {
    root: {
      padding: 'unset !important',
    },
  },
};

export default MuiList;
