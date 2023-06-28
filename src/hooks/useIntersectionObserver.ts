/* eslint-disable @typescript-eslint/no-explicit-any */

import { useRef, useState } from 'react';
import { useIsomorphicLayoutEffect } from '.';

/**
 * This hook is copied from PancakeSwap open source.
 * @see {@link https://github.com/pancakeswap/pancake-frontend/blob/914b04b12b211ac72b1ac888bd903dbc52706c35/src/hooks/useIntersectionObserver.ts#L3 Github}
 */
const useIntersectionObserver = () => {
  const [observerRefElement, setObserverRefElement] = useState(null);
  const observerRef = useRef((element: any) => setObserverRefElement(element));
  const intersectionObserverRef = useRef<IntersectionObserver | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useIsomorphicLayoutEffect(() => {
    const isSupported = typeof window === 'object' && window.IntersectionObserver;

    if (isSupported) {
      if (!intersectionObserverRef.current && observerRefElement) {
        const checkObserverIsIntersecting = ([entry]: IntersectionObserverEntry[]) => {
          setIsIntersecting(entry.isIntersecting);
        };

        intersectionObserverRef.current = new window.IntersectionObserver(checkObserverIsIntersecting, {
          rootMargin: '0px',
          threshold: 1,
        });
        intersectionObserverRef.current.observe(observerRefElement);
      }

      if (intersectionObserverRef.current && !observerRefElement) {
        intersectionObserverRef.current.disconnect();
        setIsIntersecting(false);
      }
    } else {
      // If client doesnt support IntersectionObserver, set Intersecting to be true
      setIsIntersecting(true);
    }

    return () => {
      if (intersectionObserverRef.current) {
        intersectionObserverRef.current.disconnect();
      }
    };
  }, [observerRefElement]);

  return { observerRef: observerRef.current, isIntersecting };
};

export const useIntersectOnce = () => {
  const { observerRef, isIntersecting } = useIntersectionObserver();
  const oneRef = useRef<boolean>(isIntersecting);
  if (isIntersecting) {
    oneRef.current = true;
  }

  return { observerRef, intersected: oneRef.current };
};

export default useIntersectionObserver;
