import { configureStore } from '@reduxjs/toolkit';
import { isDev } from 'src/constants';
import appCenterSliceReducer from './app-center';
// auth
import authReducer from './auth';

// config
import configSlice from './config/configSlice';

// portfolio
import portfolioReducer from './portfolio';
import visualizationReducer from './visualization';

export const store = configureStore({
  reducer: {
    //config
    configSlice: configSlice,

    // app center
    appCenterSlice: appCenterSliceReducer,

    // portfolio
    portfolio: portfolioReducer,

    // auth
    auth: authReducer,

    visualization: visualizationReducer,
  },
  devTools: isDev ? true : false,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
