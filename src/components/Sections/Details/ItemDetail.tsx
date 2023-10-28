/* eslint-disable consistent-return */
import Layout from '@/components/Layout';
import { DEFAULT_DATE_SELECTED_RANGE, DEFAULT_TIME_RANGE_VALUES } from '@/constants/default/FILTERS';
import useGetBookingQuery, { defaultState } from '@/hooks/queries/BookingQuery/useGetBookingQuery';
import { BookingInformationType } from '@/types/enums';
import bookingInformationSchema from '@/validationSchemas/bookingInformationSchema';
import {
  IBookingInformationSchema,
  IBookingInformation,
} from '@/validationSchemas/bookingInformationSchema/bookingInformationSchema';
import NiceModal from '@ebay/nice-modal-react';
import { yupResolver } from '@hookform/resolvers/yup';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import { useForm, FormProvider, useWatch } from 'react-hook-form';
import { ICardPayload } from '@/types/cards';
import { useRouteProps } from '@/hooks/contexts/useRouteProps';
import { IsEditingModeProvider } from '@/hooks/contexts/useIsEditingMode';
import useItemDetailEditing from '@/hooks/useItemDetailEditing';
import Cart from '@/components/Common/Cart/Cart';
import useShouldPopulateLS from '@/hooks/localStorage/useShouldPopulateLS';
import useLastBookingLS from '@/hooks/localStorage/useLastBookingLS';
import { useTranslation } from 'next-i18next';

import ItemDetailContent from './ItemDetailContent';
import ItemDetailHeader from './Item/ItemDetailHeader/ItemDetailHeader';
import Footer from '../Common/Footer/Footer';

const baseName = 'bookingInformation';

type Props = {
  cardId: string;
  cardData: ICardPayload;
};

const cartModalId = 'cart-modal-item-detail';

const ItemDetail = ({ cardId, cardData }: Props) => {
  const { back } = useRouteProps();
  const { t } = useTranslation();
  const { shouldPopulateLS, removeItem } = useShouldPopulateLS();
  const { parsedBookingInformation } = useLastBookingLS();
  const [isPopulatedByLS, setIsPopulatedByLS] = useState<boolean>(false);

  const { parsedQuery } = useGetBookingQuery({ enforceOnValidation: true });
  const form = useForm<IBookingInformationSchema>({
    resolver: yupResolver(bookingInformationSchema),
    defaultValues: { bookingInformation: defaultState },
  });

  useEffect(() => {
    if (shouldPopulateLS && parsedBookingInformation) {
      setIsPopulatedByLS(true);
      form.setValue(baseName, parsedBookingInformation, { shouldDirty: true, shouldValidate: true });
      removeItem();
    }
  }, [shouldPopulateLS, removeItem, parsedBookingInformation, form]);

  const filters = useWatch({ name: baseName, control: form.control });
  const { isMultiDay } = filters;

  const { bookingInformationOption } = cardData;
  const bookingInformationFormat =
    !isMultiDay && bookingInformationOption ? bookingInformationOption : BookingInformationType.CUSTOM_RANGE;

  const handleClearAll = (_isMultiDay: boolean, shouldValidate = true) => {
    form.reset({
      [baseName]: {
        ...defaultState,
        isMultiDay: _isMultiDay ?? true,
        date: null,
        dateRange: DEFAULT_DATE_SELECTED_RANGE,
        timeRange: DEFAULT_TIME_RANGE_VALUES[bookingInformationFormat],
      } as IBookingInformation,
    });

    if (shouldValidate) form.trigger();
  };

  const { isEditingEnabled } = useItemDetailEditing({
    cardId,
    form,
    baseName,
    onClearAll: () => handleClearAll(isMultiDay, false),
    disabled: isPopulatedByLS || !isEmpty(parsedQuery),
  });

  useEffect(() => {
    if (isEmpty(parsedQuery)) return;
    form.setValue(baseName, { ...defaultState, ...parsedQuery } as IBookingInformation, {
      shouldDirty: true,
      shouldValidate: true,
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const { title } = cardData;

  return (
    <>
      <FormProvider {...form}>
        <Layout
          title={`Stellar | ${title}`}
          header={<ItemDetailHeader title={title} onClickBack={back} onClickCart={() => NiceModal.show(cartModalId)} />}
          footer={<Footer />}>
          <IsEditingModeProvider isEditing={isEditingEnabled}>
            <ItemDetailContent
              baseName={baseName}
              cardData={cardData}
              onClearAll={handleClearAll}
              bookingInformationFormat={bookingInformationFormat}
            />
          </IsEditingModeProvider>
        </Layout>
      </FormProvider>
      <Cart id={cartModalId} desktopBackText={t('itemDetail')} />
    </>
  );
};

export default ItemDetail;
