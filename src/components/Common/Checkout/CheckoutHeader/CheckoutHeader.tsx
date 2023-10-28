import { styled } from '@mui/material';
import theme from '@/theme/theme';
import DesktopHeader from '@/components/Sections/Common/Header/DesktopHeader';
import NavLinksWithCart from '@/components/Sections/Common/Header/NavLinksWithCart';
import { useTranslation } from 'next-i18next';

import MobileCheckoutHeader from './MobileCheckoutHeader';

const StyledDesktopHeader = styled(DesktopHeader)`
  display: none;

  ${theme.breakpoints.up('lg')} {
    display: flex;
  }
`;

const CheckoutHeader = () => {
  const { t } = useTranslation();
  return (
    <>
      <StyledDesktopHeader rightComponent={<NavLinksWithCart desktopBackCartText={t('checkOut.title')} />} withShadow />
      <MobileCheckoutHeader />
    </>
  );
};

export default CheckoutHeader;
