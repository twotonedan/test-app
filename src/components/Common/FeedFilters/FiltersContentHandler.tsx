import { AllSupportedFilterKeys, IFilterOptionsKeysValues } from '@/types/filters';
import { useMemo } from 'react';
import { useTranslation } from 'next-i18next';

import FilterButton from './FilterButtons/FilterButton';
import DateFilterButton from './FilterButtons/DateFilterButton';

type Props = {
  filterType: IFilterOptionsKeysValues;
  isMultiDay: boolean;
  baseName: string;
  openFiltersModal: () => void;
  // parsedFilters: ParsedFilterType;
};

const FiltersContentHandler = ({ isMultiDay, baseName, filterType, openFiltersModal }: Props) => {
  const { t } = useTranslation();

  const filtersToShow = useMemo<{ [K in keyof typeof AllSupportedFilterKeys]?: JSX.Element }>(
    () => ({
      [AllSupportedFilterKeys.dateOrDateRange]: <DateFilterButton baseName={baseName} isMultiDay={isMultiDay} />,
      [AllSupportedFilterKeys.timeRange]: (
        <FilterButton placeholder={t('time.selectTime')} onClick={openFiltersModal} />
      ),
      [AllSupportedFilterKeys.priceRange]: (
        <FilterButton placeholder={t('price.selectPrice')} onClick={openFiltersModal} />
      ),
      [AllSupportedFilterKeys.amenities]: (
        <FilterButton placeholder={t('amenities.selectAmenities')} onClick={openFiltersModal} />
      ),
      [AllSupportedFilterKeys.status]: <FilterButton placeholder={t('status')} onClick={openFiltersModal} />,
      [AllSupportedFilterKeys.unit]: <FilterButton placeholder={t('unit')} onClick={openFiltersModal} />,
    }),
    [t, baseName, isMultiDay, openFiltersModal]
  );

  return filtersToShow[filterType] || null;
};

export default FiltersContentHandler;
