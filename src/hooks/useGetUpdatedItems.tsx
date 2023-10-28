import { uniq } from 'lodash';
import useGetAccessoriesByIds from './api/useGetAccessoriesByIds';
import useGetItemsByIds from './api/useGetItemsByIds';
import { useCartData } from './contexts/useCartData';

const useGetUpdatedItems = () => {
  const { cartData } = useCartData();
  const { data: freshItems = [], isFetching: isLoadingItems } = useGetItemsByIds(cartData.map(item => item.id));
  const { data: freshAccessories = [], isFetching: isLoadingAccesories } = useGetAccessoriesByIds(
    uniq(cartData.flatMap(item => item.accessories.map(accessory => accessory.id)))
  );
  return { freshItems, isLoadingItems, freshAccessories, isLoadingAccesories };
};

export default useGetUpdatedItems;
