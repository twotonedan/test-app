import { styled } from '@mui/material';
import { memo } from 'react';
import theme from '@/theme/theme';
import { useTranslation } from 'next-i18next';

import DesktopHeader from './DesktopHeader';
import MobileHeader from './MobileFeedHeader';
import NavLinksWithCart from './NavLinksWithCart';

const StyledDesktopHeader = styled(DesktopHeader)`
  display: none;

  ${theme.breakpoints.up('lg')} {
    display: flex;
  }
`;
const StyledMobileHeader = styled(MobileHeader)`
  display: block;

  ${theme.breakpoints.up('lg')} {
    display: none;
  }
`;

type Props = {
  desktopBackCartText: string;
};

const Header = ({ desktopBackCartText }: Props) => {
  const { t } = useTranslation();

  return (
    <>
      <StyledDesktopHeader
        mktText={t('mktText')}
        rightComponent={<NavLinksWithCart desktopBackCartText={desktopBackCartText} />}
      />
      <StyledMobileHeader />
    </>
  );
};

export default memo(Header);
