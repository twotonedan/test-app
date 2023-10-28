import { Components, Theme } from '@mui/material';

const MuiSwitch: Components<Omit<Theme, 'components'>>['MuiSwitch'] = {
  styleOverrides: {
    root: {
      margin: '-12px',
    },
    switchBase: props => ({
      '&.Mui-disabled': {
        color: `${props.theme.palette.action.disabled}`,
      },

      '&.Mui-checked': {
        '&.Mui-disabled': {
          color: `${props.theme.palette.action.disabled}`,
        },
      },
    }),
    track: props => ({
      opacity: 1,
      backgroundColor: `${props.theme.palette.customColors.strongGray}`,

      '.Mui-checked.Mui-checked + &': {
        opacity: 0.4,
        backgroundColor: `${props.theme.palette.primary}`,
      },

      '.Mui-disabled.Mui-disabled + &': {
        opacity: 1,
        backgroundColor: `${props.theme.palette.customColors.gray}`,
      },
    }),
  },
};

export default MuiSwitch;
