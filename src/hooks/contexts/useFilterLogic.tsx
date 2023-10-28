import { CategoryType, TimeRangeType } from '@/types/enums';
import {
  IBookingFilterOptions,
  ICombinedFilterOptionsKeys,
  ICombinedFilterOptionsKeysValues,
  IFeedFilterOptions,
} from '@/types/filters';
import { BookingFilters } from '@/validationSchemas/bookingFiltersSchema/bookingFiltersSchema';
import { FeedFilters } from '@/validationSchemas/feedFiltersSchema/feedFiltersSchema';
import { reduce, forEach, keys, isArray, has } from 'lodash';
import { useDeferredValue, useId, useMemo } from 'react';
import { FieldValues, FormState, useFormContext } from 'react-hook-form';

export interface FilterItem {
  label: string;
  id: number | string;
  remove: () => void;
}

type MultipleFilters = {
  options: FilterItem[];
  remove: () => void;
};

type AllRawFiltersSchemas = BookingFilters & FeedFilters;

type FiltersValidatorsReturnsType = {
  [ICombinedFilterOptionsKeys.date]: FilterItem | undefined;
  [ICombinedFilterOptionsKeys.dateRange]: FilterItem | undefined;
  [ICombinedFilterOptionsKeys.timeRange]: FilterItem | undefined;
  [ICombinedFilterOptionsKeys.priceRange]: FilterItem | undefined;
  [ICombinedFilterOptionsKeys.amenities]: MultipleFilters | undefined;
  [ICombinedFilterOptionsKeys.locations]: FilterItem | undefined;
  [ICombinedFilterOptionsKeys.status]: FilterItem | undefined;
  [ICombinedFilterOptionsKeys.unit]: FilterItem | undefined;
};

export type ParsedFilterType = { [k in ICombinedFilterOptionsKeysValues]?: FiltersValidatorsReturnsType[k] };

type RequiredCombinedFilterOptions = Required<IFeedFilterOptions> & Required<IBookingFilterOptions>;

type Props = {
  filtersRaw: AllRawFiltersSchemas;
  filtersValidator: {
    [k in ICombinedFilterOptionsKeysValues]?: (
      id: number | string,
      data: AllRawFiltersSchemas[k],
      companyOptions: RequiredCombinedFilterOptions[k]
    ) => FiltersValidatorsReturnsType[k];
  };
  formState: FormState<FieldValues>;
  getFilterOptions: (
    key: string,
    categorySelected?: CategoryType
  ) => IFeedFilterOptions | IBookingFilterOptions | undefined;
  filterResetters: {
    [k in ICombinedFilterOptionsKeysValues | TimeRangeType]?: (name: string) => void;
  };
  name: string;
};

export const useFilterLogic = ({
  filtersRaw,
  filtersValidator,
  formState,
  filterResetters,
  name,
  getFilterOptions,
}: Props) => {
  const baseId = useId();
  const filters = useDeferredValue(filtersRaw);
  const { reset } = useFormContext();

  const parsedFilters = useMemo(
    () =>
      reduce(
        filters,
        (acc, el, key) => {
          const typedKey = key as ICombinedFilterOptionsKeysValues;
          // @ts-ignore
          if (formState.errors?.filters?.[typedKey]) return acc;
          const getFilter = filtersValidator[typedKey];
          if (!getFilter) return acc;
          const filterOptions = getFilterOptions(typedKey);
          const filter = getFilter(`${baseId}-${key}`, el as never, filterOptions);
          // @ts-ignore
          if (filter) acc[typedKey] = filter;
          return acc;
        },
        {} as ParsedFilterType
      ),
    [filters, formState.errors?.filters, filtersValidator, getFilterOptions, baseId]
  );

  const handleDeleteAllFilters = () => {
    forEach(filterResetters, filter => filter?.(name));
    reset();
  };

  const flattedFilters = useMemo(
    () =>
      reduce(
        parsedFilters,
        (acc: FilterItem[], el: FilterItem | MultipleFilters | undefined): FilterItem[] => {
          if (has(el, 'options')) {
            const multipleItem = el as MultipleFilters;
            if (isArray(multipleItem.options)) return [...acc, ...multipleItem.options];
          }
          const singleItem = el as FilterItem;
          return [...acc, singleItem];
        },
        []
      ),
    [parsedFilters]
  );

  const isFiltered = useMemo(() => !!keys(parsedFilters).length, [parsedFilters]);

  return {
    parsedFilters,
    handleDeleteAllFilters,
    isFiltered,
    flattedFilters,
  };
};
