import { Components, Theme } from '@mui/material';

const MuiAlert: Components<Omit<Theme, 'components'>>['MuiAlert'] = {
  styleOverrides: {
    filledSuccess: props => ({
      color: props.theme.palette.customColors.white,
      background: 'rgba(42, 51, 60, 0.80)',
    }),
    root: () => ({
      borderRadius: '8px',
      backdropFilter: 'blur(2px)',
    }),
  },
};

export default MuiAlert;
