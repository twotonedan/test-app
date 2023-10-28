import { useMemo } from 'react';
import constate from 'constate';
import { ILocation } from '@/types/accessories';
import { useCartData } from './useCartData';

type Props = {
  $uniqueId: string;
};

const useCurrentCartItemContext = ({ $uniqueId }: Props) => {
  const { updateItemInCart, updateAccessoryInCart, cartData } = useCartData();
  const cartItem = useMemo(() => cartData.find(item => item.$uniqueId === $uniqueId), [$uniqueId, cartData]);

  const hasUndefinedLocationAccesory = useMemo(
    () =>
      cartItem?.accessories.some(accessory => {
        if ('location' in accessory) return accessory.location === undefined;
        return false;
      }),
    [cartItem]
  );

  const handleAddItemQuantity = (itemId: string, quantity: number) => {
    if (!cartItem) return;
    updateItemInCart(itemId, { ...cartItem.settings, quantity: quantity + 1 });
  };

  const handleRemoveItemQuantity = (itemId: string, quantity: number) => {
    if (!cartItem) return;
    updateItemInCart(itemId, { ...cartItem.settings, quantity: quantity - 1 });
  };

  const handleAddAccessoryQuantity = (accessoryId: string, quantity: number) => {
    updateAccessoryInCart($uniqueId, accessoryId, quantity + 1);
  };

  const handleRemoveAccessoryQuantity = (accessoryId: string, quantity: number) => {
    updateAccessoryInCart($uniqueId, accessoryId, quantity - 1);
  };

  const handleRemoveAllAccessoryQuantity = (accessoryId: string) => {
    updateAccessoryInCart($uniqueId, accessoryId, 0);
  };

  const handleSetAccessoryQuantity = (accessoryId: string, quantity: number, location?: ILocation) => {
    updateAccessoryInCart($uniqueId, accessoryId, quantity, location);
  };

  return {
    $uniqueId,
    cartItem,
    hasUndefinedLocationAccesory,
    handleAddItemQuantity,
    handleRemoveItemQuantity,
    handleAddAccessoryQuantity,
    handleRemoveAccessoryQuantity,
    handleRemoveAllAccessoryQuantity,
    handleSetAccessoryQuantity,
  };
};

export const [CurrentCartItemProvider, useCurrentCartItem] = constate(useCurrentCartItemContext);
