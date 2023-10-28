import { useCurrentCartItem } from '@/hooks/contexts/useCurrentCartItem';
import { IAccessory } from '@/types/accessories';
import { useMemo } from 'react';

import MobileCard from './MobileCard';
import TabletCard from './TabletCard';

type AccessoryProps = {
  accessory: IAccessory;
  quantity: number;
  handleClick: (e: React.MouseEvent<HTMLElement>) => void;
  handleAddAccessory: (quantity: number) => void;
  price: string;
  accessoryHandlerComponent: JSX.Element;
  showTrashIcon: boolean;
  mobileView: boolean;
  hidePricing?: boolean;
};

const AccessoryCard = ({
  accessory,
  quantity,
  handleClick,
  handleAddAccessory,
  price,
  accessoryHandlerComponent,
  showTrashIcon,
  mobileView,
  hidePricing,
}: AccessoryProps) => {
  const hasTag = Boolean(accessory.tag?.label);
  const { cartItem } = useCurrentCartItem();
  const locationInCart = useMemo(
    () => cartItem?.accessories.find(acc => acc.id === accessory.id)?.location,
    [accessory.id, cartItem?.accessories]
  );

  const isMandatory = useMemo(() => !!accessory.limits.min, [accessory.limits.min]);
  const hasLocations = useMemo(() => accessory?.locations && accessory.locations.length > 1, [accessory]);
  const hasSelectedLocation = useMemo(() => Boolean(locationInCart), [locationInCart]);

  const showAddButton = useMemo(() => {
    return (
      (isMandatory && !hasLocations) ||
      (!isMandatory && hasLocations && !hasSelectedLocation) ||
      (!isMandatory && !hasLocations)
    );
  }, [isMandatory, hasLocations, hasSelectedLocation]);

  return mobileView ? (
    <MobileCard
      accessory={accessory}
      price={price}
      hasTag={hasTag}
      isHighlighted={quantity > 0}
      handleClick={handleClick}
      showTrashIcon={showTrashIcon}
      accessoryHandlerComponent={accessoryHandlerComponent}
      hidePricing={hidePricing}
    />
  ) : (
    <TabletCard
      accessory={accessory}
      price={price}
      quantity={quantity}
      hasTag={hasTag}
      showTrashIcon={showTrashIcon}
      showAddButton={showAddButton}
      accessoryHandlerComponent={accessoryHandlerComponent}
      handleAddAccessory={handleAddAccessory}
      hidePricing={hidePricing}
    />
  );
};

export default AccessoryCard;
