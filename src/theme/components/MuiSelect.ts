import { Components, Theme } from '@mui/material';

const MuiSelect: Components<Omit<Theme, 'components'>>['MuiSelect'] = {
  styleOverrides: {
    icon: {
      fontSize: '20px',
    },
    select: props => ({
      color: `${props.theme.palette.customText.primary}`,
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: '20px',
    }),
  },
};

export default MuiSelect;
