import { SupportedIconsEnum } from '@/types/enums';
import { useTranslation } from 'next-i18next';
import useValidateField from '@/hooks/useValidateField';
import { startTransition, useCallback, useState } from 'react';
import { useSetFeedQuery } from '@/hooks/queries/FeedQuery/useSetFeedQuery';
import FilterDrawer from '@/components/Sections/Common/DateFilters/FilterDrawer';
import { Box, Drawer, styled } from '@mui/material';
import theme from '@/theme';
import { transientOptions } from '@/utils/transientOptions';
import { useFilterHandler } from '@/hooks/useFilterHandler';

import FilterButton from './FilterButton';

const StyledWrapper = styled(Box, transientOptions)<{ $mobileOnly?: boolean }>`
  ${theme.breakpoints.up('md')} {
    display: none;
  }
`;

const StyledDrawer = styled(Drawer)`
  & > .MuiPaper-root {
    background-color: ${theme.palette.common.white};
    width: 100%;
    box-shadow: none;
    border-radius: 0;
  }
`;

type Props = {
  baseName: string;
  isMultiDay: boolean;
};

const DateFilterButton = ({ isMultiDay, baseName }: Props) => {
  const { handleSetQuery } = useSetFeedQuery({ name: baseName });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { t } = useTranslation();
  const name = isMultiDay ? `${baseName}.dateRange` : `${baseName}.date`;
  const { parsedFilters } = useFilterHandler();

  const handleOpenCalendar = useCallback(() => {
    setIsDrawerOpen(true);
  }, []);

  const handleCloseCalendar = useValidateField({
    name,
    onValid: () =>
      startTransition(() => {
        setIsDrawerOpen(false);
        handleSetQuery();
      }),
  });

  return (
    <StyledWrapper>
      <FilterButton
        value={(parsedFilters?.date || parsedFilters?.dateRange)?.label}
        placeholder={t('date.selectDate')}
        icon={SupportedIconsEnum.CALENDAR_TODAY}
        iconSize={16}
        onClick={handleOpenCalendar}
      />

      <StyledDrawer anchor='right' open={isDrawerOpen} onClose={handleCloseCalendar}>
        <FilterDrawer
          name={name}
          baseName={baseName}
          isMultiDay={isMultiDay}
          withPrices={false}
          onClickBack={handleCloseCalendar}
          onClickSave={handleCloseCalendar}
        />
      </StyledDrawer>
    </StyledWrapper>
  );
};

export default DateFilterButton;
