import { RoutesPayload } from '@/mock/ROUTES';
import { PageType } from '@/types/enums';
import { findKey } from 'lodash';
import { match } from 'path-to-regexp';

export const routeParser = (routes: RoutesPayload, slug: string) => {
  const pageType = findKey(routes, path => !!match(path, { decode: decodeURIComponent })(slug)) as PageType;
  const pagePath = routes[pageType];

  return { pageType, pagePath };
};
