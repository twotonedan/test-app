import DateFilters from '@/components/Sections/Common/DateFilters';
import { Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useMemo } from 'react';
import { useWatch } from 'react-hook-form';
import ModalSection from '@/components/Common/FiltersModal/ModalSection';
import theme from '@/theme/theme';
import { format } from 'date-fns';
import { useFeedFilterHandlers } from '@/hooks/contexts/useFeedFilterHandlers';

type Props = {
  name: string;
};

const FORMAT = 'dd/LL/yyyy';

const DatesSelector = ({ name }: Props) => {
  const { t } = useTranslation(['common']);
  const isMultiDay = useWatch({ name: `${name}.isMultiDay`, defaultValue: true });
  const timeValueDateRange = useWatch({ name: `${name}.dateRange` });
  const timeValueDate = useWatch({ name: `${name}.date` });
  const { filterResetters } = useFeedFilterHandlers();

  const handleClearValues = () => {
    if (isMultiDay) {
      filterResetters?.dateRange(name);
    } else {
      filterResetters?.date(name);
    }
  };

  const getDatesLabel = useMemo(
    () => (
      <Typography color={theme.palette.customText.secondary} variant='subtitle1'>
        {isMultiDay ? (
          <>
            {timeValueDateRange?.start && `${t('from')} ${format(timeValueDateRange?.start, FORMAT)}`}
            {timeValueDateRange?.end && `${t('to')} ${format(timeValueDateRange?.end, FORMAT)}`}
          </>
        ) : (
          timeValueDate && format(timeValueDate, FORMAT)
        )}
      </Typography>
    ),
    [isMultiDay, t, timeValueDate, timeValueDateRange?.end, timeValueDateRange?.start]
  );

  return (
    <ModalSection title={t('dates')} isAccordion onClear={handleClearValues} label={getDatesLabel} defaultOpen>
      <DateFilters name={name} withPrices={false} />
    </ModalSection>
  );
};

export default DatesSelector;
