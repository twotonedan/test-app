import { Box, Drawer, Modal, styled } from '@mui/material';
import { ForwardedRef, ReactElement, forwardRef, useMemo } from 'react';
import useIsMobile from '@/hooks/useIsMobile';

const StyledDrawer = styled(Drawer)`
  & > .MuiPaper-root {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
`;

const StyledModal = styled(Modal)``;

const StyledWrapper = styled(Box)`
  display: flex;
`;

export enum DrawerOrModalSelector {
  DRAWER = 'DRAWER',
  MODAL = 'MODAL',
}

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactElement;
  className?: string;
  anchor?: 'left' | 'right' | 'bottom' | 'top';
  force?: DrawerOrModalSelector;
};

const DrawerOrModal = (
  { children, isOpen, onClose, className, anchor = 'bottom', force }: Props,
  ref: ForwardedRef<HTMLDivElement>
) => {
  const isMobile = useIsMobile();

  const WrappedChildren = useMemo(
    () => <StyledWrapper className='drawerOrModalWrapper'>{children}</StyledWrapper>,
    [children]
  );

  return (force ? force === DrawerOrModalSelector.DRAWER : isMobile) ? (
    <StyledDrawer PaperProps={{ ref }} anchor={anchor} open={isOpen} onClose={onClose} className={className}>
      {WrappedChildren}
    </StyledDrawer>
  ) : (
    <StyledModal ref={ref} open={isOpen} onClose={onClose} className={className}>
      {WrappedChildren}
    </StyledModal>
  );
};

export default forwardRef(DrawerOrModal);
