import { Components, Theme } from '@mui/material';
import MuiCheckbox from './MuiCheckbox';

const MuiRadio: Components<Omit<Theme, 'components'>>['MuiRadio'] = { ...MuiCheckbox };

export default MuiRadio;
