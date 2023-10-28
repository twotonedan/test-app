import { styled } from '@mui/material';
import { useTranslation } from 'next-i18next';
import DateFilters from '@/components/Sections/Common/DateFilters/DateFilters';
import { IDateRangeCalendarInfo } from '@/types/common';
import { BookingInformationType } from '@/types/enums';
import OtherDatesList from '@/components/Common/OtherDatesList/OtherDatesList';
import BookingComponent from '@/components/Common/BookingComponent/BookingComponent';
import ModalSection from '@/components/Common/FiltersModal/ModalSection';

const StyledOtherDates = styled(OtherDatesList)`
  margin: 24px 0 0;
  grid-gap: 12px;
`;

type Props = {
  formBaseName: string;
  isSingleDate: boolean;
  calendarInfo: IDateRangeCalendarInfo;
  bookingInformationOption: BookingInformationType;
  hasSelectedDate: boolean;
};

const ItemDetailDrawer = ({
  formBaseName,
  isSingleDate,
  calendarInfo,
  bookingInformationOption,
  hasSelectedDate,
}: Props) => {
  const { t } = useTranslation('common');

  return (
    <>
      <ModalSection title={t('dates')}>
        <DateFilters defaultIsMultiDay={!isSingleDate} name={formBaseName} calendarInfo={calendarInfo} />
        {hasSelectedDate && (
          <StyledOtherDates
            calendarInfo={calendarInfo}
            formBaseName={formBaseName}
            title={t('common:otherDatesAvailable')}
            isSingleDate={isSingleDate}
            limit={2}
          />
        )}
      </ModalSection>
      <ModalSection title={t('time.times')}>
        <BookingComponent
          type={bookingInformationOption}
          name={`${formBaseName}.timeRange`}
          validateFields={[`${formBaseName}.timeRange`, `${formBaseName}.dateRange`, `${formBaseName}.date`]}
        />
      </ModalSection>
    </>
  );
};

export default ItemDetailDrawer;
