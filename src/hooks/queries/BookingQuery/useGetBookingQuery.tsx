import { isEmpty } from 'lodash';
import { useMemo } from 'react';
import {
  IBookingInformation,
  IBookingInformationSchema,
} from '@/validationSchemas/bookingInformationSchema/bookingInformationSchema';
import useQuery from '../useQuery';
import { extractBookingFilters, validateBookingInformation } from './useSetBookingQuery';

export const defaultState: Partial<IBookingInformation> = {
  quantity: 1,
  isMultiDay: true,
};

export const validateBookingQuery = (q: Record<string, unknown>): [Partial<IBookingInformationSchema>, boolean] => {
  if (isEmpty(q)) return [{}, false];

  const isMultiDay = isEmpty(q.dateRange) ? !q.date : true;
  return validateBookingInformation({
    ...q,
    ...defaultState,
    isMultiDay,
  });
};

export const parseBookingQuery = (
  q: Record<string, unknown>,
  revalidate: (bookingInformation: Partial<IBookingInformation>) => void,
  enforceOnValidation?: boolean
): Partial<IBookingInformation> => {
  const [validatedQuery, isError] = validateBookingQuery(q);
  const { bookingInformation = {} } = validatedQuery;

  if (typeof window !== 'undefined' && enforceOnValidation && (isError || !isEmpty(bookingInformation))) {
    revalidate(bookingInformation);
  }

  return bookingInformation;
};

type Props = {
  enforceOnValidation?: boolean;
};

const useGetBookingQuery = ({ enforceOnValidation }: Props = {}) => {
  const [query, setQuery] = useQuery();

  const parsedQuery = useMemo<Partial<IBookingInformation>>(
    () =>
      parseBookingQuery(
        query,
        bookingInformation => setQuery(extractBookingFilters(bookingInformation), 'replace'),
        enforceOnValidation
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [query]
  );

  return { parsedQuery };
};

export default useGetBookingQuery;
