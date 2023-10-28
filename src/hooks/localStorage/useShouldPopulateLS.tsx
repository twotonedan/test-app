import useLocalStorageState from 'use-local-storage-state';

const useShouldPopulateLS = () => {
  const [shouldPopulateLS, setShouldPopulateLS, { removeItem }] = useLocalStorageState<boolean>('shouldPopulateLS');

  return { shouldPopulateLS, setShouldPopulateLS, removeItem };
};

export default useShouldPopulateLS;
