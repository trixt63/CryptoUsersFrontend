import { combineReducers } from 'redux';
import graphReducer from './graph-slice';
import informationNodesSlice from './information-nodes-slice';

const visualizationReducer = combineReducers({
  graphSlice: graphReducer,
  informationNodesSlice: informationNodesSlice,
});

export default visualizationReducer;
