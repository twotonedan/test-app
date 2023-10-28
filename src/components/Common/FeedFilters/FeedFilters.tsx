import theme from '@/theme/theme';
import { Box, styled } from '@mui/material';
import { useSetFeedQuery } from '@/hooks/queries/FeedQuery/useSetFeedQuery';
import { startTransition, useId, useMemo } from 'react';
import useValidateField from '@/hooks/useValidateField';
import { useFeedFilterHandlers } from '@/hooks/contexts/useFeedFilterHandlers';
import SwitcherFilter from '@/components/Sections/Home/FilterDisplay/SwitcherFilter';
import FeedAddFilterDrawer from '@/components/Sections/Home/FilterDisplay/FilterHandler/AddFilterDrawer';
import NiceModal from '@ebay/nice-modal-react';
import { useTranslation } from 'next-i18next';
import useFiltersByCategory from '@/hooks/useFiltersByCategory';
import { IFeedFilterOptionsKeys } from '@/types/filters';
import useIsMobile from '@/hooks/useIsMobile';

import FiltersModal from '../FiltersModal';
import FiltersContent from './FiltersContent';

const StyledFiltersWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 10px;

  ${theme.breakpoints.up('md')} {
    ${theme.mixins.layout};
    gap: 24px;
  }
`;

type FeedFiltersProps = {
  baseName: string;
  resultsQuantity: number;
  isMultiDay: boolean;
};

export type DateFilter = {
  start: string | Date;
  end: string | Date;
  date: string | Date;
};

const FeedFilters = ({ isMultiDay, baseName, resultsQuantity }: FeedFiltersProps) => {
  const { handleSetQuery } = useSetFeedQuery({ name: baseName });

  const { isFiltered: filterSelected, flattedFilters, handleDeleteAllFilters } = useFeedFilterHandlers();
  const modalId = useId();
  const filtersModalId = `filters-modal-${modalId}`;
  const { t } = useTranslation();
  const filtersByCategory = useFiltersByCategory();
  const isMobile = useIsMobile();

  const handleCloseFiltersModal = useValidateField({
    name: baseName,
    onValid: () =>
      startTransition(() => {
        NiceModal.hide(filtersModalId);
        handleSetQuery();
      }),
    onNoValid: () => {
      if (!isMobile) {
        NiceModal.hide(filtersModalId);
        handleSetQuery();
      }
    },
  });

  const showLocation = useMemo(() => {
    return filtersByCategory?.settings?.filtersToShowOnFeed?.includes(IFeedFilterOptionsKeys.locations);
  }, [filtersByCategory?.settings?.filtersToShowOnFeed]);

  return (
    <Box>
      <StyledFiltersWrapper>
        <FiltersContent
          baseName={baseName}
          isMultiDay={isMultiDay}
          openFiltersModal={() => NiceModal.show(filtersModalId)}
          filtersToShow={filtersByCategory?.settings?.filtersToShowOnFeed}
          showLocation={showLocation}
          isFiltered={filterSelected}
          minExtraFilters={{ md: 1, lg: 3 }}
        />
        <SwitcherFilter
          name={baseName}
          disabled={!flattedFilters.length}
          resultsQuantity={resultsQuantity}
          filterSelected={filterSelected}
        />
      </StyledFiltersWrapper>

      <FiltersModal
        onClose={handleCloseFiltersModal}
        onClearAll={handleDeleteAllFilters}
        title={t('common:filters')}
        name={baseName}
        showResults
        id={filtersModalId}>
        <FeedAddFilterDrawer
          name={baseName}
          onClose={handleCloseFiltersModal}
          onApply={handleCloseFiltersModal}
          deleteAllFilters={handleDeleteAllFilters}
        />
      </FiltersModal>
    </Box>
  );
};

export default FeedFilters;
