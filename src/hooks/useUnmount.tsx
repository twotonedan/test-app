import { useEffect } from 'react';
import useUnmountOnce from './useUnmountOnce';

type Props = {
  fn: () => void;
  omitFirstRender?: boolean;
};

const useUnmount = ({ fn, omitFirstRender }: Props) => {
  useEffect(() => {
    const onBeforeUnload = fn;

    window.onpopstate = fn;
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => {
      window.onpopstate = null;
      window.removeEventListener('beforeunload', onBeforeUnload);
    };
  }, [fn]);

  useUnmountOnce({ fn, omitFirstRender });
};

export default useUnmount;
