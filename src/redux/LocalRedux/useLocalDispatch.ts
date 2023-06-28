import { useContext, useCallback } from 'react';
import { LocalContext } from './LocalProvider';

export default function useLocalDispatch() {
  const localContext = useContext(LocalContext);

  const emptyFn = useCallback(() => undefined, []);

  return localContext?.store?.dispatch || emptyFn;
}
