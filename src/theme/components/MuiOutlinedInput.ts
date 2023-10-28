import { Components, Theme } from '@mui/material';

const MuiOutlinedInput: Components<Omit<Theme, 'components'>>['MuiOutlinedInput'] = {
  styleOverrides: {
    root: props => ({
      borderRadius: '8px',
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: '20px',

      ...(props.ownerState.error && {
        '& .MuiSvgIcon-root': {
          color: 'red',
        },
      }),

      '& .MuiBackdrop-root': {
        backgroundColor: 'transparent',
      },

      ...(props.ownerState.disabled && {
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: `${props.theme.palette.action.disabledBackground} !important`,
        },
      }),
      ...(!!props.ownerState.value && {
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: `${props.theme.palette.customInput.borderFilled}`,
        },
      }),

      '& ::-webkit-scrollbar': {
        display: 'none',
      },
      msOverflowStyle: 'none',
      scrollbarWidth: 'none',
    }),
  },
};

export default MuiOutlinedInput;
