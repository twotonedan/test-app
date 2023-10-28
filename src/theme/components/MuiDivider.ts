import { Components, Theme } from '@mui/material';

const MuiDivider: Components<Omit<Theme, 'components'>>['MuiDivider'] = {
  styleOverrides: {
    root: props => ({
      borderColor: `${props.theme.palette.customColors.gray}`,
    }),
  },
};

export default MuiDivider;
