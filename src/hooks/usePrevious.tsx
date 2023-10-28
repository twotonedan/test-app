import { useRef, useEffect } from 'react';

export default function usePrevious<T>(state: T, { startValue }: { startValue?: T } = {}): T | undefined {
  const ref = useRef<T | undefined>(startValue);

  useEffect(() => {
    ref.current = state;
  });

  return ref.current;
}
