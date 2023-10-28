import { Components, Theme } from '@mui/material';

const MuiChip: Components<Omit<Theme, 'components'>>['MuiChip'] = {
  styleOverrides: {
    sizeMedium: {
      '& .MuiChip-label': {
        paddingLeft: '8px',
      },
    },
    root: props => ({
      fontWeight: 500,
      fontSize: '14px',
      lineHeight: '20px',
      '&.Mui-disabled': {
        opacity: 1,
      },
      background: `${
        (props.ownerState.disabled && props.theme.palette.action.disabledBackground) ||
        props.theme.palette.customColors.barelyBlue
      }`,
      color: `${
        (props.ownerState.disabled && props.theme.palette.action.disabled) || props.theme.palette.customText.primary
      }`,
      ...(props.ownerState.clickable && {
        ':hover': {
          background: `linear-gradient(0deg, rgba(0, 0, 0, 0.08), rgba(0, 0, 0, 0.08)), #EBF8FF`,
        },
        ':active': {
          background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.16), rgba(0, 0, 0, 0.16)), #EBF8FF',
          boxShadow: '0px 4px 8px 3px rgba(0, 0, 0, 0.15), 0px 1px 3px rgba(0, 0, 0, 0.3)',
        },
      }),

      animation: 'none',
      '& .MuiSvgIcon-root': {
        color: `${
          (props.ownerState.disabled && props.theme.palette.action.disabled) ||
          props.theme.palette.customColors.lapisLazuli
        }`,
        fontSize: '20px',
        ':hover': {
          color: props.theme.palette.customColors.lapisLazuli,
        },
      },
      '& .MuiChip-icon': {
        marginLeft: '8px',
        marginRight: '-3px',
      },
      '& .MuiChip-deleteIcon': {
        marginLeft: '-7px',
        marginRight: '8px',
      },
    }),
  },
};

export default MuiChip;
