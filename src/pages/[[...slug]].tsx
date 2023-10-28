import Home from '@/components/Pages';
import ItemDetails from '@/components/Pages/details/[id]';
import DockQueue from '@/components/Pages/dockQueue';
import { getMatchData, RoutePropsProvider } from '@/hooks/contexts/useRouteProps';
import { PageType } from '@/types/enums';
import { includes } from 'lodash';
import { GetServerSideProps } from 'next';
import { useMemo } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { SupportedLocales } from '@/constants/locales/supportedLocales';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { getCompany, GET_COMPANY } from '@/hooks/api/useGetCompany';
import useGetRoutes, { getRoutes, GET_ROUTES } from '@/hooks/api/useGetRoutes';
import { getFeed, GET_FEED } from '@/hooks/api/useGetFeed';
import { getFeedItems, GET_FEED_ITEMS } from '@/hooks/api/useGetFeedItems';
import { getItemById, GET_ITEM_BY_ID } from '@/hooks/api/useGetItemById';
import { SSRConfig } from 'next-i18next';
import ErrorComponent from 'next/error';
import { routeParser } from '@/utils/routeParser';
import CheckoutPage from '@/components/Pages/checkout';
import MyReservationsPage from '@/components/Pages/reservations';
import { GET_CHECKOUT_STEPS, getCheckoutSteps } from '@/hooks/api/useGetCheckoutSteps';
import { getLatestDecodedValues } from 'use-query-params/src/latestValues';
import { commonQueryParamConfigMap } from '@/hooks/queries/useQuery';
import { DecodedParamCache } from 'use-query-params/src/decodedParamCache';
import { ParsedUrlQuery } from 'querystring';
import { IFeedSchema } from '@/validationSchemas/feedFiltersSchema/feedFiltersSchema';
import { useRouter } from 'next/router';
import { validateFeedQuery } from '@/hooks/queries/FeedQuery/useGetFeedQuery';
import { GET_BOOKINGS, getMyBookings } from '@/hooks/api/useGetBookings';

type Pages = {
  [k in PageType]: {
    component: React.FC;
    translationNamespaces: string[];
    prefetch: (
      queryClient: QueryClient,
      matchData: Partial<Record<string, string>>,
      query: ParsedUrlQuery
    ) => Promise<void | void[]>;
  };
};

const pages: Pages = {
  [PageType.INDEX]: {
    component: Home,
    translationNamespaces: ['common', 'actions', 'filters'],
    prefetch: async (queryClient, _, nextParsedQuery) => {
      const query = getLatestDecodedValues(
        nextParsedQuery,
        commonQueryParamConfigMap,
        new DecodedParamCache()
      ) as Partial<IFeedSchema['filters']>;

      const [{ filters }] = validateFeedQuery(query || {});
      const { isMultiDay = true } = filters || {};

      return Promise.all([
        queryClient.prefetchQuery([GET_COMPANY], getCompany),
        queryClient.prefetchQuery([GET_FEED], getFeed),
        queryClient.prefetchQuery([GET_FEED_ITEMS, {}], () => getFeedItems({ isMultiDay })),
        queryClient.prefetchQuery([GET_FEED_ITEMS, { isMultiDay }], () => getFeedItems({ isMultiDay })),
      ]);
    },
  },
  [PageType.ITEM_DETAIL]: {
    component: ItemDetails,
    translationNamespaces: ['common', 'actions', 'item-detail', 'waitlist'],
    prefetch: async (queryClient, matchData) => {
      const { id } = matchData;

      if (!id) throw new Error('No id provided or matched');

      return Promise.all([
        queryClient.prefetchQuery([GET_COMPANY], getCompany),
        queryClient.prefetchQuery([GET_ITEM_BY_ID, id], () => getItemById(id)),
      ]);
    },
  },
  [PageType.DOCK_QUEUE]: {
    component: DockQueue,
    translationNamespaces: ['common', 'actions', 'item-detail', 'waitlist'],
    prefetch: async queryClient => {
      return Promise.all([queryClient.prefetchQuery([GET_COMPANY], getCompany)]);
    },
  },
  [PageType.CHECKOUT]: {
    component: CheckoutPage,
    translationNamespaces: ['common', 'actions'],
    prefetch: async queryClient => Promise.all([queryClient.prefetchQuery([GET_CHECKOUT_STEPS], getCheckoutSteps)]),
  },
  [PageType.MY_RESERVATIONS]: {
    component: MyReservationsPage,
    translationNamespaces: ['common', 'actions'],
    prefetch: async queryClient => Promise.all([queryClient.prefetchQuery([GET_BOOKINGS], getMyBookings)]),
  },
};

type Props = {
  error?: {
    statusCode: number;
    message: string;
  };
  pageType: PageType;
  pagePath: string;
};

const RouteHandler = ({ error, pageType: serverPageType, pagePath: serverPagePath }: Props) => {
  const { asPath } = useRouter();
  const { data: routes } = useGetRoutes();

  const { pageType, pagePath } = useMemo(
    () => (routes ? routeParser(routes, asPath.split('?')[0]) : { pageType: serverPageType, pagePath: serverPagePath }),
    [asPath, routes, serverPagePath, serverPageType]
  );

  const Component = useMemo(() => pages[pageType].component, [pageType]);

  if (error) return <ErrorComponent statusCode={error.statusCode} title={error.message} />;
  return (
    <RoutePropsProvider pagePath={pagePath}>
      <Component />
    </RoutePropsProvider>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale, params, res, resolvedUrl, query }) => {
  res.setHeader('Cache-Control', 'public, s-maxage=1800, stale-while-revalidate=86400');
  const slug = `/${((params?.slug || []) as string[]).join('/')}`;
  const queryClient = new QueryClient();
  const routes = await queryClient.fetchQuery([GET_ROUTES], getRoutes);
  const { pageType, pagePath } = routeParser(routes, slug);

  if (!pageType || !includes(PageType, pageType)) return { notFound: true };

  const commonProps = { pageType, pagePath };
  const matchData = getMatchData(pagePath, resolvedUrl);

  let translations: SSRConfig = {};
  try {
    [translations] = await Promise.all([
      serverSideTranslations(locale ?? SupportedLocales.EN, pages[pageType].translationNamespaces),
      pages[pageType].prefetch(queryClient, matchData, query),
    ]);
  } catch (error) {
    const e = error as Error;

    return {
      props: {
        ...commonProps,
        error: { statusCode: 500, message: e.message },
      },
    };
  }

  return {
    props: {
      ...commonProps,
      ...translations,
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

export default RouteHandler;
