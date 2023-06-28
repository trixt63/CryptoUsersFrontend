import { configureStore } from '@reduxjs/toolkit';
import { isDev } from 'src/constants';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function makeStore(reducer: any, preloadedState: any = undefined, extraArgument = undefined) {
  return configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument,
        },
      }),
    preloadedState,
    devTools: isDev,
  });
}
