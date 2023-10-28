import { useMemo } from 'react';
import theme from '@/theme';
import { transientOptions } from '@/utils/transientOptions';
import { Box, css, styled } from '@mui/material';
import { SupportedIconsEnum } from '@/types/enums';
import { IFeedFilterOptionsKeys, IFilterOptionsKeysValues } from '@/types/filters';

import FilterButton from './FilterButtons/FilterButton';
import FiltersContentHandler from './FiltersContentHandler';

const StyledWrapper = styled(Box)`
  display: flex;
  gap: 8px;
`;

const StyledOpenFiltersButton = styled(FilterButton, transientOptions)<{ $mobileOnly?: boolean }>`
  display: block;

  ${theme.breakpoints.up('md')} {
    display: none;
  }
`;

const StyledScrollableWrapper = styled(Box, transientOptions)<{
  $withLocation: boolean;
  $minPillsOnTablet: number;
  $minPillsOnDesktop: number;
}>`
  ${theme.mixins.layout}
  padding-left: 0;
  display: flex;
  gap: 8px;
  overflow-x: auto;
  white-space: nowrap;
  padding-bottom: 10px;

  &::-webkit-scrollbar {
    display: none;
  }

  ${theme.breakpoints.up('md')} {
    padding: 0;

    ${({ $withLocation, $minPillsOnTablet }) =>
      $withLocation
        ? css`
            display: none;
          `
        : css`
            > :nth-of-type(n + ${$minPillsOnTablet}) {
              display: none;
            }
          `}
  }

  ${theme.breakpoints.up('lg')} {
    ${({ $withLocation }) =>
      $withLocation
        ? css`
            display: flex;
            > :nth-of-type(n + 2) {
              display: none;
            }
          `
        : css`
            display: flex;
            > :nth-of-type(n + 2) {
              display: flex;
            }
            > :nth-of-type(n + 4) {
              display: none;
            }
          `}
  }
`;

type Props = {
  openFiltersModal: () => void;
  filtersToShow?: IFilterOptionsKeysValues[];
  isMultiDay: boolean;
  baseName: string;
  className?: string;
  isFiltered: boolean;
  minExtraFilters: { md: number; lg: number };
};

const MobileScrollableFilters = ({
  openFiltersModal,
  filtersToShow,
  isMultiDay,
  baseName,
  className,
  isFiltered,
  minExtraFilters,
}: Props) => {
  const hasLocation = useMemo(() => {
    return filtersToShow?.includes(IFeedFilterOptionsKeys.locations);
  }, [filtersToShow]);

  const minPillsOnTablet = minExtraFilters.md + 1;
  const minPillsOnDesktop = minExtraFilters.lg + 1;

  return (
    <StyledWrapper className={className}>
      <StyledOpenFiltersButton
        icon={SupportedIconsEnum.TUNE_OUTLINED}
        onClick={openFiltersModal}
        filterSelected={isFiltered}
        iconSize={20}
      />
      <StyledScrollableWrapper
        $withLocation={!!hasLocation}
        $minPillsOnTablet={minPillsOnTablet}
        $minPillsOnDesktop={minPillsOnDesktop}>
        {filtersToShow?.map(filter => (
          <FiltersContentHandler
            key={filter}
            filterType={filter}
            isMultiDay={isMultiDay}
            baseName={baseName}
            openFiltersModal={openFiltersModal}
          />
        ))}
      </StyledScrollableWrapper>
    </StyledWrapper>
  );
};

export default MobileScrollableFilters;
