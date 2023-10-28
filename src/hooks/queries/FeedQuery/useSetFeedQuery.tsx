import { useFormContext } from 'react-hook-form';
import feedFiltersSchema, { IFeedSchema } from '@/validationSchemas/feedFiltersSchema/feedFiltersSchema';
import { isEmpty, pick } from 'lodash';
import { safeValidate } from '@/utils/safeYup';
import { QueryParamConfigMap, createEnumParam } from 'use-query-params';
import { CategoryType } from '@/types/enums';
import useQuery from '../useQuery';

const defaultFields = ['category', 'date', 'dateRange', 'timeRange', 'locations'];

export const validateFeedFilters = (filters?: Partial<IFeedSchema['filters']>): [Partial<IFeedSchema>, boolean] => {
  if (isEmpty(filters)) return [{}, false];

  return safeValidate(
    {
      filters: {
        ...filters,
        timeRange: undefined, // TODO
        // date: filters.isMultiDay ? undefined : filters.date,
        // dateRange: filters.isMultiDay ? filters.dateRange : undefined,
      },
    },
    feedFiltersSchema
  ) as [Partial<IFeedSchema>, boolean];
};

export const extractFeedFilters = (filters?: Partial<IFeedSchema['filters']>) => pick(filters || {}, defaultFields);

export const feedQueryMap: QueryParamConfigMap = {
  category: createEnumParam(Object.values(CategoryType).slice(1)),
};

type Props = {
  name: string;
};

export const useSetFeedQuery = ({ name }: Props) => {
  const { getValues } = useFormContext();
  const [, setQuery] = useQuery(feedQueryMap);

  const handleSetQuery = () => {
    const filters = getValues(name);
    const [validatedData, isError] = validateFeedFilters(filters);
    if (isError || isEmpty(validatedData)) return;
    setQuery(extractFeedFilters(validatedData.filters), 'replace');
  };

  return { handleSetQuery };
};

export const useSetManualFeedQuery = () => {
  const [, setQuery] = useQuery();

  const handleSetQuery = (filters: object) => setQuery(extractFeedFilters(filters), 'replace');

  return { handleSetQuery };
};
