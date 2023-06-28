/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createAsyncThunk, createSlice, SliceCaseReducers } from '@reduxjs/toolkit';
import { FetchStatus } from 'src/constants';
import { fetchDAppsTokenBalance } from 'src/services/portfolio-api';
import { FetchDappTokenBalanceResponse } from 'src/services/portfolio-api/data-types';
import { v4 as uuid } from 'uuid';
import { logout } from '../auth';

export type TokenBalance = {
  [key: string]: {
    amount: number;
    price: number;
  };
};

export type Token = {
  id: string;
  type: string;
  name: string;
  symbol: string;
  chains: Array<string>;
  action: string;
  imgUrl: string;
  tokenHealth: number;
  amount: number;
  valueInUSD: number;
  price: number;
  priceChangeRate: number;
  apy: number;
  apr: number;
};

export type DApps = {
  newId: string;
  id: string;
  type: string;
  name: string;
  address: string;
  chains: Array<string>;
  imgUrl: string;
  safetyIndex: number;
  tvl: number;
  tvl24hAgo: number;
  claimable: number;
  avgAPR: number;
  tokens: Array<Token>;
};

interface DAppsSlice {
  dApps: {
    status: FetchStatus;
    data: DApps[];
  };
  tokenBalance: {
    [key: string]: { status?: FetchStatus; data?: TokenBalance };
  };
}

export const fetchDAppTokenBalanceData = createAsyncThunk<
  FetchDappTokenBalanceResponse['dappTokenBalanceHistory'],
  { address: string; dAppId: string; tokenId: string; action?: string; chain?: string; duration?: number }
>('dAppsSlice/fetchDAppTokenBalanceData', async ({ address, dAppId, tokenId, action, chain, duration }) => {
  const data = await fetchDAppsTokenBalance(address, dAppId, tokenId, {
    chain: chain !== 'all' ? chain : undefined,
    action: action ? action : undefined,
    duration: duration ? duration : undefined,
  });
  return {
    ...data.dappTokenBalanceHistory,
  };
});

const dAppsSlice = createSlice<DAppsSlice, SliceCaseReducers<DAppsSlice>>({
  name: 'dAppsSlice',
  initialState: {
    dApps: {
      status: FetchStatus.IDLE,
      data: [],
    },
    tokenBalance: {},
  } as DAppsSlice,
  reducers: {
    addDApps(state, action) {
      state.dApps.data = state.dApps.data
        .concat(action.payload.dApps)
        .map((item) => Object.assign(item, { newId: uuid() }));
    },
    updateDAppsStatus(state, action) {
      state.dApps.status = action.payload.status;
    },
    startFetchDApps(state) {
      state.dApps.status = FetchStatus.FETCHING;
      state.dApps.data = [];
    },
    finishFetchDApps(state, action) {
      state.dApps.status = action.payload.status;
    },
  },
  // [`${action.meta.arg.tokenId}`]
  extraReducers(builder) {
    builder.addCase(fetchDAppTokenBalanceData.fulfilled, (state, action) => {
      state.tokenBalance[`${action.meta.arg.dAppId}-${action.meta.arg.tokenId}-${action.meta.arg.action}`].status =
        FetchStatus.SUCCESS;
      state.tokenBalance[`${action.meta.arg.dAppId}-${action.meta.arg.tokenId}-${action.meta.arg.action}`].data =
        action.payload;
    });
    builder.addCase(fetchDAppTokenBalanceData.rejected, (state, action) => {
      const dAppId = state.tokenBalance[action.meta.arg.tokenId]!;
      if (!dAppId) {
        state.tokenBalance[`${action.meta.arg.dAppId}-${action.meta.arg.tokenId}-${action.meta.arg.action}`] = {};
        state.tokenBalance[`${action.meta.arg.dAppId}-${action.meta.arg.tokenId}-${action.meta.arg.action}`] = {
          status: FetchStatus.FAILED,
        };
      }
    });
    builder.addCase(fetchDAppTokenBalanceData.pending, (state, action) => {
      const dAppId = state.tokenBalance[action.meta.arg.tokenId]!;
      if (!dAppId) {
        state.tokenBalance[`${action.meta.arg.dAppId}-${action.meta.arg.tokenId}-${action.meta.arg.action}`] = {};
        if (!state.tokenBalance[`${action.meta.arg.dAppId}-${action.meta.arg.tokenId}-${action.meta.arg.action}`]) {
          state.tokenBalance[`${action.meta.arg.dAppId}-${action.meta.arg.tokenId}-${action.meta.arg.action}`] = {
            status: FetchStatus.FETCHING,
            data: undefined,
          };
        }
      }
    });
    builder.addCase(logout, (state) => {
      state.dApps = {
        status: FetchStatus.IDLE,
        data: [],
      };
      state.tokenBalance = {};
    });
  },
});

export default dAppsSlice.reducer;
export const { addDApps, updateDAppsStatus, startFetchDApps, finishFetchDApps } = dAppsSlice.actions;
