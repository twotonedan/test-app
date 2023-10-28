import Switch from '@/components/Common/Switch';
import { DEFAULT_FILTER_STATE } from '@/constants/default/FILTERS';
import useFiltersByCategory from '@/hooks/useFiltersByCategory';
import theme from '@/theme';
import { transientOptions } from '@/utils/transientOptions';
import { Box, styled, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';

const StyledWrapper = styled(Box, transientOptions)<{ $filterSelected: boolean }>`
  ${theme.mixins.layout}
  display: flex;
  justify-content: ${props => (props.$filterSelected ? 'space-between' : 'flex-end')};
  align-items: center;
  position: relative;

  ${theme.breakpoints.up('md')} {
    padding: 0;
  }
`;

const StyledResultsText = styled(Typography)``;

type Props = {
  disabled: boolean;
  resultsQuantity: number;
  name?: string;
  filterSelected: boolean;
};

const SwitcherFilter = ({ disabled, resultsQuantity, name: baseName, filterSelected }: Props) => {
  const { t } = useTranslation(['common', 'filters']);
  const filters = useFiltersByCategory();

  return (
    <StyledWrapper $filterSelected={filterSelected}>
      {filterSelected && (
        <Switch
          name={`${baseName}.showUnavailable`}
          disabled={disabled}
          defaultChecked={filters?.defaults?.showUnavailable || DEFAULT_FILTER_STATE.showUnavailable}
          label={t('filters:showUnavailableToo')}
        />
      )}
      <StyledResultsText variant='subtitle1' sx={{ lineHeight: '20px', color: theme.palette.customText.secondary }}>
        {`${filterSelected ? t('common:results') : t('common:allResults')} (${resultsQuantity})`}
      </StyledResultsText>
    </StyledWrapper>
  );
};

export default SwitcherFilter;
