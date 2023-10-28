import {
  DateParam,
  QueryParamConfigMap,
  decodeDelimitedArray,
  encodeDate,
  encodeDelimitedArray,
  useQueryParams,
} from 'use-query-params';
import qs from 'qs';
import { FeedFilters } from '@/validationSchemas/feedFiltersSchema/feedFiltersSchema';

const serializeDate = (date: Date) => encodeDate(date) || '';

export const MultiKeyParam = {
  encode: (value: unknown) => {
    const parsed = qs.stringify(value, { skipNulls: true, serializeDate });
    return parsed || undefined;
  },
  decode: (strValue: unknown) => qs.parse(strValue as string),
};

export const LocationParam = {
  encode: (value: FeedFilters['locations']) => {
    const parsed = value?.map(location => location.value);
    return parsed?.length ? encodeDelimitedArray(parsed) : undefined;
  },
  decode: (value?: string | (string | null)[] | null) => {
    const parsed = decodeDelimitedArray(value);
    return parsed?.length ? parsed?.map(location => ({ value: location })) : undefined;
  },
};

export const commonQueryParamConfigMap: QueryParamConfigMap = {
  date: DateParam,
  dateRange: MultiKeyParam,
  timeRange: MultiKeyParam,
  locations: LocationParam,
};

const useQuery = (customMap?: QueryParamConfigMap) =>
  useQueryParams({ ...commonQueryParamConfigMap, ...customMap }, { enableBatching: true });

export default useQuery;
