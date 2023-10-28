import { memo, useRef } from 'react';
import { Drawer, IconButton, styled } from '@mui/material';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import theme from '@/theme';
import Error from 'next/error';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DetailHeader from '@/components/Sections/Common/DetailHeader';
import useMuiDrawer from '@/hooks/components/useMuiDrawer';
import DummyDesktopHeader from '@/components/Sections/Common/Header/DummyDesktopHeader';
import useGetBookingUnitById from '@/hooks/api/useGetBookingUnitById';
import EditBookingUnitContent from './EditBookingUnitContent/EditBookingUnitContent';

const StyledDrawer = styled(Drawer)`
  & > .MuiPaper-root {
    width: 100%;
    border-radius: 0;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const StyledDetailHeader = styled(DetailHeader)`
  ${theme.breakpoints.up('lg')} {
    display: none;
  }
`;

const EditBookingUnitModal = NiceModal.create(() => {
  const { data: bookingUnitData } = useGetBookingUnitById('2'); // TODO
  const containerScrollRef = useRef<HTMLDivElement>(null);

  const modal = useModal();
  const { isOpen, handleOnClose } = useMuiDrawer(modal);

  const handleCloseModal = () => {
    handleOnClose();
  };

  if (!bookingUnitData) return <Error statusCode={404} />;

  const { title } = bookingUnitData;

  return (
    <StyledDrawer open={isOpen} onClose={handleOnClose} anchor='right' PaperProps={{ ref: containerScrollRef }}>
      <StyledDetailHeader
        title={title}
        rightComponent={
          <IconButton color='primary'>
            <MoreVertIcon />
          </IconButton>
        }
        onClickBack={handleCloseModal}
        parentRef={containerScrollRef}
      />
      <DummyDesktopHeader withShadow />
      <EditBookingUnitContent bookingData={bookingUnitData} />
    </StyledDrawer>
  );
});

export default memo(EditBookingUnitModal);
