import { useFormContext } from 'react-hook-form';
import { isEmpty, pick } from 'lodash';
import bookingInformationSchema, {
  IBookingInformation,
  IBookingInformationSchema,
} from '@/validationSchemas/bookingInformationSchema/bookingInformationSchema';
import { safeValidate, safeIsValidSync } from '@/utils/safeYup';
import timeRangeSchema from '@/validationSchemas/bookingInformationSchema/timeRange';
import useQuery from '../useQuery';

const defaultFields = ['date', 'dateRange', 'timeRange'];

export const validateBookingInformation = (
  bookingInformation?: Partial<IBookingInformation>
): [Partial<IBookingInformationSchema>, boolean] => {
  if (isEmpty(bookingInformation)) return [{}, false];

  const isTimeRangeValid = safeIsValidSync(bookingInformation.timeRange || {}, timeRangeSchema);
  return safeValidate(
    {
      bookingInformation: {
        ...bookingInformation,
        timeRange: isTimeRangeValid ? bookingInformation.timeRange : undefined,
        date: bookingInformation.isMultiDay ? undefined : bookingInformation.date,
        dateRange: bookingInformation.isMultiDay ? bookingInformation.dateRange : undefined,
      },
    },
    bookingInformationSchema
  ) as [Partial<IBookingInformationSchema>, boolean];
};

export const extractBookingFilters = (bookingInformation?: Partial<IBookingInformation>) =>
  pick(bookingInformation || {}, defaultFields);

type Props = {
  name: string;
};

export const useSetBookingQuery = ({ name }: Props) => {
  const { getValues } = useFormContext();
  const [, setQuery] = useQuery();

  const handleSetQuery = () => {
    const bookingInformation = getValues(name);
    const [validatedData, isError] = validateBookingInformation(bookingInformation);
    if (isError || isEmpty(validatedData)) return;
    setQuery(extractBookingFilters(validatedData.bookingInformation), 'replace');
  };

  return { handleSetQuery };
};

export const useSetManualBookingQuery = () => {
  const [, setQuery] = useQuery();

  const handleSetQuery = (filters: object) => {
    setQuery(extractBookingFilters(filters), 'replace');
  };

  return { handleSetQuery };
};
