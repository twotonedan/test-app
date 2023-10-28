import { RoutesPayload } from '@/mock/ROUTES';
import { PageType } from '@/types/enums';
import { compile } from 'path-to-regexp';
import { useCallback, useMemo } from 'react';
import { getUpdatedSearchString } from 'use-query-params/src/updateSearchString';
import { QueryParamConfigMap } from 'use-query-params';
import { defaultOptions } from 'use-query-params/src/options';
import useGetRoutes from './api/useGetRoutes';

type Props = {
  pageType: PageType;
  paramConfigMap?: QueryParamConfigMap;
};

const useToPath = ({ pageType, paramConfigMap }: Props) => {
  const { data: Routes = {} as RoutesPayload } = useGetRoutes();
  const path = Routes[pageType] || '';
  const toPathWithoutQueries = useMemo(() => compile(path, { encode: encodeURIComponent }), [path]);

  const toPath = useCallback(
    (pathObj?: object, queryObj?: object) => {
      let query = '';

      if (queryObj && paramConfigMap) {
        query = getUpdatedSearchString({
          paramConfigMap,
          currentSearchString: query,
          changes: queryObj,
          options: defaultOptions,
        });
      }
      return `${toPathWithoutQueries(pathObj)}${query}`;
    },
    [paramConfigMap, toPathWithoutQueries]
  );
  return { toPath };
};

export default useToPath;
