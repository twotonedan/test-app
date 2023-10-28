import { PencilIcon } from '@/assets';
import BookingButtons from '@/components/BookingButtons/BookingButtons';
import FooterDrawer from '@/components/Common/FooterDrawer/FooterDrawer';
import { useCalendarSelectionData } from '@/hooks/contexts/useCalendarSelectionData';
import { AccessoryData } from '@/hooks/contexts/useCartData';
import { useCurrencyFormatter } from '@/hooks/contexts/useCurrencyFormatter';
import { useIsEditingMode } from '@/hooks/contexts/useIsEditingMode';
import useAddToCart from '@/hooks/useAddToCart';
import useCheckoutLabel from '@/hooks/useCheckoutLabel';
import theme from '@/theme/theme';
import { IQuantityLimits } from '@/types/common';
import { CheckoutMethod } from '@/types/enums';
import { transientOptions } from '@/utils/transientOptions';
import { Box, Button, SvgIcon, Typography, styled } from '@mui/material';
import { useTranslation } from 'next-i18next';
import FormQuantityCounter from '@/components/Common/FormQuantityCounter/FormQuantityCounter';
import { useMemo } from 'react';

const StyledTopContainer = styled(Box, transientOptions)<{ $isUnavailable: boolean }>`
  ${theme.mixins.layout};
  display: flex;
  justify-content: space-between;
  padding-bottom: 4px;
  ${props => !props.$isUnavailable && 'margin-bottom: 8px;'}
`;

const SyledTypography = styled(Typography)`
  font-weight: 600;
  line-height: 26px;
  color: ${theme.palette.customText.primary};
`;

const StyledPriceText = styled(SyledTypography)`
  margin: 4px 8px 0 0;
`;

const StyledDrawerButton = styled(Button, transientOptions)<{ $isUnavailable: boolean }>`
  ${theme.mixins.resetButton}
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  ${props =>
    props.$isUnavailable &&
    `color: ${theme.palette.error.main};
     text-decoration: line-through;
   `}
  padding: 6px 8px;

  & .MuiSvgIcon-root {
    font-size: 23px;
  }
`;

const StyledFooterDrawer = styled(FooterDrawer)`
  ${theme.breakpoints.up('md')} {
    display: none;
  }
`;

const StyledBottomContainer = styled(Box)`
  ${theme.mixins.layout};
  display: flex;
  grid-gap: 8px;
`;

const StyledBookingButtons = styled(BookingButtons)`
  padding: 0;
`;

type Props = {
  id: string;
  baseName: string;
  defaultAccessories: AccessoryData[];
  onClickOpenFilters?: () => void;
  formattedDate: string | null;
  onClickConfirm?: (uniqueId: string) => void;
  checkoutMethod: CheckoutMethod;
  onClickWaitlist?: () => void;
  limits: IQuantityLimits;
};

const ItemDetailFooter = ({
  id,
  baseName,
  formattedDate,
  defaultAccessories,
  onClickConfirm,
  onClickOpenFilters,
  checkoutMethod,
  onClickWaitlist,
  limits,
}: Props) => {
  const { t } = useTranslation('actions');
  const isEditingMode = useIsEditingMode();

  const buttonDateLabel = useMemo(() => formattedDate || t('actions:selectDates'), [formattedDate, t]);
  const { currencyFormatter } = useCurrencyFormatter();
  const { price, isUnavailable } = useCalendarSelectionData();
  const { handleOnClickConfirm, isSubmitDisabled } = useAddToCart({
    isEditingMode,
    itemId: id,
    defaultAccessories,
    formBaseName: baseName,
    onClickConfirm,
    resetQueryParam: true,
  });

  const checkoutButtonLabel = useCheckoutLabel(checkoutMethod);

  return (
    <StyledFooterDrawer>
      <StyledTopContainer $isUnavailable={isUnavailable || false}>
        <StyledDrawerButton
          $isUnavailable={isUnavailable || false}
          endIcon={formattedDate && <SvgIcon component={PencilIcon} />}
          onClick={onClickOpenFilters}>
          {buttonDateLabel}
        </StyledDrawerButton>
        <StyledPriceText variant='h2'>
          {!isUnavailable && price ? currencyFormatter.format(price) : '--'}
        </StyledPriceText>
      </StyledTopContainer>
      <StyledBottomContainer>
        {!isUnavailable && (
          <FormQuantityCounter sizeSmall name={`${baseName}.quantity`} limits={limits} disableSubstract hideTrash />
        )}

        <StyledBookingButtons
          isUnavailable={isUnavailable}
          isDisabled={!isUnavailable && isSubmitDisabled}
          onMainButtonClick={handleOnClickConfirm}
          mainButtonLabel={!isEditingMode ? checkoutButtonLabel : t('actions:updateCartItem')}
          onClickWaitlist={onClickWaitlist}
          isDisabledMainButton={isUnavailable || isSubmitDisabled}
        />
      </StyledBottomContainer>
    </StyledFooterDrawer>
  );
};

export default ItemDetailFooter;
