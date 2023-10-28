import constate from 'constate';
import { useFeedFilterHandlers } from './contexts/useFeedFilterHandlers';
import { useBookingFilterHandlers } from './contexts/useBookingFilterHandlers';

const useFilterHandlerContext = () => {
  const { parsedFilters: feedParsedFilters } = useFeedFilterHandlers();
  const { parsedFilters: bookingParsedFilters } = useBookingFilterHandlers();

  return { parsedFilters: feedParsedFilters || bookingParsedFilters };
};

export const [FilterHandlerProvider, useFilterHandler] = constate(useFilterHandlerContext);
