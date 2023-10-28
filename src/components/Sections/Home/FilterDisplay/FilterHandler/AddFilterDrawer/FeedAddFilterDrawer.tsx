import useFiltersByCategory from '@/hooks/useFiltersByCategory';
import { HOURS_OF_DAY_OPTIONS_START, HOURS_OF_DAY_OPTIONS_END } from '@/constants';
import { IFeedFilterOptions, IFeedFilterOptionsKeys, IFilterOptionTimeRange } from '@/types/filters';
import { Box, styled } from '@mui/material';
import { map } from 'lodash';
import { FC, useMemo } from 'react';
import { NonUndefined } from 'react-hook-form';
import theme from '@/theme/theme';

import AddFilterPrice from './AddFilterPrice';
import AmenitySelector from './AmenitySelector';
import FilterTimeRangeOptions from './FilterTimeRangeOptions';
import DatesSelector from './DatesSelector/DatesSelector';
import LocationSelector from './LocationSelector/LocationSelector';

const StyledMobileOnlyWrapper = styled(Box)`
  ${theme.breakpoints.up('md')} {
    display: none;
  }
`;

type Props = {
  name: string;
  onClose: () => void;
  onApply: () => void;
  deleteAllFilters?: () => void;
};

const FeedAddFilterDrawer = ({ name }: Props) => {
  const filtersByCategory = useFiltersByCategory();
  const hasLocation = useMemo(() => {
    return filtersByCategory?.settings?.filtersToShowOnFeed?.includes(IFeedFilterOptionsKeys.locations);
  }, [filtersByCategory?.settings?.filtersToShowOnFeed]);

  const FilterComponents = useMemo<{
    [k in IFeedFilterOptionsKeys]?: FC<NonUndefined<IFeedFilterOptions[k]>>;
  }>(
    () => ({
      [IFeedFilterOptionsKeys.priceRange]: () => (
        <AddFilterPrice
          name={`${name}.priceRange`}
          baseName={name}
          minValue={filtersByCategory?.options?.priceRange?.limits.min}
          maxValue={filtersByCategory?.options?.priceRange?.limits.max}
        />
      ),
      [IFeedFilterOptionsKeys.amenities]: () => (
        <Box>
          {filtersByCategory?.options?.amenities?.map(item => (
            <AmenitySelector key={item.id} title={item.title} options={item.options} name={name} />
          ))}
        </Box>
      ),
      [IFeedFilterOptionsKeys.timeRange]: ({ type, options = [] }: IFilterOptionTimeRange) => (
        <FilterTimeRangeOptions
          name={`${name}.timeRange`}
          baseName={name}
          type={type}
          isAccordion
          customRangeProps={{
            start: { options: HOURS_OF_DAY_OPTIONS_START },
            end: { options: HOURS_OF_DAY_OPTIONS_END },
          }}
          predefinedProps={{ options }}
        />
      ),
    }),
    [
      filtersByCategory?.options?.amenities,
      filtersByCategory?.options?.priceRange?.limits.max,
      filtersByCategory?.options?.priceRange?.limits.min,
      name,
    ]
  );

  return (
    <Box mt='12px'>
      <StyledMobileOnlyWrapper>
        {hasLocation && <LocationSelector name={name} />}
        <DatesSelector name={name} />
      </StyledMobileOnlyWrapper>
      {map(filtersByCategory?.options, (v, k) => {
        const Component = FilterComponents[k as IFeedFilterOptionsKeys];
        if (Component) {
          if (k === IFeedFilterOptionsKeys.timeRange) {
            return (
              <StyledMobileOnlyWrapper key={k}>
                <Component {...v} />
              </StyledMobileOnlyWrapper>
            );
          }
          return <Component key={k} {...v} />;
        }
        return null;
      })}
    </Box>
  );
};

export default FeedAddFilterDrawer;
