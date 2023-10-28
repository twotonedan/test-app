import { CalendarSelectionDataProvider } from '@/hooks/contexts/useCalendarSelectionData';
import { useFeedFilterHandlers } from '@/hooks/contexts/useFeedFilterHandlers';
import { ICardPayload } from '@/types/cards';
import bookingInformationSchema, {
  IBookingInformationSchema,
} from '@/validationSchemas/bookingInformationSchema/bookingInformationSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, styled, Divider } from '@mui/material';
import { AnimatePresence, motion, useWillChange } from 'framer-motion';
import { memo, useId } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { transientOptions } from '@/utils/transientOptions';
import useUpsellModal from '@/hooks/useUpsellModal';
import { useTranslation } from 'next-i18next';
import NiceModal from '@ebay/nice-modal-react';
import { BookingInformationType } from '@/types/enums';
import JoinWaitlistModal from '@/components/Common/JoinWaitlistModal';
import theme from '@/theme';

import { defaultState } from '@/hooks/queries/BookingQuery/useGetBookingQuery';

import BookingInformation from './BookingInformation';
import ButtonRow from './ButtonRow';
import TopSection from './TopSection';
import Upsell from '../Upsell/Upsell';
import OtherDatesList from '../OtherDatesList/OtherDatesList';

const StyledWrapper = styled(Box, transientOptions)<{ $isUnavailable?: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 8px 8px 12px;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 1px rgba(0, 0, 0, 0.12), 0px 1px 3px rgba(0, 0, 0, 0.2);
  border-radius: 16px;
  background-color: ${props =>
    props.$isUnavailable ? props.theme.palette.customColors.lightGray : props.theme.palette.common.white};
  box-sizing: border-box;
  overflow: hidden;
  ${theme.breakpoints.up('lg')} {
    padding: 16px 16px 12px;
  }
`;

type Props = {
  cardData: ICardPayload;
  isUnavailable: boolean;
};

const ItemCard = ({ cardData, isUnavailable }: Props) => {
  const willChange = useWillChange();
  const formBaseName = 'bookingInformation';
  const { isFiltered } = useFeedFilterHandlers();
  const form = useForm<IBookingInformationSchema>({
    resolver: yupResolver(bookingInformationSchema),
    defaultValues: { bookingInformation: defaultState },
  });

  const bookingData = useWatch({ name: formBaseName, control: form.control });
  const hasBookingDateSelected = !!bookingData?.date || !!bookingData?.dateRange;
  const bookingInformationOption = bookingData?.timeRange?.type ?? BookingInformationType.CUSTOM_RANGE;

  const { t } = useTranslation(['actions', 'common']);
  const cardDate = cardData.date || cardData.dateRange;
  const { upsellId, handleOnClickConfirm, formattedDate } = useUpsellModal({
    date: cardDate,
  });

  const waitlistId = useId();
  const joinWaitlistModalId = `join-waitlist-modal-${waitlistId}-${cardData.id}`;

  const onClickWaitlist = () => {
    NiceModal.show(joinWaitlistModalId);
  };

  return (
    <StyledWrapper $isUnavailable={isUnavailable} component='article'>
      <FormProvider {...form}>
        <CalendarSelectionDataProvider baseName={formBaseName} calendarInfo={cardData.calendarInfo}>
          <TopSection cardData={cardData} isUnavailable={isUnavailable} formattedCardDate={formattedDate} />
          <AnimatePresence mode='popLayout' initial={false}>
            {!hasBookingDateSelected ? (
              <motion.div
                key='withoutBookingData'
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ bounce: 0 }}
                style={{ willChange }}>
                <ButtonRow
                  formBaseName={formBaseName}
                  cardData={cardData}
                  withAppliedFilters={isFiltered}
                  formattedCardDate={formattedDate}
                  isUnavailable={isUnavailable}
                  onClickWaitlist={onClickWaitlist}
                />
                <Divider />
                <OtherDatesList
                  formBaseName={formBaseName}
                  isSingleDate={!!cardData.date}
                  limit={3}
                  title={isFiltered ? t('common:availableDates') : t('common:otherDatesAvailable')}
                  showMore
                  calendarInfo={cardData.calendarInfo}
                />
              </motion.div>
            ) : (
              <motion.div
                key='withBookingData'
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ bounce: 0 }}
                style={{ willChange }}>
                <Divider />
                <BookingInformation
                  cardData={cardData}
                  bookingData={bookingData}
                  formBaseName={formBaseName}
                  onClickConfirm={handleOnClickConfirm}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </CalendarSelectionDataProvider>
      </FormProvider>
      <Upsell id={upsellId} cardData={cardData} backText={t('common:home')} />
      <JoinWaitlistModal
        id={joinWaitlistModalId}
        cardData={cardData}
        isSingleDate={!!cardData.date}
        bookingInformation={bookingData}
        bookingInformationFormat={bookingInformationOption}
      />
    </StyledWrapper>
  );
};

export default memo(ItemCard);
