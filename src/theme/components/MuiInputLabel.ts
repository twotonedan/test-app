import { Components, Theme } from '@mui/material';

const MuiInputLabel: Components<Omit<Theme, 'components'>>['MuiInputLabel'] = {
  styleOverrides: {
    root: props => ({
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: '20px',
      transition: 'all ease-out 0.1s',
      color: `${props.theme.palette.customText.secondary}`,
    }),
  },
};

export default MuiInputLabel;
