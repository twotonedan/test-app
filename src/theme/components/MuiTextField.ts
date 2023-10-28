import { Components, Theme } from '@mui/material';

const MuiTextField: Components<Omit<Theme, 'components'>>['MuiTextField'] = {
  styleOverrides: {
    root: props => ({
      '& .close-button': {
        cursor: `${!props.ownerState.disabled ? 'pointer' : 'default'}`,
      },
      '& .MuiFormHelperText-root': {
        marginTop: '2px',
        color: `${
          (props.ownerState.disabled && props.theme.palette.action.disabledBackground) ||
          (!props.ownerState.error && props.theme.palette.customText.primary) ||
          ''
        }`,
      },
      ...(props.ownerState.InputProps?.startAdornment && {
        '& .MuiInputLabel-root': {
          paddingLeft: `${!props.ownerState.InputLabelProps?.shrink ? '30px' : ''}`,
        },
      }),
    }),
  },
};

export default MuiTextField;
