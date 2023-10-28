import { Components, Theme } from '@mui/material';

const MuiDialog: Components<Omit<Theme, 'components'>>['MuiDialog'] = {
  styleOverrides: {
    root: () => ({
      '& .MuiPaper-root': {
        borderRadius: '16px',
      },
    }),
  },
};

export default MuiDialog;
