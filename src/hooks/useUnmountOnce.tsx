import { useRef } from 'react';
import { useEffectOnce, useIsFirstRender } from 'usehooks-ts';

type Props = {
  fn: () => void;
  omitFirstRender?: boolean;
};

const useUnmountOnce = ({ fn, omitFirstRender }: Props) => {
  const isFirstRender = useIsFirstRender();
  const fnRef = useRef<() => void>(fn);

  fnRef.current = () => {
    if (omitFirstRender && isFirstRender) return;
    fn();
  };

  useEffectOnce(() => fnRef.current);
};

export default useUnmountOnce;
