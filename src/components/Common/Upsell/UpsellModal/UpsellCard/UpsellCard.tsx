import { useRef, useId, useMemo, memo, MouseEvent, useCallback } from 'react';
import { IAccessory } from '@/types/accessories';
import NiceModal from '@ebay/nice-modal-react';
import { useCurrencyFormatter } from '@/hooks/contexts/useCurrencyFormatter';
import { useCurrentCartItem } from '@/hooks/contexts/useCurrentCartItem';
import LocationModal from '@/components/Common/Upsell/LocationModal';
import { DrawerOrModalSelector } from '@/components/Common/DrawerOrModal/DrawerOrModal';
import QuantityCounter from '../../../QuantityCounter';
import AccessoryDetails from '../AccessoryDetails';
import EditLocationButton from '../EditLocationButton';
import AccessoryCard from './AccessoryCard/AccessoryCard';
import LocationItemWithPrices from '../../LocationModal/LocationItemWithPrices';

type Props = {
  accessory: IAccessory;
  mobileView: boolean;
  hidePricing?: boolean;
};

const UpsellCard = ({ accessory, mobileView, hidePricing }: Props) => {
  const id = useId();
  const accessoryDetailsModalId = `accesory-details-${id}`;
  const accessoryId = accessory.id;
  const quantityRef = useRef<HTMLHeadingElement>(null);
  const { currencyFormatter } = useCurrencyFormatter();
  const formattedAccessoryPrice = currencyFormatter.format(accessory.price);
  const { cartItem, handleAddAccessoryQuantity, handleRemoveAccessoryQuantity, handleSetAccessoryQuantity } =
    useCurrentCartItem();

  const locationModalId = `location-modal-${id}`;

  const hasLocations = useMemo(() => accessory?.locations && accessory.locations.length > 1, [accessory]);

  const quantity = useMemo(
    () => cartItem?.accessories.find(acc => acc.id === accessoryId)?.quantity || accessory.limits.min,
    [accessory.limits.min, accessoryId, cartItem?.accessories]
  );

  const locationInCart = useMemo(
    () => cartItem?.accessories.find(acc => acc.id === accessoryId)?.location,
    [accessoryId, cartItem?.accessories]
  );

  const isMandatory = useMemo(() => !!accessory.limits.min, [accessory.limits.min]);
  const hasSelectedLocation = useMemo(() => Boolean(locationInCart), [locationInCart]);
  const showTrashIcon = useMemo(() => quantity > 0 && !isMandatory, [isMandatory, quantity]);

  const handleShowAccessoryInDetails = (accessoryItem: IAccessory) => {
    NiceModal.show(accessoryDetailsModalId, accessoryItem);
  };

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (quantityRef.current?.contains(e.target as HTMLElement)) return;
    handleShowAccessoryInDetails(accessory);
  };

  const handleShowLocationModal = useCallback(() => {
    if (hasLocations) {
      NiceModal.show(locationModalId);
    }
  }, [hasLocations, locationModalId]);

  const handleAddAccessory = useCallback(
    (q: number) => {
      if (hasLocations) {
        handleShowLocationModal();
      } else {
        handleAddAccessoryQuantity(accessoryId, q);
      }
    },
    [accessoryId, handleAddAccessoryQuantity, hasLocations, handleShowLocationModal]
  );

  const handleEditLocation = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      handleShowLocationModal();
    },
    [handleShowLocationModal]
  );

  const accessoryHandlerComponent = useMemo(() => {
    if (isMandatory && hasLocations && !hasSelectedLocation) {
      return <EditLocationButton onClick={handleEditLocation} selectedLocation={locationInCart} />;
    }
    if (hasSelectedLocation) {
      return <EditLocationButton selectedLocation={locationInCart} onClick={handleEditLocation} />;
    }
    return (
      <QuantityCounter
        ref={quantityRef}
        limits={accessory.limits}
        quantity={quantity}
        handleAddClick={handleAddAccessory}
        handleRemoveClick={q => handleRemoveAccessoryQuantity(accessoryId, q)}
        disableSubstract
        hideTrash
        sizeSmall
      />
    );
  }, [
    locationInCart,
    accessory.limits,
    accessoryId,
    handleAddAccessory,
    handleEditLocation,
    handleRemoveAccessoryQuantity,
    quantity,
    hasLocations,
    isMandatory,
    hasSelectedLocation,
  ]);

  return (
    <>
      <AccessoryCard
        accessory={accessory}
        quantity={quantity}
        handleClick={handleClick}
        price={formattedAccessoryPrice}
        accessoryHandlerComponent={accessoryHandlerComponent}
        handleAddAccessory={handleAddAccessory}
        showTrashIcon={showTrashIcon}
        mobileView={mobileView}
        hidePricing={hidePricing}
      />
      <AccessoryDetails
        id={accessoryDetailsModalId}
        accessoryId={accessoryId}
        quantity={quantity}
        images={accessory.imagesDetail}
        locations={accessory.locations}
        selectedLocation={locationInCart}
        handleSetAccessoryQuantity={handleSetAccessoryQuantity}
        hidePricing={hidePricing}
      />
      {accessory.locations && (
        <LocationModal
          id={locationModalId}
          locations={accessory.locations}
          selectedLocation={locationInCart}
          forceDrawerOrModal={DrawerOrModalSelector.MODAL}>
          {({ isSelected, location, handleOnClose: locationModalHandleOnClose }) => (
            <LocationItemWithPrices
              isSelected={isSelected}
              location={location}
              // This logic will be removed when we have the new accesories flow
              onClick={() => {
                handleSetAccessoryQuantity(accessoryId, 1, location);
                locationModalHandleOnClose();
              }}
            />
          )}
        </LocationModal>
      )}
    </>
  );
};

export default memo(UpsellCard);
