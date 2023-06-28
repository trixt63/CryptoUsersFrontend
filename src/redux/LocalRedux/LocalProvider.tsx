import React, { createContext } from 'react';
import { Provider, ReactReduxContextValue } from 'react-redux';
import { Store } from 'redux';

export const LocalContext = createContext({} as ReactReduxContextValue);

export default function LocalProvider({ children, store }: { children: React.ReactNode; store: Store }) {
  return (
    <Provider store={store} context={LocalContext}>
      {children}
    </Provider>
  );
}
