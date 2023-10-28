import { Components, Theme } from '@mui/material';

const MuiFormControlLabel: Components<Omit<Theme, 'components'>>['MuiFormControlLabel'] = {
  styleOverrides: {
    label: props => ({
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: '20px',
      color: props.theme.palette.customText.primary,
    }),
    root: {
      margin: 'unset',
    },
  },
};

export default MuiFormControlLabel;
