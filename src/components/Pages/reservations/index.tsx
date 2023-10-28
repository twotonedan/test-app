import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import MyReservationsContent from '@/components/Sections/Reservations/MyReservationContent';
import useGetFeedQuery from '@/hooks/queries/FeedQuery/useGetFeedQuery';
import bookingFiltersSchema, { IBookingSchema } from '@/validationSchemas/bookingFiltersSchema/bookingFiltersSchema';
import { BookingFilterHandlersProvider } from '@/hooks/contexts/useBookingFilterHandlers';
import { FilterHandlerProvider } from '@/hooks/useFilterHandler';

const BASE_NAME = 'bookingFilters';

const MyReservationsPage = () => {
  const { parsedQuery } = useGetFeedQuery({ enforceOnValidation: true });
  const form = useForm<IBookingSchema>({
    resolver: yupResolver(bookingFiltersSchema),
    defaultValues: {
      [BASE_NAME]: parsedQuery || {},
    },
  });
  const isMultiDay = useWatch({ name: `${BASE_NAME}.isMultiDay`, control: form.control });

  return (
    <FormProvider {...form}>
      <BookingFilterHandlersProvider name={BASE_NAME}>
        <FilterHandlerProvider>
          <MyReservationsContent isMultiDay={isMultiDay} baseName={BASE_NAME} />
        </FilterHandlerProvider>
      </BookingFilterHandlersProvider>
    </FormProvider>
  );
};

export default MyReservationsPage;
