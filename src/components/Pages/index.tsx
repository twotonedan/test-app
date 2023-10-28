import Layout from '@/components/Layout';
import CardContainer from '@/components/Sections/Home/CardContainer';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import feedFiltersSchema, { IFeedSchema } from '@/validationSchemas/feedFiltersSchema/feedFiltersSchema';
import Header from '@/components/Sections/Common/Header';
import { styled } from '@mui/material';
import theme from '@/theme';
import { FeedFilterHandlersProvider } from '@/hooks/contexts/useFeedFilterHandlers';
import useFiltersByCategory from '@/hooks/useFiltersByCategory';
import { memo, useEffect, useMemo, useTransition } from 'react';
import { CalendarSelectionDataProvider } from '@/hooks/contexts/useCalendarSelectionData';
import { DEFAULT_FILTER_STATE } from '@/constants/default/FILTERS';
import useGetFeed from '@/hooks/api/useGetFeed';
import useGetFeedItems from '@/hooks/api/useGetFeedItems';
import useGetFeedQuery from '@/hooks/queries/FeedQuery/useGetFeedQuery';
import FeedFilters from '@/components/Common/FeedFilters/FeedFilters';
import { useSetManualFeedQuery } from '@/hooks/queries/FeedQuery/useSetFeedQuery';
import usePrevious from '@/hooks/usePrevious';
import { useTranslation } from 'next-i18next';
import { FilterHandlerProvider } from '@/hooks/useFilterHandler';

import CategoriesSlider from '../Sections/Home/CategoriesSlider/CategoriesSlider';
import Footer from '../Sections/Common/Footer/Footer';

const StyledDesktopCategoriesSlider = styled(CategoriesSlider)`
  display: none;

  ${theme.breakpoints.up('lg')} {
    display: block;
  }
`;

const Home = () => {
  const baseName = 'filters';
  const { t } = useTranslation();
  const [, startTransition] = useTransition();
  const { parsedQuery } = useGetFeedQuery({ enforceOnValidation: true });
  const { handleSetQuery } = useSetManualFeedQuery();
  const form = useForm<IFeedSchema>({
    resolver: yupResolver(feedFiltersSchema),
    defaultValues: {
      filters: parsedQuery || {},
    },
  });

  const isMultiDay = useWatch({ name: `${baseName}.isMultiDay`, control: form.control });

  const filtersByCategory = useFiltersByCategory(form.control);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const categorySelected = useMemo(() => form.getValues(`${baseName}.category`), [form, filtersByCategory]);
  const prevCategory = usePrevious(categorySelected, {
    startValue: parsedQuery?.category ?? null,
  });
  const { data: feedData } = useGetFeed();
  const { data: feedCardsData = [], isLoading: loadingFeedItems } = useGetFeedItems({
    isMultiDay,
    filters: form.getValues()?.filters,
  });
  useEffect(() => {
    const currentValues = form.getValues();
    if (prevCategory === currentValues.filters?.category) return;

    const currentFilters = currentValues.filters || ({} as IFeedSchema['filters']);
    const { defaults = DEFAULT_FILTER_STATE } = filtersByCategory || {};

    const newValues = {
      ...currentValues,
      filters: {
        ...defaults,
        locations: currentFilters?.locations || defaults?.locations?.map(location => ({ value: location.key })),
        category: currentFilters?.category,
      },
    };

    startTransition(() => {
      handleSetQuery(newValues.filters || {});
      form.reset(newValues);
    });
  }, [filtersByCategory, form, handleSetQuery, prevCategory]);

  return (
    <FormProvider {...form}>
      <CalendarSelectionDataProvider baseName={baseName}>
        <FeedFilterHandlersProvider name={baseName}>
          <FilterHandlerProvider>
            <Layout
              title={feedData?.title || ''}
              header={<Header desktopBackCartText={t('home')} />}
              footer={<Footer />}>
              <StyledDesktopCategoriesSlider name={baseName} categorySelected={categorySelected} />
              <FeedFilters baseName={baseName} isMultiDay={isMultiDay} resultsQuantity={feedCardsData.length} />
              <CardContainer cards={feedCardsData} loadingFeedItems={loadingFeedItems} />
            </Layout>
          </FilterHandlerProvider>
        </FeedFilterHandlersProvider>
      </CalendarSelectionDataProvider>
    </FormProvider>
  );
};

export default memo(Home);
