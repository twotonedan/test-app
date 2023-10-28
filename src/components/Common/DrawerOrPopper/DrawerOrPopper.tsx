import useIsDesktop from '@/hooks/useIsDesktop';
import theme from '@/theme/theme';
import { Drawer, Popper, styled } from '@mui/material';
import { ReactElement, useMemo } from 'react';

const StyledDrawer = styled(Drawer)`
  & > .MuiPaper-root {
    background-color: ${theme.palette.common.white};
    width: 100%;
    box-shadow: none;
    border-radius: 0;
  }
`;

type Props = {
  children: ReactElement;
  popperId?: string;
  anchorEl: HTMLElement | null;
  handleDrawerClose: () => void;
  isDrawerOpen: boolean;
  popperOffset?: [number, number];
};

const DrawerOrPopper = ({
  children,
  popperId,
  anchorEl,
  handleDrawerClose,
  isDrawerOpen,
  popperOffset = [0, 0],
}: Props) => {
  const isDesktop = useIsDesktop();

  const POPPER_MODIFIERS = useMemo(
    () => [
      {
        name: 'offset',
        enabled: true,
        options: {
          offset: popperOffset,
        },
      },
      {
        name: 'flip',
        enabled: false,
        options: {
          fallbackPlacements: ['top', 'bottom'],
        },
      },
      {
        name: 'preventOverflow',
        enabled: true,
        options: {
          altAxis: true,
          tether: false,
          rootBoundary: 'viewport',
          padding: 40,
        },
      },
    ],
    [popperOffset]
  );

  return isDesktop ? (
    <Popper id={popperId} open={!!anchorEl} anchorEl={anchorEl} sx={{ zIndex: 9999 }} modifiers={POPPER_MODIFIERS}>
      {children}
    </Popper>
  ) : (
    <StyledDrawer anchor='right' open={isDrawerOpen} onClose={handleDrawerClose}>
      {children}
    </StyledDrawer>
  );
};

export default DrawerOrPopper;
