/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useDeferredValue, useMemo, useState } from 'react';
import { mapValues, sumBy, values } from 'lodash';
import constate from 'constate';
import { ICardPayload } from '@/types/cards';
import { IAccessory } from '@/types/accessories';
import { differenceInCalendarDays } from 'date-fns';
import { safeParseISO } from '@/utils/safeParseISO';
import { AccessoryData, CartData, useCartData } from './useCartData';
import { calculateCalendarPrice } from './useCalendarSelectionData';
import useGetUpdatedItems from '../useGetUpdatedItems';

export type GeneratedBasicPrice<T> = {
  $metadata: T;
  $quantity: number;
  price: number;
  total: number;
};

export type ItemPrice = GeneratedBasicPrice<ICardPayload> & {
  $uniqueId: string;
  $selectedDuration: number;
  subTotal: number;
  accessories: {
    [key: string]: GeneratedBasicPrice<IAccessory>;
  };
};

export type GeneratedPrices = {
  items: {
    [key: string]: ItemPrice;
  };
  subTotal: number;
  total: number;
};

export type PromoCode = { key: string; amount: number } | undefined;

export const calculateAccessoryPrice = (
  accessory: AccessoryData,
  freshAccessories: IAccessory[]
): GeneratedBasicPrice<IAccessory> | undefined => {
  const freshAccessory = freshAccessories.find(item => item.id === accessory.id);
  if (!freshAccessory) return undefined;

  const total = freshAccessory.price * accessory.quantity;
  return {
    $metadata: freshAccessory,
    $quantity: accessory.quantity,
    price: freshAccessory.price,
    total,
  };
};

export const calculateItemPrice = (
  cartItem: CartData,
  freshItems: ICardPayload[],
  freshAccessories: IAccessory[]
): ItemPrice | undefined => {
  const freshItem = freshItems.find(item => item.id === cartItem.id);
  if (!freshItem) return undefined;

  const accessories = cartItem.accessories.reduce((acc, accessory) => {
    const accessoryPrice = calculateAccessoryPrice(accessory, freshAccessories);
    if (!accessoryPrice) return acc;
    return { ...acc, [accessory.id]: accessoryPrice };
  }, {} as ItemPrice['accessories']);

  const accesoriesTotal = sumBy(values(accessories), accessory => accessory?.total || 0);

  const { date, dateRange: unparsedDateRange } = cartItem.settings;
  const dateRange = mapValues(unparsedDateRange, value => safeParseISO(value));
  const updatedSelectionPrice = calculateCalendarPrice(freshItem.calendarInfo, { date, dateRange }).price || 0;

  const subTotal = updatedSelectionPrice * cartItem.settings.quantity;
  const total = subTotal + accesoriesTotal;

  let daysClampedDifference = 1;

  if (dateRange?.end && dateRange?.start) {
    const daysRealDifference = differenceInCalendarDays(dateRange.end, dateRange.start) + 1 || 0;
    daysClampedDifference = Math.max(daysRealDifference || 0, 0);
  }

  return {
    $uniqueId: cartItem.$uniqueId,
    $metadata: freshItem,
    $quantity: cartItem.settings.quantity,
    $selectedDuration: daysClampedDifference,
    price: updatedSelectionPrice,
    subTotal,
    total,
    accessories,
  };
};

export const calculatePrice = (
  cartData: CartData[],
  promoCodeData: PromoCode,
  freshItems: ICardPayload[],
  freshAccessories: IAccessory[],
  creditsData?: number,
  useCredits?: boolean
) => {
  const items = cartData.reduce((acc, cartItem) => {
    const itemPrice = calculateItemPrice(cartItem, freshItems, freshAccessories);
    if (!itemPrice) return acc;
    return { ...acc, [cartItem.$uniqueId]: itemPrice };
  }, {} as GeneratedPrices['items']);

  const subTotal = sumBy(values(items), item => item?.total || 0);
  const total = subTotal - (promoCodeData?.amount || 0) - (useCredits ? creditsData || 0 : 0);

  return { items, total, subTotal };
};

const useCalculatePriceContext = () => {
  const { cartData } = useCartData();
  // TODO move promoCodeData to cardData
  const [promoCodeData, setPromoCodeData] = useState<PromoCode>();
  const { freshItems, isLoadingItems, freshAccessories, isLoadingAccesories } = useGetUpdatedItems();
  const [useCredits, setUseCredits] = useState<boolean>(false);
  const [creditsData, setCreditsData] = useState<number>(0);

  const prices = useMemo<GeneratedPrices>(
    () => calculatePrice(cartData, promoCodeData, freshItems, freshAccessories, creditsData, useCredits),
    [cartData, promoCodeData, creditsData, freshItems, freshAccessories, useCredits]
  );

  const deferredValue = useDeferredValue(prices);

  return {
    isLoading: isLoadingItems || isLoadingAccesories,
    prices: deferredValue,
    setPromoCodeData,
    promoCodeData,
    setCreditsData,
    creditsData,
    useCredits,
    setUseCredits,
  };
};

export const [CalculatePriceProvider, useCalculatePrice] = constate(useCalculatePriceContext);
