import { isEmpty, reduce } from 'lodash';
import { useMemo } from 'react';
import { FeedFilters, IFeedSchema } from '@/validationSchemas/feedFiltersSchema/feedFiltersSchema';
import { IFeedFilterOptionsKeys } from '@/types/filters';
import { useFilterByCustomCategory } from '@/hooks/useFiltersByCategory';
import { CategoryType } from '@/types/enums';
import { IFeedPayload } from '@/types/feed';

import { extractFeedFilters, feedQueryMap, validateFeedFilters } from './useSetFeedQuery';
import useQuery from '../useQuery';

export const validateFeedQuery = (q: Record<string, unknown>): [Partial<IFeedSchema>, boolean] => {
  if (isEmpty(q)) return [{}, false];

  const isMultiDay = isEmpty(q.dateRange) ? !q.date : true;
  return validateFeedFilters({
    ...q,
    isMultiDay,
  });
};

const filterByCategoryValidator = (
  filterByCategory: IFeedPayload['filters'][CategoryType]
): {
  [k in IFeedFilterOptionsKeys]?: (unvalidatedFilter: FeedFilters[k]) => FeedFilters[k];
} => ({
  [IFeedFilterOptionsKeys.locations]: unvalidatedFilter => {
    const data = filterByCategory?.options?.locations?.options;
    return unvalidatedFilter?.filter(({ value }) => data?.some(({ key }) => key === value));
  },
});

type Props = {
  enforceOnValidation?: boolean;
};

const useGetFeedQuery = ({ enforceOnValidation }: Props = {}) => {
  const [query, setQuery] = useQuery(feedQueryMap);
  const getFilterByCustomCategory = useFilterByCustomCategory();

  const parsedQuery = useMemo<Partial<IFeedSchema['filters']>>(
    () => {
      const [validatedQuery, isError] = validateFeedQuery(query);
      const { filters = {} as FeedFilters } = validatedQuery;
      const filterByCategory = getFilterByCustomCategory(filters?.category);
      const filterValidator = filterByCategoryValidator(filterByCategory);
      const validatedFilters = reduce(
        filters,
        (acc, value, key) => {
          const validator = filterValidator?.[key as IFeedFilterOptionsKeys];
          return {
            ...acc,
            // @ts-ignore
            [key]: validator ? validator(value) : value,
          };
        },
        {}
      );

      if (typeof window !== 'undefined' && enforceOnValidation && (isError || !isEmpty(validatedFilters))) {
        setQuery(extractFeedFilters(validatedFilters), 'replace');
      }

      return validatedFilters;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [query]
  );

  return { parsedQuery };
};

export default useGetFeedQuery;
