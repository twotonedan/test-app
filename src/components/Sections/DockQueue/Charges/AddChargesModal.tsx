import { useState } from 'react';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { styled, Drawer } from '@mui/material';
import useMuiDrawer from '@/hooks/components/useMuiDrawer';
import { ICharge, IBooking } from '@/types/dockQueue';
import { Header, Body, Footer } from './AddChargesModalComponents';

const StyledDrawer = styled(Drawer)`
  & > .MuiPaper-root {
    width: 100%;
    border-radius: 0;
    position: relative;
    display: flex;
    flex-direction: column;
  }
`;

type Props = {
  booking: IBooking;
  saveAddedCharges: (charges: ICharge[] | []) => void;
};

const AddChargesModal = NiceModal.create(({ booking, saveAddedCharges }: Props) => {
  const [tempCharges, setTempCharges] = useState(booking.charges);
  const modal = useModal();
  const { isOpen, handleOnClose } = useMuiDrawer(modal);
  const applyCharge = (id: string, value: number) => {
    setTempCharges(
      tempCharges.map((charge: ICharge) => {
        if (charge.id !== id) return charge;
        return {
          ...charge,
          value,
        };
      })
    );
  };
  return (
    <StyledDrawer open={isOpen} anchor='right'>
      <Header handleOnClose={handleOnClose} />
      <div style={{ margin: '20px' }}>
        <Body
          itemName={booking.item.title}
          customerName={booking.customerName}
          bookingId={booking.bookingId}
          charges={tempCharges}
          applyCharge={applyCharge}
        />
      </div>
      <Footer cancel={handleOnClose} saveAddedCharges={() => saveAddedCharges(tempCharges)} />
    </StyledDrawer>
  );
});

export default AddChargesModal;
