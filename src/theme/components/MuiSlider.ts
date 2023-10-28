import { Components, Theme } from '@mui/material';

const MuiSlider: Components<Omit<Theme, 'components'>>['MuiSlider'] = {
  styleOverrides: {
    mark: props => ({
      color: `${
        (props.ownerState.disabled && props.theme.palette.action.disabled) || props.theme.palette.customText.secondary
      }`,
    }),
    root: props => ({
      padding: '0px !important',
      '& .MuiSlider-valueLabel': {
        background: `${props.theme.palette.customText.secondary}`,
        fontWeight: 400,
        fontSize: '12px',
        lineHeight: '16px',
      },
      '& .MuiSlider-markActive': {
        backgroundClor: `${props.theme.palette.common.white}`,
      },
      '&.Mui-disabled': {
        '& .MuiSlider-markActive': {
          backgroundColor: `${props.theme.palette.customText.primary}`,
        },
        color: `${props.theme.palette.action.disabled}`,
      },
      '&.MuiSlider-mark': {
        backgroundColor: 'red',
      },
    }),
  },
};

export default MuiSlider;
