import { Box, styled } from '@mui/material';
import theme from '@/theme';
import BookingList from '@/components/Sections/Reservations/BookingList';
import { useId, useMemo } from 'react';
import NiceModal from '@ebay/nice-modal-react';
import { useBookingFilterHandlers } from '@/hooks/contexts/useBookingFilterHandlers';
import useGetBookings from '@/hooks/api/useGetBookings';
import FiltersContent from '@/components/Common/FeedFilters/FiltersContent';
import useGetBookingsSettings from '@/hooks/api/useGetBookingsSettings';

import MobileHeader from '../Common/Header/MobileHeader';
import DesktopHeader from '../Common/Header/DesktopHeader';
import NavLinksWithCart from '../Common/Header/NavLinksWithCart';
import BookingDesktopSidebar from './BookingDesktopSidebar';

const StyledMobileHeader = styled(MobileHeader)`
  ${theme.breakpoints.up('lg')} {
    display: none;
  }
`;

const StyledDesktopHeader = styled(DesktopHeader)`
  display: none;

  ${theme.breakpoints.up('lg')} {
    display: flex;
  }
`;

const StyledWrapper = styled(Box)`
  display: flex;
  gap: 24px;
`;

const StyledSubWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 22px;
  flex-grow: 1;
  margin-left: calc(265px + 24px);
  width: 100%;

  ${theme.breakpoints.down('lg')} {
    margin-left: 0;
  }
`;

const StyledFiltersWrapper = styled(Box)`
  ${theme.breakpoints.only('md')} {
    ${theme.mixins.layout};
  }

  ${theme.breakpoints.up('lg')} {
    padding-right: 65px;
  }
`;

type Props = {
  isMultiDay: boolean;
  baseName: string;
};

const MyReservationsContent = ({ isMultiDay, baseName }: Props) => {
  const modalId = useId();
  const filtersModalId = `filters-modal-${modalId}`;
  const { isFiltered } = useBookingFilterHandlers();
  const { data: bookingsSettings } = useGetBookingsSettings();
  const { data: bookingsData } = useGetBookings();

  const showFilters = useMemo(() => {
    return bookingsSettings?.filters?.settings && bookingsSettings?.filters?.settings?.filtersToShow?.length > 0;
  }, [bookingsSettings?.filters?.settings]);

  return (
    <>
      <StyledMobileHeader />
      <StyledDesktopHeader withShadow rightComponent={<NavLinksWithCart desktopBackCartText='' />} />

      <StyledWrapper>
        <BookingDesktopSidebar />
        <StyledSubWrapper>
          <StyledFiltersWrapper>
            {showFilters && (
              <FiltersContent
                baseName={baseName}
                isMultiDay={isMultiDay}
                openFiltersModal={() => NiceModal.show(filtersModalId)}
                filtersToShow={bookingsSettings?.filters?.settings?.filtersToShow}
                showLocation={false}
                isFiltered={isFiltered}
                minExtraFilters={{ md: 2, lg: 2 }}
              />
            )}
          </StyledFiltersWrapper>
          <BookingList bookingsList={bookingsData || []} />
        </StyledSubWrapper>
      </StyledWrapper>
    </>
  );
};

export default MyReservationsContent;
