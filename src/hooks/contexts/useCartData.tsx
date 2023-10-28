/* eslint-disable consistent-return */
import constate from 'constate';
import { useMemo, useState } from 'react';
import { IBookingInformation } from '@/validationSchemas/bookingInformationSchema/bookingInformationSchema';
import { cloneDeep, sumBy } from 'lodash';
import { ILocation } from '@/types/accessories';

export type AccessoryData = {
  id: string;
  quantity: number;
  location?: ILocation;
};

export type CartData = {
  $uniqueId: string;
  id: string;
  settings: IBookingInformation;
  $defaultAccessories?: AccessoryData[];
  accessories: AccessoryData[];
};

const getNewAccessory = (accessoryId: string, quantity: number, location?: ILocation) => {
  if (location) return { id: accessoryId, quantity, location };
  return { id: accessoryId, quantity };
};

const parseAccesories = (
  accessories: AccessoryData[],
  defaultAccessories: AccessoryData[],
  prevSettings: IBookingInformation | null,
  settings: IBookingInformation
) =>
  accessories.map(accessory => {
    const defaultAccesory = defaultAccessories.find(defaultAccessory => defaultAccessory.id === accessory.id);
    const isDefault = !!defaultAccesory;

    if (!isDefault) return accessory;

    const prevQuantity = prevSettings ? prevSettings.quantity : defaultAccesory.quantity;

    return {
      ...accessory,
      quantity: accessory.quantity - prevQuantity + settings.quantity,
    };
  });

const useCartDataContext = () => {
  const [cartData, setCartData] = useState<CartData[]>([]);

  const addToCart = (
    $uniqueId: string,
    id: string,
    settings: IBookingInformation,
    defaultAccessories: AccessoryData[]
  ) =>
    setCartData([
      ...cartData,
      {
        $uniqueId,
        id,
        settings,
        $defaultAccessories: defaultAccessories,
        accessories: parseAccesories(defaultAccessories, defaultAccessories, null, settings),
      },
    ]);

  const removeFromCart = ($uniqueId: string) => setCartData(cartData.filter(item => item.$uniqueId !== $uniqueId));
  const clearCart = () => setCartData([]);

  const updateItemInCart = ($uniqueId: string, settings: IBookingInformation) => {
    const updateCartData = cloneDeep(cartData);
    const cartItemIndex = updateCartData.findIndex(item => item.$uniqueId === $uniqueId);

    if (cartItemIndex === -1) return;
    if (settings.quantity === 0) return removeFromCart($uniqueId);

    const cartItem = updateCartData[cartItemIndex];
    const prevSettings = cartItem.settings;

    cartItem.settings = settings;
    cartItem.accessories = parseAccesories(
      cartItem.accessories,
      cartItem.$defaultAccessories || [],
      prevSettings,
      settings
    );

    setCartData(updateCartData);
  };

  const updateAccessoryInCart = ($uniqueId: string, accessoryId: string, quantity: number, location?: ILocation) => {
    const updateCartData = cloneDeep(cartData);
    const cartItemIndex = updateCartData.findIndex(item => item.$uniqueId === $uniqueId);

    if (cartItemIndex === -1) return;

    const cartItem = updateCartData[cartItemIndex];

    const accessoryIndex = cartItem.accessories?.findIndex(item => item.id === accessoryId);
    if (accessoryIndex === -1) {
      cartItem.accessories.push(getNewAccessory(accessoryId, quantity, location));
    } else if (quantity === 0) {
      cartItem.accessories.splice(accessoryIndex, 1);
    } else {
      cartItem.accessories[accessoryIndex].quantity = quantity;
      if (location) {
        cartItem.accessories[accessoryIndex].location = location;
      }
    }
    setCartData(updateCartData);
  };

  const setItemSettings = ($uniqueId: string, settings: IBookingInformation) => {
    const updateCartData = cloneDeep(cartData);
    const cartItemIndex = updateCartData.findIndex(item => item.$uniqueId === $uniqueId);
    if (cartItemIndex === -1) return;

    const cartItem = updateCartData[cartItemIndex];

    cartItem.settings = settings;
    setCartData(updateCartData);
  };

  const cartLength = useMemo(() => {
    const totalItems = cartData.reduce(
      (acc, cartItem) =>
        acc + cartItem.settings.quantity + sumBy(cartItem.accessories, accessory => accessory.quantity),
      0
    );
    return totalItems;
  }, [cartData]);

  return {
    cartData,
    cartLength,
    addToCart,
    removeFromCart,
    clearCart,
    updateItemInCart,
    updateAccessoryInCart,
    setItemSettings,
  };
};

export const [CartDataProvider, useCartData] = constate(useCartDataContext);
