import useMuiDrawer from '@/hooks/components/useMuiDrawer';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { Drawer, styled } from '@mui/material';
import useLocalStorageState from 'use-local-storage-state';
import { IFilterModalProps, IBookingFilter } from '@/types/dockQueue';
import { Header, Body, Footer } from './ListFilterModalComponents';

const StyledDrawer = styled(Drawer)`
  & > .MuiPaper-root {
    width: 100%;
    border-radius: 0;
    position: relative;
    display: flex;
    flex-direction: column;
  }
`;

const ListFilterModal = NiceModal.create((props: IFilterModalProps) => {
  const modal = useModal();
  const { isOpen, handleOnClose } = useMuiDrawer(modal);
  const [, setSavedFilters] = useLocalStorageState<IBookingFilter[]>('dock-queue-filters');
  const applyFilters = () => {
    handleOnClose();
    setSavedFilters(props.data.filterFields);
  };
  const clearAllFilters = () => {
    props.data.setFilterFields([]);
    setSavedFilters([]);
  };
  return (
    <StyledDrawer open={isOpen} anchor='right'>
      <Header handleOnClose={handleOnClose} />
      <div style={{ margin: '20px' }}>
        <Body {...props} />
      </div>
      <Footer applyFilters={applyFilters} clearAllFilters={clearAllFilters} />
    </StyledDrawer>
  );
});

export default ListFilterModal;
