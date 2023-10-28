import { Components, Theme } from '@mui/material';

const MuiSvgIcon: Components<Omit<Theme, 'components'>>['MuiSvgIcon'] = {
  styleOverrides: {
    colorPrimary: props => ({
      color: `${props.theme.palette.customText.primary}`,
    }),
    colorSecondary: props => ({
      color: `${props.theme.palette.customColors.strongLightBlue}`,
    }),
    colorDisabled: props => ({
      color: `${props.theme.palette.action.disabled}`,
    }),
    colorAction: props => ({
      color: `${props.theme.palette.common.white}`,
    }),
    root: {
      color: 'inherit',
    },
  },
};

export default MuiSvgIcon;
