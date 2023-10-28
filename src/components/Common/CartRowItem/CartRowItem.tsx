import theme from '@/theme/theme';
import { IQuantityLimits } from '@/types/common';
import { transientOptions } from '@/utils/transientOptions';
import { Box, ButtonBase, Typography, css } from '@mui/material';
import { styled } from '@mui/system';
import Image, { StaticImageData } from 'next/image';
import { DeleteOutline, ErrorOutline } from '@mui/icons-material';
import { useTranslation } from 'next-i18next';
import { IBookingInformation } from '@/validationSchemas/bookingInformationSchema/bookingInformationSchema';
import { ILocation } from '@/types/accessories';
import { useCallback, useId, useMemo } from 'react';
import { useCurrentCartItem } from '@/hooks/contexts/useCurrentCartItem';
import { deepmerge } from '@mui/utils';
import NiceModal from '@ebay/nice-modal-react';
import { useCartData } from '@/hooks/contexts/useCartData';
import ItemDetails from './ItemDetails';
import CartInfo from './CartInfo';
import EditMenu from './EditMenu/EditMenu';
import LocationModal from '../Upsell/LocationModal/LocationModal';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import LocationItemWithPrices from '../Upsell/LocationModal/LocationItemWithPrices';

const StyledWrapper = styled(Box, transientOptions)<{ $isChild: boolean }>`
  width: 100%;
  padding-top: 8px;
  padding-bottom: 8px;

  ${({ $isChild }) =>
    $isChild &&
    css`
      background-color: ${theme.palette.customColors.lightGray};
      border-top: 1px solid ${theme.palette.customColors.gray};
    `}
`;

const StyledInnerWrapper = styled(Box)`
  ${theme.mixins.layout};
  position: relative;
  display: flex;
  flex-direction: column;
  row-gap: 8px;

  ${theme.breakpoints.up('lg')} {
    padding-left: 24px;
    padding-right: 32px;
  }
`;

const StyledTopRow = styled(Box)`
  display: flex;
  column-gap: 12px;
`;

const StyledBottomRow = styled(Box)`
  display: flex;
  column-gap: 5.6px;
  align-items: center;
`;

const StyledImage = styled(Image)`
  width: 88px;
  height: 88px;
  border-radius: 8px;
  object-fit: cover;
  object-position: center;
`;

const StyledContentWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  row-gap: 12px;
  color: ${theme.palette.customText.primary};
  width: 100%;
  padding-top: 8px;
  padding-bottom: 8px;
`;

const StyledTitle = styled(Typography)`
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;

  ${theme.breakpoints.up('lg')} {
    font-size: 20px;
  }
`;

const StyledErrorOutline = styled(ErrorOutline)`
  width: 20px;
  height: 20px;
  color: ${theme.palette.error.main};
`;

const StyledMandatoryText = styled(Typography)`
  font-weight: 500;
  color: ${theme.palette.customText.secondary};
  ${theme.breakpoints.up('lg')} {
    font-size: 14px;
  }
`;

const StyledEditContainer = styled(Box)`
  position: absolute;
  right: 8px;
  top: 8px;
`;

const StyledHeader = styled(Box)`
  display: flex;
`;

const StyledIconButton = styled(ButtonBase, transientOptions)<{ $hide: boolean }>`
  margin-left: auto;
  align-items: center;
  border-radius: 0;
  padding: 6px;

  ${props => props.$hide && 'display: none;'}

  & > .MuiSvgIcon-root {
    color: ${theme.palette.error.main};
  }
`;

const StyledMobileOnlyWrapper = styled(Box)`
  display: block;

  ${theme.breakpoints.up('md')} {
    display: none;
  }
`;

const StyledLargerScreensWrapper = styled(Box)`
  display: none;
  ${theme.breakpoints.up('md')} {
    display: block;
  }
