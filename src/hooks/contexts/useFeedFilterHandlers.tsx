/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { FeedFilters } from '@/validationSchemas/feedFiltersSchema/feedFiltersSchema';
import { isNil, isEqual, isObject } from 'lodash';
import { useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { calculatePrice } from '@/utils/price';
import constate from 'constate';
import { IFeedFilterOptions, IFeedFilterOptionsKeys } from '@/types/filters';
import { DEFAULT_PRICE_RANGE, DEFAULT_DATE_SELECTED_RANGE } from '@/constants/default/FILTERS';
import { HOURS_OF_DAY_OPTIONS_START, HOURS_OF_DAY_OPTIONS_END } from '@/constants';
import { useTranslation } from 'next-i18next';
import { getStartEndRange } from '@/utils/timeRange';
import { TimeRangeType } from '@/types/enums';
import { dateHandler, dateRangeHandler } from '@/theme/utils/dateFilterHandlers';
import useGetCategorySelected from '../useGetCategorySelected';
import { useCurrencyFormatter } from './useCurrencyFormatter';
import useGetFeed from '../api/useGetFeed';
import useFormatMultidayDate from '../formatters/useFormatMultidayDate';
import { useFilterLogic } from './useFilterLogic';
import useFormatHours from '../formatters/useFormatHours';
import { useSetFeedQuery } from '../queries/FeedQuery/useSetFeedQuery';

export interface FilterItem {
  label: string;
  id: number | string;
  remove: () => void;
}

type MultipleFilters = {
  options: FilterItem[];
  remove: () => void;
};

type FiltersValidatorsReturnsType = {
  [IFeedFilterOptionsKeys.date]: FilterItem | undefined;
  [IFeedFilterOptionsKeys.dateRange]: FilterItem | undefined;
  [IFeedFilterOptionsKeys.timeRange]: FilterItem | undefined;
  [IFeedFilterOptionsKeys.priceRange]: FilterItem | undefined;
  [IFeedFilterOptionsKeys.amenities]: MultipleFilters | undefined;
  [IFeedFilterOptionsKeys.locations]: FilterItem | undefined;
};

type Props = {
  name: string;
};

export const MAX_LOCATIONS_ALLOWED = 3;

const useFeedFilterHandlersContext = ({ name }: Props) => {
  const { t } = useTranslation('common');
  const { data: feedData } = useGetFeed();
  const { formatTimeRangeHours } = useFormatHours();

  const { setValue, formState } = useFormContext();
  const { currencyFormatter } = useCurrencyFormatter();
  const { formatDates } = useFormatMultidayDate();
  const { categorySelected } = useGetCategorySelected();
  const filtersRaw = useWatch({ name }) as FeedFilters;
  const { handleSetQuery } = useSetFeedQuery({ name });

  const filterResetters = useMemo(
    () => ({
      [TimeRangeType.DURATION]: (filterName: string) => setValue(`${filterName}.timeRange.value`, null),
      [TimeRangeType.SLIDER_RANGE]: (filterName: string) => {
        const startDefaultRange = [
          HOURS_OF_DAY_OPTIONS_START[0].value,
          HOURS_OF_DAY_OPTIONS_START[HOURS_OF_DAY_OPTIONS_START.length - 1].value,
        ];
        const endDefaultRange = [
          HOURS_OF_DAY_OPTIONS_END[0].value,
          HOURS_OF_DAY_OPTIONS_END[HOURS_OF_DAY_OPTIONS_END.length - 1].value,
        ];
        setValue(`${filterName}.timeRange.value.start`, startDefaultRange);
        setValue(`${filterName}.timeRange.value.end`, endDefaultRange);
      },
      [IFeedFilterOptionsKeys.priceRange]: (filterName: string) =>
        setValue(`${filterName}.priceRange`, DEFAULT_PRICE_RANGE),
      [IFeedFilterOptionsKeys.amenities]: (filterName: string) => setValue(`${filterName}.amenities`, []),
      [IFeedFilterOptionsKeys.locations]: (filterName: string) => {
        handleSetQuery();
        setValue(`${filterName}.locations`, []);
      },
      [IFeedFilterOptionsKeys.date]: (filterName: string) => setValue(`${filterName}.date`, null),
      [IFeedFilterOptionsKeys.dateRange]: (filterName: string) =>
        setValue(`${filterName}.dateRange`, DEFAULT_DATE_SELECTED_RANGE),
    }),
    [handleSetQuery, setValue]
  );

  const FILTERS_VALIDATORS: {
    [k in IFeedFilterOptionsKeys]?: (
      id: number | string,
      data: FeedFilters[k],
      companyOptions: Required<IFeedFilterOptions>[k]
    ) => FiltersValidatorsReturnsType[k];
  } = useMemo(
    () => ({
      [IFeedFilterOptionsKeys.date]: (id, date) => {
        return dateHandler({ id, date, formatDates, setValue, name, filterResetters });
      },
      [IFeedFilterOptionsKeys.dateRange]: (id, dateRange) => {
        return dateRangeHandler({ id, dateRange, formatDates, setValue, name, filterResetters });
      },
      [IFeedFilterOptionsKeys.timeRange]: (id, timeRange, options) => {
        const { type, value } = timeRange || {};

        if (type === TimeRangeType.SLIDER_RANGE && isObject(value)) {
          const { startHour, endHour } = getStartEndRange(value);
          const [pickUpStart, pickUpEnd] = startHour || [];
          const [dropOffStart, dropOffEnd] = endHour || [];
          const startDefaultRange = [
            HOURS_OF_DAY_OPTIONS_START[0].value,
            HOURS_OF_DAY_OPTIONS_START[HOURS_OF_DAY_OPTIONS_START.length - 1].value,
          ];
          const endDefaultRange = [
            HOURS_OF_DAY_OPTIONS_END[0].value,
            HOURS_OF_DAY_OPTIONS_END[HOURS_OF_DAY_OPTIONS_END.length - 1].value,
          ];
          if (
            !Array.isArray(startHour) ||
            !Array.isArray(endHour) ||
            (isEqual(startHour, startDefaultRange) && isEqual(endHour, endDefaultRange))
          )
            return undefined;

          return {
            id,
            label: formatTimeRangeHours({ pickUpStart, pickUpEnd, dropOffStart, dropOffEnd }),
            remove: () => filterResetters[TimeRangeType.SLIDER_RANGE](name),
          };
        }

        if (type === TimeRangeType.DURATION) {
          const selectedOption = options.options?.find(opt => opt.value === value);
          if (!selectedOption) return undefined;

          return {
            id,
            label: `${t('duration')}: ${selectedOption?.label}`,
            remove: () => filterResetters[TimeRangeType.DURATION](name),
          };
        }

        return undefined;
      },
      [IFeedFilterOptionsKeys.priceRange]: (id, priceRange, options) => {
        const [start, end] = priceRange || [];
        const { max } = options.limits;

        if ([start, end].some(isNil) || isEqual(priceRange, DEFAULT_PRICE_RANGE)) return undefined;

        const formattedStart = currencyFormatter.format(calculatePrice(start!, max));
        const formattedEnd = currencyFormatter.format(calculatePrice(end!, max));

        return {
          id,
          label: `${formattedStart} - ${formattedEnd}`,
          remove: () => filterResetters[IFeedFilterOptionsKeys.priceRange](name),
        };
      },
      [IFeedFilterOptionsKeys.amenities]: (id, amenities, options) => {
        if (!amenities?.length) return undefined;

        return {
          id,
          options: options?.reduce((acc: FilterItem[], item) => {
            const modifiedOptions: FilterItem[] = item.options
              .filter(option => !!amenities.find(amenity => amenity.value === option.id))
              .map(option => ({
                id: option.id,
                label: option.label,
                remove: () =>
                  setValue(
                    `${name}.amenities`,
                    amenities.filter(amenity => amenity.value !== option.id)
                  ),
              }));
            return [...acc, ...modifiedOptions];
          }, []),
          remove: () => filterResetters[IFeedFilterOptionsKeys.amenities](name),
        };
      },
      [IFeedFilterOptionsKeys.locations]: (id, locations, { options }) => {
        if (!locations?.length) return undefined;

        return {
          id,
          label: options
            .filter(option => !!locations.find(location => location.value === option.key))
            .map(location => location.name)
            .join(', '),
          remove: () => filterResetters[IFeedFilterOptionsKeys.locations](name),
        };
      },
    }),
    [formatDates, filterResetters, name, formatTimeRangeHours, t, currencyFormatter, setValue]
  );

  const filterLogic = useFilterLogic({
    filtersRaw,
    filtersValidator: FILTERS_VALIDATORS,
    formState,
    getFilterOptions: key => feedData?.filters[categorySelected]?.options?.[key as IFeedFilterOptionsKeys],
    filterResetters,
    name,
  });

  return {
    ...filterLogic,
    filterResetters,
  };
};

export const [FeedFilterHandlersProvider, useFeedFilterHandlers] = constate(useFeedFilterHandlersContext);
