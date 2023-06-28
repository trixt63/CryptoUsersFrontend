import React, { useEffect, useRef } from 'react';

export default function useDidUpdate(effect: React.EffectCallback, deps?: React.DependencyList) {
  const mounted = useRef(false);
  // use ref to ensure that we always call the newest effect function
  const effectRef = useRef(effect);
  effectRef.current = effect;

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }

    return effectRef.current();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return null;
}
