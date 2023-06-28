/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { createAsyncThunk, createSlice, SliceCaseReducers } from '@reduxjs/toolkit';
import { FetchStatus } from 'src/constants';
import { fetchAlerts } from 'src/services/portfolio-api';
import { FetchAlertsResponse } from 'src/services/portfolio-api/data-types';
import { logout } from '../auth';

export type AlertsByChain = {
  fetchStatus: FetchStatus;
  data?: Omit<FetchAlertsResponse, 'address'>;
};

interface AlertsSlice {
  [chain: string]: AlertsByChain | undefined;
}

export const fetchAlertsData = createAsyncThunk<
  Omit<FetchAlertsResponse, 'address'>,
  { address: string; chain: string; startTime?: number; type?: string }
>('alertsSlice/fetchAlerts', async ({ address, chain, startTime, type }) => {
  const data = await fetchAlerts(address, {
    chain: chain !== 'all' ? chain : undefined,
    startTime: startTime ? startTime : undefined,
    type: type !== 'all' ? type : undefined,
  });
  return {
    ...data,
    address: undefined,
  };
});

const alertSlice = createSlice<AlertsSlice, SliceCaseReducers<AlertsSlice>>({
  name: 'alertsSlice',
  initialState: {} as AlertsSlice,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchAlertsData.fulfilled, (state, action) => {
      const chainState = state[action.meta.arg.chain]!;
      chainState.fetchStatus = FetchStatus.SUCCESS;
      chainState.data = action.payload;
    });
    builder.addCase(fetchAlertsData.rejected, (state, action) => {
      const chainState = state[action.meta.arg.chain]!;
      chainState.fetchStatus = FetchStatus.FAILED;
    });
    builder.addCase(fetchAlertsData.pending, (state, action) => {
      if (!state[action.meta.arg.chain]) {
        state[action.meta.arg.chain] = {
          fetchStatus: FetchStatus.FETCHING,
          data: undefined,
        };
      }
    });
    builder.addCase(logout, (state) => {
      Object.keys(state).forEach((k) => {
        state[k] = undefined;
      });
    });
  },
});

export default alertSlice.reducer;
