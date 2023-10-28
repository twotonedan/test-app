import { CategoryType } from '@/types/enums';
import { Control, useWatch } from 'react-hook-form';

const useGetCategorySelected = (control?: Control) => {
  const categorySelected: CategoryType = useWatch({ name: 'filters.category', control }) || CategoryType.ALL;

  return { categorySelected };
};

export default useGetCategorySelected;
