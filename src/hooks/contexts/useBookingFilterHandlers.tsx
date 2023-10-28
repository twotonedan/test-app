/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import constate from 'constate';
import { IBookingFilterOptions, IBookingFilterOptionsKeys } from '@/types/filters';
import { BookingFilters } from '@/validationSchemas/bookingFiltersSchema/bookingFiltersSchema';
import { dateHandler, dateRangeHandler } from '@/theme/utils/dateFilterHandlers';
import { DEFAULT_DATE_SELECTED_RANGE } from '@/constants/default/FILTERS';

import useFormatMultidayDate from '../formatters/useFormatMultidayDate';
import { FilterItem, useFilterLogic } from './useFilterLogic';
import useGetBookingsSettings from '../api/useGetBookingsSettings';

type FiltersValidatorsReturnsType = {
  [IBookingFilterOptionsKeys.date]: FilterItem | undefined;
  [IBookingFilterOptionsKeys.dateRange]: FilterItem | undefined;
  [IBookingFilterOptionsKeys.status]: FilterItem | undefined;
  [IBookingFilterOptionsKeys.unit]: FilterItem | undefined;
};

type Props = {
  name: string;
};

const useBookingFilterHandlersContext = ({ name }: Props) => {
  const { data: bookingsSettings } = useGetBookingsSettings();
  const { setValue, formState } = useFormContext();
  const { formatDates } = useFormatMultidayDate();
  const filtersRaw = useWatch({ name }) as BookingFilters;

  const filterResetters = useMemo(
    () => ({
      [IBookingFilterOptionsKeys.date]: (filterName: string) => setValue(`${filterName}.date`, null),
      [IBookingFilterOptionsKeys.dateRange]: (filterName: string) =>
        setValue(`${filterName}.dateRange`, DEFAULT_DATE_SELECTED_RANGE),
      [IBookingFilterOptionsKeys.status]: (filterName: string) => setValue(`${filterName}.status`, null),
      [IBookingFilterOptionsKeys.unit]: (filterName: string) => setValue(`${filterName}.unit`, null),
    }),
    [setValue]
  );

  const FILTERS_VALIDATORS: {
    [k in IBookingFilterOptionsKeys]?: (
      id: number | string,
      data: BookingFilters[k],
      companyOptions: Required<IBookingFilterOptions>[k]
    ) => FiltersValidatorsReturnsType[k];
  } = useMemo(
    () => ({
      [IBookingFilterOptionsKeys.date]: (id, date) => {
        return dateHandler({ id, date, formatDates, setValue, name, filterResetters });
      },
      [IBookingFilterOptionsKeys.dateRange]: (id, dateRange) => {
        return dateRangeHandler({ id, dateRange, formatDates, setValue, name, filterResetters });
      },

      [IBookingFilterOptionsKeys.status]: (id, status, options) => {
        if (!status) return undefined;
        const selectedOption = options?.find(opt => opt.label === status);
        if (!selectedOption) return undefined;
        return {
          id,
          label: selectedOption.label,
          remove: () => filterResetters[IBookingFilterOptionsKeys.status](name),
        };
      },

      [IBookingFilterOptionsKeys.unit]: (id, unit, options) => {
        if (!unit) return undefined;
        const selectedOption = options?.find(opt => opt.label === unit);
        if (!selectedOption) return undefined;
        return {
          id,
          label: selectedOption.label,
          remove: () => filterResetters[IBookingFilterOptionsKeys.unit](name),
        };
      },
    }),
    [formatDates, setValue, name, filterResetters]
  );

  const filterLogic = useFilterLogic({
    filtersRaw,
    filtersValidator: FILTERS_VALIDATORS,
    formState,
    getFilterOptions: key => bookingsSettings?.filters?.options?.[key as IBookingFilterOptionsKeys],
    filterResetters,
    name,
  });

  return {
    ...filterLogic,
    filterResetters,
  };
};

export const [BookingFilterHandlersProvider, useBookingFilterHandlers] = constate(useBookingFilterHandlersContext);
