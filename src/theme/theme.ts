import { deepmerge } from '@mui/utils';
import { createTheme } from '@mui/material';
import { Maven_Pro } from 'next/font/google';
import getMixins from './utils/getMixins';
import MuiTypography from './components/MuiTypography';
import MuiAlert from './components/MuiAlert';
import MuiButton from './components/MuiButton';
import MuiDivider from './components/MuiDivider';
import MuiSwitch from './components/MuiSwitch';
import MuiInputAdornment from './components/MuiInputAdornment';
import MuiInputLabel from './components/MuiInputLabel';
import MuiTextField from './components/MuiTextField';
import MuiCheckbox from './components/MuiCheckbox';
import MuiRadio from './components/MuiRadio';
import MuiChip from './components/MuiChip';
import MuiSlider from './components/MuiSlider';
import MuiSvgIcon from './components/MuiSvgIcon';
import MuiIconButton from './components/MuiIconButton';
import MuiListItem from './components/MuiListItem';
import MuiListItemIcon from './components/MuiListItemIcon';
import MuiList from './components/MuiList';
import MuiBackdrop from './components/MuiBackdrop';
import MuiInputBase from './components/MuiInputBase';
import MuiFormControl from './components/MuiFormControl';
import MuiSelect from './components/MuiSelect';
import MuiOutlinedInput from './components/MuiOutlinedInput';
import MuiPaper from './components/MuiPaper';
import palette from './utils/palette';
import MuiFormControlLabel from './components/MuiFormControlLabel';
import MuiBadge from './components/MuiBadge';
import MuiDialog from './components/MuiDialog';
import 'swiper/swiper.css';
import 'swiper/css/mousewheel';
import 'swiper/css/navigation';
import 'swiper/css/virtual';
import 'swiper/css/pagination';
import 'swiper/css/zoom';

export const mavenPro = Maven_Pro({ preload: true, display: 'block', subsets: ['latin'] });

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 375,
      md: 768,
      lg: 1440,
      xl: 2560,
    },
  },
  paddings: {
    xs: '16px',
    sm: '32px',
    md: '65px',
    lg: '200px',
  },
  typography: {
    fontFamily: mavenPro.style.fontFamily,
  },
  palette,
  components: {
    MuiAlert,
    MuiTypography,
    MuiButton,
    MuiDivider,
    MuiSwitch,
    MuiInputAdornment,
    MuiInputLabel,
    MuiTextField,
    MuiCheckbox,
    MuiRadio,
    MuiChip,
    MuiSlider,
    MuiSvgIcon,
    MuiIconButton,
    MuiListItem,
    MuiListItemIcon,
    MuiList,
    MuiBackdrop,
    MuiInputBase,
    MuiFormControl,
    MuiFormControlLabel,
    MuiSelect,
    MuiOutlinedInput,
    MuiPaper,
    MuiBadge,
    MuiDialog,
  },
  transitions: {
    duration: {
      enteringScreen: 300,
      leavingScreen: 300,
    },
  },
});

export default deepmerge(theme, { mixins: getMixins(theme) });
