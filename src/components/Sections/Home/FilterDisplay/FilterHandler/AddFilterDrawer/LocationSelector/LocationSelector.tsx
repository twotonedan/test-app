import theme from '@/theme';
import { Box, Divider, Typography, styled } from '@mui/material';
import LocationFilterButton from '@/components/Common/FeedFilters/FilterButtons/LocationFilterButton';
import { useTranslation } from 'next-i18next';
import { useFeedFilterHandlers } from '@/hooks/contexts/useFeedFilterHandlers';
import AccordionWrapper from '../AccordionWrapper/AccordionWrapper';

const StyledDivider = styled(Divider)`
  display: none;

  ${theme.breakpoints.up('md')} {
    display: flex;
    margin: 0 16px;
  }
`;

const StyledFirstDivider = styled(StyledDivider)``;

const StyledLocationContainer = styled(Box)`
  padding-top: 8px;
  padding-bottom: 16px;
`;

type Props = {
  name: string;
};

const LocationSelector = ({ name }: Props) => {
  const { t } = useTranslation('common');
  const { parsedFilters, filterResetters } = useFeedFilterHandlers();

  const handleClearValues = () => {
    filterResetters?.locations(name);
  };

  return (
    <AccordionWrapper
      title={t('location.title')}
      label={
        <Typography color={theme.palette.customText.secondary} variant='subtitle1'>
          {parsedFilters.locations?.label}
        </Typography>
      }
      onClear={handleClearValues}>
      <StyledLocationContainer>
        <LocationFilterButton baseName={name} locationLabel={parsedFilters?.locations?.label} />
        <StyledFirstDivider flexItem orientation='vertical' />
      </StyledLocationContainer>
    </AccordionWrapper>
  );
};

export default LocationSelector;
