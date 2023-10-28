import { useCurrencyFormatter } from '@/hooks/contexts/useCurrencyFormatter';
import theme from '@/theme';
import { ICardPayload } from '@/types/cards';
import { IBookingInformation } from '@/validationSchemas/bookingInformationSchema/bookingInformationSchema';
import { ArrowForward, CloseRounded } from '@mui/icons-material';
import { Box, Button, IconButton, styled, Typography } from '@mui/material';
import { ForwardedRef, forwardRef, memo } from 'react';
import { useFormContext } from 'react-hook-form';
import { transientOptions } from '@/utils/transientOptions';
import { useTranslation } from 'next-i18next';
import { useCalendarSelectionData } from '@/hooks/contexts/useCalendarSelectionData';
import FormQuantityCounter from '@/components/Common/FormQuantityCounter';
import DateAndTimeFilters from '@/components/Common/DateAndTimeFilters/DateAndTimeFilters';
import useAddToCart from '@/hooks/useAddToCart';
import { BookingInformationType } from '@/types/enums';
import useRevalidateOnMount from '@/hooks/useRevalidateOnMount';

const StyledWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  padding-top: 12px;
  padding-bottom: 12px;
`;

const StyledHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-left: 4px;
`;

const StyledTypography = styled(Typography)`
  font-weight: 500;
  line-height: 20px;
  color: ${theme.palette.customText.secondary};
`;

const StyledButtonsWrapper = styled(Box, transientOptions)<{ $isSingleDate: boolean }>`
  display: flex;
  margin-top: ${props => (props.$isSingleDate ? '32px' : '48px')};
  flex-wrap: nowrap;
  grid-gap: 8px;
`;

const StyledButton = styled(Button)`
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  white-space: nowrap;
`;

type Props = {
  cardData: ICardPayload;
  bookingData: IBookingInformation;
  formBaseName: string;
  onClickConfirm?: (uniqueId: string) => void;
};

const BookingInformation = (
  { cardData, bookingData, formBaseName: name, onClickConfirm }: Props,
  ref: ForwardedRef<HTMLDivElement>
) => {
  const { t } = useTranslation(['common', 'actions']);
  const { setValue, getValues } = useFormContext();

  useRevalidateOnMount({ name, getFreshValues: () => getValues(name) });

  const { price } = useCalendarSelectionData();
  const { currencyFormatter } = useCurrencyFormatter();

  const handleCloseBookingInfo = () => setValue(name, undefined);

  const isSingleDate = !!bookingData.date;

  const { handleOnClickConfirm, isSubmitDisabled } = useAddToCart({
    itemId: cardData.id,
    defaultAccessories: cardData.defaultAccessories,
    formBaseName: name,
    onClickConfirm,
  });

  return (
    <StyledWrapper ref={ref}>
      <StyledHeader>
        <StyledTypography variant='h4'>{t('common:bookingInformation')}</StyledTypography>
        <IconButton onClick={handleCloseBookingInfo}>
          <CloseRounded color='primary' />
        </IconButton>
      </StyledHeader>

      <DateAndTimeFilters
        name={name}
        isSingleDate={isSingleDate}
        bookingInformationOption={
          (isSingleDate && cardData.bookingInformationOption) || BookingInformationType.CUSTOM_RANGE
        }
        calendarInfo={cardData.calendarInfo}
        withPrices
      />

      <StyledButtonsWrapper $isSingleDate={isSingleDate}>
        <FormQuantityCounter
          name={`${name}.quantity`}
          onTrashClick={handleCloseBookingInfo}
          limits={{ min: 0, max: cardData.limits.max }}
          validateFields={[`${name}.timeRange`, `${name}.dateRange`, `${name}.date`, `${name}.quantity`]}
        />

        <StyledButton
          variant='contained'
          onClick={handleOnClickConfirm}
          endIcon={<ArrowForward />}
          disabled={isSubmitDisabled}
          fullWidth>
          {`${t('actions:confirm')} ${currencyFormatter.format(price || 0)}`}
        </StyledButton>
      </StyledButtonsWrapper>
    </StyledWrapper>
  );
};

export default memo(forwardRef(BookingInformation));
