import { createSlice, SliceCaseReducers } from '@reduxjs/toolkit';
import { SUPPORTED_CHAINS } from 'src/configs/api';

export interface ConfigSlice {
  chainId: string;
}

const configSlice = createSlice<ConfigSlice, SliceCaseReducers<ConfigSlice>>({
  name: 'configSlice',
  initialState: {
    chainId: 'all',
  },
  reducers: {
    updateChain(state, action) {
      if (SUPPORTED_CHAINS.includes(action.payload.chain)) {
        state.chainId = action.payload.chain;
      } else {
        state.chainId = 'all';
      }
    },
  },
});

export default configSlice.reducer;

export const { updateChain } = configSlice.actions;
