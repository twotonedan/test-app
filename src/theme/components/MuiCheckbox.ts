import { Components, Theme } from '@mui/material';

const MuiCheckbox: Components<Omit<Theme, 'components'>>['MuiCheckbox'] = {
  styleOverrides: {
    colorPrimary: props => ({
      color: `${props.theme.palette.customText.primary}`,
    }),
    root: props => ({
      ...(props.ownerState.size === 'small' && {
        padding: '6px',
      }),
      '& .MuiSvgIcon-root': {
        ...(props.ownerState.disabled && {
          color: `${props.theme.palette.action.disabledBackground}`,
        }),
      },
    }),
  },
};

export default MuiCheckbox;
