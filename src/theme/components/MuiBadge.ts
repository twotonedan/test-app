import { Components, Theme } from '@mui/material';

const MuiBadge: Components<Omit<Theme, 'components'>>['MuiBadge'] = {
  styleOverrides: {
    badge: {
      padding: '0 2px',
      fontSize: '10px',
      lineHeight: '10px',
      minWidth: '12px',
      height: '12px',
    },
  },
};

export default MuiBadge;
