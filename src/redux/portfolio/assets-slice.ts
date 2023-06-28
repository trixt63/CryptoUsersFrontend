/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createAsyncThunk, createSlice, SliceCaseReducers } from '@reduxjs/toolkit';
import { FetchStatus } from 'src/constants';
import { fetchCreditScore, fetchTokenBalance } from 'src/services/portfolio-api';
import { FetchCreditScoreResponse, FetchTokenBalanceResponse } from 'src/services/portfolio-api/data-types';
import { logout } from '../auth';
import { v4 as uuid } from 'uuid';

export const defaultFetchStatus = { fetchStatus: FetchStatus.IDLE };

export type UserCreditScoreAndBalanceByChain = {
  fetchStatus: FetchStatus;
  data?: Omit<FetchCreditScoreResponse, 'address'>;
};

export type UserAsset = {
  newId: string;
  id: string;
  type: string;
  name: string;
  symbol: string;
  chains: string[];
  imgUrl: string;
  tokenHealth: number;
  amount: number;
  valueInUSD: number;
  price: number;
  priceChangeRate: number;
  priceLast7Days: {
    [timestamp: string]: number;
  };
};

export type TokenBalance = {
  [key: string]: {
    amount: number;
    price: number;
  };
};

interface AssetsSlice {
  creditScoreAndBalance: {
    [chain: string]: UserCreditScoreAndBalanceByChain | undefined;
  };
  assets: {
    status: FetchStatus;
    data: UserAsset[];
  };
  tokenBalance: {
    [tokenId: string]: { status: FetchStatus; data?: TokenBalance } | undefined;
  };
}

export const fetchCreditScoreAndBalance = createAsyncThunk<
  Omit<FetchCreditScoreResponse, 'address'>,
  { address: string; chain: string; duration?: number; history?: boolean }
>('assetsSlice/fetchCreditScoreAndBalance', async ({ address, chain, duration }) => {
  const data = await fetchCreditScore(address, {
    chain: chain !== 'all' ? chain : undefined,
    duration,
    history: true,
  });
  return {
    ...data,
    address: undefined, // remove address from data
  };
});

export const fetchTokenBalanceData = createAsyncThunk<
  FetchTokenBalanceResponse['tokenBalanceHistory'],
  { address: string; tokenId: string; chain?: string; duration?: number }
>('assetsSlice/fetchTokenBalanceData', async ({ address, tokenId, chain, duration }) => {
  const data = await fetchTokenBalance(address, tokenId, {
    chain: chain !== 'all' ? chain : undefined,
    duration: duration ? duration : undefined,
  });
  return {
    ...data.tokenBalanceHistory,
  };
});

const assetsSlice = createSlice<AssetsSlice, SliceCaseReducers<AssetsSlice>>({
  name: 'assetsSlice',
  initialState: {
    creditScoreAndBalance: {},
    assets: {
      status: FetchStatus.IDLE,
      data: [],
    },
    tokenBalance: {},
  } as AssetsSlice,
  reducers: {
    addUserAssets(state, action) {
      state.assets.data = state.assets.data
        .concat(action.payload.assets)
        .map((item) => Object.assign(item, { newId: uuid() }));
    },
    updateUserAssetsStatus(state, action) {
      state.assets.status = action.payload.status;
    },
    startFetchUserAssets(state) {
      state.assets.status = FetchStatus.FETCHING;
      state.assets.data = [];
    },
    finishFetchUserAssets(state, action) {
      state.assets.status = action.payload.status;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchCreditScoreAndBalance.fulfilled, (state, action) => {
      const chainState = state.creditScoreAndBalance[action.meta.arg.chain]!;
      chainState.fetchStatus = FetchStatus.SUCCESS;
      chainState.data = action.payload;
    });
    builder.addCase(fetchCreditScoreAndBalance.rejected, (state, action) => {
      const chainState = state.creditScoreAndBalance[action.meta.arg.chain]!;
      chainState.fetchStatus = FetchStatus.FAILED;
    });
    builder.addCase(fetchCreditScoreAndBalance.pending, (state, action) => {
      if (!state.creditScoreAndBalance[action.meta.arg.chain]) {
        state.creditScoreAndBalance[action.meta.arg.chain] = {
          fetchStatus: FetchStatus.FETCHING,
          data: undefined,
        };
      }
    });
    builder.addCase(fetchTokenBalanceData.fulfilled, (state, action) => {
      const tokenIdState = state.tokenBalance[action.meta.arg.tokenId]!;
      tokenIdState.status = FetchStatus.SUCCESS;
      tokenIdState.data = action.payload;
    });
    builder.addCase(fetchTokenBalanceData.rejected, (state, action) => {
      const tokenIdState = state.tokenBalance[action.meta.arg.tokenId]!;
      tokenIdState.status = FetchStatus.FAILED;
    });
    builder.addCase(fetchTokenBalanceData.pending, (state, action) => {
      if (!state.tokenBalance[action.meta.arg.tokenId]) {
        state.tokenBalance[action.meta.arg.tokenId] = {
          status: FetchStatus.FETCHING,
          data: undefined,
        };
      }
    });
    builder.addCase(logout, (state) => {
      state.creditScoreAndBalance = {};
      state.assets = {
        status: FetchStatus.IDLE,
        data: [],
      };
      state.tokenBalance = {};
    });
  },
});

export default assetsSlice.reducer;
export const { addUserAssets, updateUserAssetsStatus, startFetchUserAssets, finishFetchUserAssets } =
  assetsSlice.actions;
