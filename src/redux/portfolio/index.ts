import configSliceReducer from './config-slice';
import assetsSliceReducer from './assets-slice';
import alertsSliceReducer from './alerts-slice';
import { combineReducers } from 'redux';
import dAppsSliceReducer from './dapps-slice';

const portfolioReducer = combineReducers({
  configSlice: configSliceReducer,
  assetsSlice: assetsSliceReducer,
  alertsSlice: alertsSliceReducer,
  dAppsSlice: dAppsSliceReducer,
});

export default portfolioReducer;
