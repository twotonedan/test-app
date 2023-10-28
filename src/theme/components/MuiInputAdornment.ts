import { Components, Theme } from '@mui/material';

const MuiInputAdornment: Components<Omit<Theme, 'components'>>['MuiInputAdornment'] = {
  styleOverrides: {
    root: {
      '& .MuiSvgIcon-root': {
        maxHeight: '20px',
        maxWidth: '20px',
      },
    },
  },
};

export default MuiInputAdornment;
