import { useCallback, useMemo } from 'react';
import { Control } from 'react-hook-form';
import { CategoryType } from '@/types/enums';

import useGetFeed from './api/useGetFeed';
import useGetCategorySelected from './useGetCategorySelected';

export const useFilterByCustomCategory = () => {
  const { data: feedData } = useGetFeed();
  return useCallback(
    (categorySelected: CategoryType = CategoryType.ALL) => feedData?.filters[categorySelected],
    [feedData?.filters]
  );
};

const useFiltersByCategory = (control?: Control) => {
  const { categorySelected } = useGetCategorySelected(control);
  const getFilterByCustomCategory = useFilterByCustomCategory();
  return useMemo(() => getFilterByCustomCategory(categorySelected), [categorySelected, getFilterByCustomCategory]);
};

export default useFiltersByCategory;
