import SliderRange from '@/components/Common/SliderRange';
import { useCurrencyFormatter } from '@/hooks/contexts/useCurrencyFormatter';
import { DEFAULT_PRICE_RANGE } from '@/constants/default/FILTERS';
import theme from '@/theme';
import { FeedFilters } from '@/validationSchemas/feedFiltersSchema/feedFiltersSchema';
import { Box, styled, Typography } from '@mui/material';
import { useMemo } from 'react';
import { useWatch } from 'react-hook-form';
import { calculatePrice } from '@/utils/price';
import { useTranslation } from 'next-i18next';
import { useFeedFilterHandlers } from '@/hooks/contexts/useFeedFilterHandlers';
import AccordionWrapper from '../AccordionWrapper/AccordionWrapper';

const StyledTextContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 8px 8px 24px;
`;

const StyledTypography = styled(Typography)`
  color: ${theme.palette.customText.secondary};
`;

const StyledLabel = styled(Typography)`
  color: ${theme.palette.customText.secondary};
  margin-left: auto;
  display: block;
  text-align: end;
  width: 100%;
`;

type Props = {
  name: string;
  baseName: string;
  minValue?: number;
  maxValue?: number;
};

const AddFilterPrice = ({ name, baseName, minValue = 0, maxValue = 0 }: Props) => {
  const { t } = useTranslation('common');

  const { currencyFormatter } = useCurrencyFormatter();
  const [start, end] = useWatch({ name, defaultValue: DEFAULT_PRICE_RANGE }) as Required<FeedFilters>['priceRange'];
  const minPercentege = useMemo(() => (minValue * 100) / maxValue, [maxValue, minValue]);

  const startPrice = calculatePrice(start, maxValue);
  const endPrice = calculatePrice(end, maxValue);
  const { filterResetters } = useFeedFilterHandlers();

  const handleClearValues = () => {
    filterResetters?.priceRange(baseName);
  };

  const rangeLabel = useMemo(
    () => [t('between'), currencyFormatter.format(startPrice), t('and'), currencyFormatter.format(endPrice)].join(' '),
    [currencyFormatter, endPrice, startPrice, t]
  );

  return (
    <AccordionWrapper
      onClear={handleClearValues}
      title={`${t('priceRange')} (${t('hour')})`}
      label={<StyledTypography variant='subtitle1'>{rangeLabel}</StyledTypography>}>
      <StyledTextContainer>
        <StyledLabel variant='label'>{rangeLabel}</StyledLabel>
        <SliderRange name={name} defaultValue={DEFAULT_PRICE_RANGE} step={5} marks min={minPercentege} />
      </StyledTextContainer>
    </AccordionWrapper>
  );
};

export default AddFilterPrice;