`;

type Props = {
  $uniqueId: string;
  cardId?: string;
  parentTitle?: string;
  isMandatory?: boolean;
  image: StaticImageData;
  alt: string;
  title: string;
  parentQuantity?: number;
  quantity: number;
  limits: IQuantityLimits;
  handleAddClick: (quantity: number) => void;
  handleRemoveClick: (quantity: number) => void;
  price: number;
  className?: string;
  showData?: boolean;
  bookingInformation?: IBookingInformation;
  onClose?: () => void;
  onClosePreCartModal?: () => void;
  locations?: ILocation[];
  id: string;
};

const CartRowItem = ({
  $uniqueId,
  cardId,
  parentTitle,
  isMandatory = false,
  image,
  alt,
  title,
  parentQuantity,
  quantity,
  limits,
  handleAddClick,
  handleRemoveClick,
  price,
  showData,
  className,
  bookingInformation,
  onClose,
  locations,
  id: accessoryId,
  onClosePreCartModal,
}: Props) => {
  const { t } = useTranslation('common');
  const quantityAndPriceData = {
    quantity,
    // If the item is mandatory, we need to multiply the min limit by the parent quantity to avoid the user to remove a mandatory accessory
    limits: deepmerge(limits, { min: isMandatory ? limits.min * (parentQuantity || 1) : limits.min }),
    handleAddClick,
    handleRemoveClick,
    price,
  };
  const { cartItem, handleSetAccessoryQuantity, handleRemoveAllAccessoryQuantity } = useCurrentCartItem();
  const { removeFromCart } = useCartData();

  const id = useId();
  const locationModalId = `location-modal-${id}`;
  const locationInCart = useMemo(
    () => cartItem?.accessories.find(acc => acc.id === accessoryId)?.location,
    [accessoryId, cartItem?.accessories]
  );
  const exitModalId = `remove-item-cart-modal-${id}`;

  const isLocationType = useMemo(() => locations && locations.length > 0, [locations]);
  const handleShowLocationModal = useCallback(() => NiceModal.show(locationModalId), [locationModalId]);
  const handleShowConfirmModal = useCallback(() => NiceModal.show(exitModalId), [exitModalId]);

  const handleDeleteItem = useCallback(() => {
    if (parentTitle) {
      return handleRemoveAllAccessoryQuantity(accessoryId);
    }
    return handleShowConfirmModal();
  }, [parentTitle, handleShowConfirmModal, handleRemoveAllAccessoryQuantity, accessoryId]);

  const handleConfirmRemoveChanges = () => {
    removeFromCart($uniqueId);
    if (onClosePreCartModal && !showData) onClosePreCartModal();
  };

  return (
    <>
      <StyledWrapper $isChild={!!parentTitle} className={className}>
        <StyledInnerWrapper className='inner-wrapper'>
          {showData && cardId && $uniqueId && bookingInformation && (
            <StyledEditContainer>
              <EditMenu
                cardId={cardId}
                bookingInformation={bookingInformation}
                $uniqueId={$uniqueId}
                onClose={onClose}
                onShowConfirmModal={handleShowConfirmModal}
              />
            </StyledEditContainer>
          )}
          <StyledTopRow className='top-row'>
            <StyledImage src={image} alt={alt} className='image' />
            <StyledContentWrapper className='content-wrapper'>
              <StyledHeader>
                <StyledTitle className='title'>{title}</StyledTitle>
                {!isMandatory && (
                  <StyledIconButton $hide={!!showData && !parentTitle} onClick={handleDeleteItem}>
                    <DeleteOutline fontSize='small' />
                  </StyledIconButton>
                )}
              </StyledHeader>
              {showData ? (
                bookingInformation && <CartInfo bookingInformation={bookingInformation} />
              ) : (
                <ItemDetails
                  selectedLocation={locationInCart}
                  handleEditLocation={handleShowLocationModal}
                  isLocationType={isLocationType}
                  {...quantityAndPriceData}
                />
              )}
              <StyledLargerScreensWrapper>
                {showData && (
                  <ItemDetails
                    selectedLocation={locationInCart}
                    handleEditLocation={handleShowLocationModal}
                    isLocationType={isLocationType}
                    {...quantityAndPriceData}
                  />
                )}
              </StyledLargerScreensWrapper>
            </StyledContentWrapper>
          </StyledTopRow>
          <StyledMobileOnlyWrapper>
            {showData && (
              <ItemDetails
                selectedLocation={locationInCart}
                handleEditLocation={handleShowLocationModal}
                isLocationType={isLocationType}
                {...quantityAndPriceData}
              />
            )}
          </StyledMobileOnlyWrapper>
          {isMandatory && (
            <StyledBottomRow>
              <StyledErrorOutline />
              <StyledMandatoryText variant='label'>
                {t('mandatoryItemFor')} {parentTitle}
              </StyledMandatoryText>
            </StyledBottomRow>
          )}
        </StyledInnerWrapper>
      </StyledWrapper>
      {locations && (
        <LocationModal id={locationModalId} locations={locations} selectedLocation={locationInCart}>
          {({ isSelected, location, handleOnClose }) => (
            <LocationItemWithPrices
              isSelected={isSelected}
              location={location}
              // This logic will be removed when we have the new accesories flow
              onClick={() => {
                handleSetAccessoryQuantity(accessoryId, 1, location);
                handleOnClose();
              }}
            />
          )}
        </LocationModal>
      )}
      <ConfirmModal
        id={exitModalId}
        confirmChangesTitle={t('deleteItem.confirmChangesTitle')}
        confirmChangesDescription={t('deleteItem.confirmChangesDescription')}
        confirmChangeText={t('deleteItem.delete')}
        onConfirmChanges={handleConfirmRemoveChanges}
      />
    </>
  );
};

export default CartRowItem;
