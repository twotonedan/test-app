import { ReactNode, memo } from 'react';
import NiceModal, { useModal, NiceModalHocProps } from '@ebay/nice-modal-react';
import useMuiDrawer from '@/hooks/components/useMuiDrawer';
import { Drawer, styled } from '@mui/material';
import theme from '@/theme/theme';

import DummyDesktopHeader from '@/components/Sections/Common/Header/DummyDesktopHeader';
import Header from './Header';
import Footer from './Footer';

const StyledDrawer = styled(Drawer)`
  & > .MuiPaper-root {
    width: 100%;
    border-radius: 0;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;

    ${theme.breakpoints.up('md')} {
      width: 372px;
    }
  }
`;

interface ModalProps extends NiceModalHocProps {
  onClose: () => void;
  children: ReactNode;
  onClearAll: () => void;
  title: string;
  name: string;
  showResults?: boolean;
}

const FiltersModal = NiceModal.create(({ onClose, children, onClearAll, title, name, showResults }: ModalProps) => {
  const modal = useModal();
  const { isOpen } = useMuiDrawer(modal);

  return (
    <StyledDrawer open={isOpen} onClose={onClose} anchor='right' BackdropProps={{ invisible: true }}>
      <DummyDesktopHeader />
      <Header onClose={onClose} title={title} />
      {children}
      <Footer onClearAll={onClearAll} name={name} onClose={onClose} showResults={showResults} />
    </StyledDrawer>
  );
});

export default memo(FiltersModal);
