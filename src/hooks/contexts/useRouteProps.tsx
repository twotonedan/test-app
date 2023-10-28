import constate from 'constate';
import { isObject } from 'lodash';
import { useRouter } from 'next/router';
import { match } from 'path-to-regexp';
import { useMemo } from 'react';

export const getMatchData = (pagePath: string, path: string) => {
  const [pathWithoutQuery] = path.split('?');
  const matchData = match(pagePath, { decode: decodeURIComponent })(pathWithoutQuery);

  return (isObject(matchData) ? matchData.params : {}) as Partial<Record<string, string>>;
};

type Props = {
  pagePath: string;
};

const useRoutePropsContext = ({ pagePath }: Props) => {
  const router = useRouter();
  const query = useMemo(() => getMatchData(pagePath, router.asPath), [pagePath, router.asPath]);

  return { ...router, query };
};

export const [RoutePropsProvider, useRouteProps] = constate(useRoutePropsContext);
