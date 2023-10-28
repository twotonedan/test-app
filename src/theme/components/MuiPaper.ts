import { Components, Theme } from '@mui/material';

const MuiPaper: Components<Omit<Theme, 'components'>>['MuiPaper'] = {
  styleOverrides: {
    root: props => ({
      borderRadius: '8px',

      '& .MuiList-root': {
        maxHeight: '200px',
        padding: '8px',
      },

      '& .MuiMenuItem-root': {
        padding: '10px 8px',
        fontWeight: 400,
        fontSize: '14px',
        lineHeight: '20px',
        color: `${props.theme.palette.customText.primary}`,
        borderRadius: '4px',
        ':hover': {
          background: `${props.theme.palette.customColors.barelyBlue}`,
        },
      },
    }),
  },
};

export default MuiPaper;
