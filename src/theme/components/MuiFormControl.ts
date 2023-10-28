import { Components, Theme } from '@mui/material';

const MuiFormControl: Components<Omit<Theme, 'components'>>['MuiFormControl'] = {
  styleOverrides: {
    root: props => ({
      '& .MuiInputLabel-shrink': {
        ...(props.ownerState.error
          ? {
              color: 'red',
            }
          : {
              ':not(.Mui-focused)': {
                color: `${props.theme.palette.customText.primary}`,
              },
            }),
      },
    }),
  },
};

export default MuiFormControl;
