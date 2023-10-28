import { useMediaQuery } from '@mui/material';
import theme from '@/theme/theme';

const useIsDesktop = () => {
  const isDesktop: boolean = useMediaQuery(theme.breakpoints.up('lg'));
  return isDesktop;
};

export default useIsDesktop;
