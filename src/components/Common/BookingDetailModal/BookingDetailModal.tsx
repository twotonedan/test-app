import useMuiDrawer from '@/hooks/components/useMuiDrawer';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { Drawer, styled } from '@mui/material';
import useGetBookingDetail from '@/hooks/api/useGetBookingDetail';
import { Header, Body, Footer } from './BookingDetailModalComponents';

const StyledDrawer = styled(Drawer)`
  & > .MuiPaper-root {
    width: 100%;
    border-radius: 0;
    position: relative;
    display: flex;
    flex-direction: column;
  }
`;
type IModalProps = {
  bookingId: string;
};
const BookingDetailModal = NiceModal.create(({ bookingId }: IModalProps) => {
  const modal = useModal();
  const { isOpen, handleOnClose } = useMuiDrawer(modal);

  const { data: booking } = useGetBookingDetail(bookingId);

  const onAssignToMe = () => {
    // stub for other ticket
  };
  const onAddCharges = () => {
    // stub for other ticket
  };
  const onReturn = () => {
    // stub for other ticket
  };
  const onQueue = () => {
    // stub for other ticket
  };

  return (
    <StyledDrawer open={isOpen} anchor='right'>
      <Header handleOnClose={handleOnClose} />
      <div style={{ margin: '20px' }}>
        <Body booking={booking} onAssignToMe={onAssignToMe} />
      </div>
      <Footer onAddCharges={onAddCharges} onReturn={onReturn} onQueue={onQueue} />
    </StyledDrawer>
  );
});

export default BookingDetailModal;
