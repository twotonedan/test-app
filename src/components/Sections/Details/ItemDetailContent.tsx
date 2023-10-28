import NiceModal from '@ebay/nice-modal-react';
import { ICardPayload } from '@/types/cards';
import { BookingInformationType } from '@/types/enums';
import FiltersModal from '@/components/Common/FiltersModal';
import { useWatch } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import useUpsellModal from '@/hooks/useUpsellModal';
import { DateOrDateRange } from '@/hooks/formatters/useTwoDigitsFormatDate';
import JoinWaitlistModal from '@/components/Common/JoinWaitlistModal';
import Upsell from '@/components/Common/Upsell';
import useGetBookingQuery from '@/hooks/queries/BookingQuery/useGetBookingQuery';
import { CalendarSelectionDataProvider } from '@/hooks/contexts/useCalendarSelectionData';
import ItemDetailFooter from './Item/ItemDetailFooter';
import ItemDetailSection from './Item/ItemDetailSection';
import ItemDetailDrawer from './Item/ItemDetailDrawer';

type Props = {
  cardData: ICardPayload;
  baseName: string;
  onClearAll: (isMultiDay: boolean) => void;
  bookingInformationFormat: BookingInformationType;
};

const filtersModalId = 'filters-modal-item-detail-content';
const joinWaitlistModalId = 'join-waitlist-modal-item-detail-content';

const ItemDetailContent = ({ cardData, baseName, onClearAll, bookingInformationFormat }: Props) => {
  const { parsedQuery } = useGetBookingQuery();
  const filters = useWatch({ name: baseName });
  const { date: selectedSingleDate, dateRange: selectedDateRange, isMultiDay } = filters;
  const { id: cardId, calendarInfo, defaultAccessories, checkoutMethod, limits } = cardData;

  const { t } = useTranslation(['actions', 'common']);

  const { upsellId, handleOnClickConfirm, formattedDate } = useUpsellModal({
    date: (selectedSingleDate || selectedDateRange) as DateOrDateRange | undefined,
  });

  const handleOnClose = () => NiceModal.hide(filtersModalId);

  const handleClickWaitlist = () => {
    handleOnClose();
    NiceModal.show(joinWaitlistModalId);
  };

  const handleClearAll = () => onClearAll(isMultiDay ?? parsedQuery?.isMultiDay ?? true);

  return (
    <CalendarSelectionDataProvider baseName={baseName} calendarInfo={calendarInfo}>
      <ItemDetailSection
        id={cardId}
        cardData={cardData}
        baseName={baseName}
        bookingInformationFormat={bookingInformationFormat}
        isMultiDay={isMultiDay}
        handleClickWaitlist={handleClickWaitlist}
        defaultAccessories={defaultAccessories}
        checkoutMethod={checkoutMethod}
        onClickConfirm={handleOnClickConfirm}
        onClickWaitlist={handleClickWaitlist}
      />
      <ItemDetailFooter
        id={cardId}
        baseName={baseName}
        formattedDate={formattedDate}
        defaultAccessories={defaultAccessories}
        onClickConfirm={handleOnClickConfirm}
        onClickOpenFilters={() => NiceModal.show(filtersModalId)}
        checkoutMethod={checkoutMethod}
        onClickWaitlist={handleClickWaitlist}
        limits={limits}
      />
      <FiltersModal
        onClose={handleOnClose}
        name={baseName}
        onClearAll={handleClearAll}
        title={t('adjustFilters')}
        id={filtersModalId}>
        <ItemDetailDrawer
          hasSelectedDate={!!formattedDate}
          formBaseName={baseName}
          isSingleDate={!isMultiDay}
          calendarInfo={calendarInfo}
          bookingInformationOption={bookingInformationFormat}
        />
      </FiltersModal>
      <Upsell id={upsellId} cardData={cardData} backText={t('common:itemDetail')} />
      <JoinWaitlistModal
        id={joinWaitlistModalId}
        cardData={cardData}
        bookingInformation={filters}
        bookingInformationFormat={bookingInformationFormat}
        isSingleDate={!isMultiDay}
      />
    </CalendarSelectionDataProvider>
  );
};

export default ItemDetailContent;
