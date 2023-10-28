import { useState } from 'react';
import theme from '@/theme';
import StickyHeader from '@/components/Common/StickyHeader/StickyHeader';
import MobileMenu from '@/components/Sections/Common/Header/MobileMenu';
import { styled, IconButton, SvgIcon } from '@mui/material';
import { MenuIcon } from '@/assets';
import { StyledDrawer } from './DockQueueUtils';

const StyledStickyHeader = styled(StickyHeader)`
  ${theme.mixins.layout};
`;

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <StyledStickyHeader
      leftComponent={
        <>
          <StyledDrawer anchor='top' open={isSidebarOpen} onClose={() => setIsSidebarOpen(false)}>
            <MobileMenu handleClose={() => setIsSidebarOpen(false)} />
          </StyledDrawer>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <SvgIcon component={MenuIcon} inheritViewBox />
          </IconButton>
        </>
      }
      middleComponent={<div>Location Selector</div>}
    />
  );
};

export default Header;
