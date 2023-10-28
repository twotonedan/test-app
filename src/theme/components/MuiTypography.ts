import { Components, Theme } from '@mui/material';

const MuiTypography: Components<Omit<Theme, 'components'>>['MuiTypography'] = {
  styleOverrides: {
    root: props => ({
      color: `${props.theme.palette.customText.primary}`,
    }),
    h1: {
      fontSize: 24,
      fontWeight: 600,
      lineHeight: '30px',
    },
    h2: {
      fontSize: 20,
      fontWeight: 400,
      lineHeight: '25px',
    },
    h3: {
      fontSize: 18,
      fontWeight: 400,
      lineHeight: '24px',
    },
    h4: {
      fontSize: 14,
      fontWeight: 400,
      lineHeight: '20px',
    },
    subtitle1: {
      fontSize: 14,
      fontWeight: 400,
      lineHeight: '14px',
    },
    subtitle2: {
      fontSize: 10,
      fontWeight: 600,
      lineHeight: '16px',
    },
    label: {
      fontSize: 12,
      fontWeight: 400,
      lineHeight: '16px',
    },
  },
};

export default MuiTypography;
