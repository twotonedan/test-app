import theme from '@/theme';
import { Box, Divider, styled } from '@mui/material';
import { transientOptions } from '@/utils/transientOptions';
import DateFilters from '@/components/Sections/Common/DateFilters';
import { SupportedIconsEnum } from '@/types/enums';
import { IFilterOptionsKeysValues } from '@/types/filters';
import { useSetFeedQuery } from '@/hooks/queries/FeedQuery/useSetFeedQuery';
import { useFilterHandler } from '@/hooks/useFilterHandler';

import FilterButton from './FilterButtons/FilterButton';
import LocationFilterButton from './FilterButtons/LocationFilterButton';
import MobileScrollableFilters from './MobileScrollableFilters';

const StyledFiltersWrapper = styled(Box)`
  display: flex;
  gap: 16px;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 20px;

  ${theme.breakpoints.up('md')} {
    border: 1px solid ${theme.palette.customColors.lightGray};
    box-shadow: 0px 1px 4px rgba(42, 51, 60, 0.16);
    border-radius: 16px;
    padding: 20px 16px;
    gap: 0;
    flex-direction: row;
    align-items: center;
    margin-top: 24px;
  }

  ${theme.breakpoints.up('lg')} {
    padding: 24px;
    margin-top: 40px;
  }
`;

const StyledMobileWrapper = styled(Box)`
  ${theme.breakpoints.down('md')} {
    ${theme.mixins.layout}
    padding-right: 0;
  }
`;

const StyledDivider = styled(Divider)`
  display: none;

  ${theme.breakpoints.up('md')} {
    display: flex;
    margin: 0 16px;
  }
`;

const StyledSecondDivider = styled(StyledDivider, transientOptions)<{ $withLocation: boolean }>`
  ${theme.breakpoints.up('md')} {
    display: ${props => (props.$withLocation ? 'none' : 'flex')};
  }

  ${theme.breakpoints.up('lg')} {
    display: flex;
  }
`;

const StyledLocationButtonWrapper = styled(Box)`
  ${theme.mixins.layout};

  ${theme.breakpoints.up('md')} {
    display: flex;
    padding: 0;
    margin: 0;
    max-width: 40%;
  }

  ${theme.breakpoints.up('lg')} {
    max-width: 30%;
  }
`;

const StyledOpenFiltersWrapper = styled(Box)`
  display: none;

  ${theme.breakpoints.up('md')} {
    display: flex;
    margin-left: auto;
  }
`;

const StyledDateFilterWrapper = styled(Box)`
  display: none;

  ${theme.breakpoints.up('md')} {
    display: flex;
    width: 100%;
    max-width: 60%;
  }

  ${theme.breakpoints.up('lg')} {
    width: 40%;
  }
`;

const StyledDateFilters = styled(DateFilters)`
  width: 100%;
`;

type Props = {
  baseName: string;
  isMultiDay: boolean;
  openFiltersModal: () => void;
  filtersToShow?: IFilterOptionsKeysValues[];
  showLocation?: boolean;
  isFiltered: boolean;
  minExtraFilters: { md: number; lg: number };
};

const FiltersContent = ({
  isMultiDay,
  baseName,
  filtersToShow,
  showLocation,
  openFiltersModal,
  isFiltered,
  minExtraFilters,
}: Props) => {
  const { handleSetQuery } = useSetFeedQuery({ name: baseName });
  const { parsedFilters } = useFilterHandler();

  return (
    <StyledFiltersWrapper>
      {showLocation && (
        <StyledLocationButtonWrapper>
          <LocationFilterButton baseName={baseName} locationLabel={parsedFilters?.locations?.label} />
          <StyledDivider flexItem orientation='vertical' />
        </StyledLocationButtonWrapper>
      )}

      <StyledDateFilterWrapper>
        <StyledDateFilters name={baseName} withPrices={false} onClickSaveInsideCalendar={handleSetQuery} />
        <StyledSecondDivider $withLocation={!!showLocation} flexItem orientation='vertical' />
      </StyledDateFilterWrapper>

      <StyledMobileWrapper>
        <MobileScrollableFilters
          filtersToShow={filtersToShow}
          openFiltersModal={openFiltersModal}
          isMultiDay={isMultiDay}
          baseName={baseName}
          isFiltered={isFiltered}
          minExtraFilters={minExtraFilters}
        />
      </StyledMobileWrapper>

      <StyledOpenFiltersWrapper>
        <StyledDivider flexItem orientation='vertical' />
        <FilterButton
          icon={SupportedIconsEnum.TUNE_OUTLINED}
          onClick={openFiltersModal}
          filterSelected={isFiltered}
          iconSize={20}
        />
      </StyledOpenFiltersWrapper>
    </StyledFiltersWrapper>
  );
};

export default FiltersContent;
