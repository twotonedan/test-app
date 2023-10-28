import { useMediaQuery } from '@mui/material';
import theme from '@/theme/theme';

const useIsMobile = () => {
  const isMobile: boolean = useMediaQuery(theme.breakpoints.down('md'));
  return isMobile;
};

export default useIsMobile;
