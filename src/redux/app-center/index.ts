import { createAsyncThunk, createSlice, SliceCaseReducers } from '@reduxjs/toolkit';
import { FetchStatus } from 'src/constants';
import {
  fetchLatestTransactions,
  fetchMarketCapHeatmap,
  fetchMostVisitedContracts,
  fetchTopTokens,
  fetchTransactionDappHistory,
} from 'src/services/home-api';
import {
  ApiMarketCapHeatmap,
  ApiMostVisitedContract,
  ApiTopToken,
  ApiTransaction,
  TransactionDappHistoryItem,
} from 'src/services/home-api/data-types';

export interface AppCenterState {
  marketHeatmap: Array<ApiMarketCapHeatmap>;
  latestTxs: Array<ApiTransaction>;
  txDappHistory: Array<TransactionDappHistoryItem>;
  mostVisitedContracts: Array<ApiMostVisitedContract>;
  topTokens: Array<ApiTopToken>;
  status: FetchStatus;
}

const initialState: AppCenterState = {
  marketHeatmap: [],
  latestTxs: [],
  txDappHistory: [],
  mostVisitedContracts: [],
  topTokens: [],
  status: FetchStatus.IDLE,
};

type FetchStatusResponse = {
  marketHeatmap: Array<ApiMarketCapHeatmap>;
  latestTxs: Array<ApiTransaction>;
  txDappHistory: Array<TransactionDappHistoryItem>;
  mostVisitedContracts: Array<ApiMostVisitedContract>;
  topTokens: Array<ApiTopToken>;
};
export const fetchAll = createAsyncThunk<FetchStatusResponse, { chainId: string }>(
  'appCenterSlice/fetchAll',
  async ({ chainId }) => {
    const res = await Promise.all([
      fetchMarketCapHeatmap(),
      fetchLatestTransactions(chainId),
      fetchTransactionDappHistory(chainId),
      fetchMostVisitedContracts(chainId),
      fetchTopTokens(chainId),
    ]);
    return {
      marketHeatmap: res[0],
      latestTxs: res[1],
      txDappHistory: res[2],
      mostVisitedContracts: res[3],
      topTokens: res[4],
    };
  }
);

const appCenterSlice = createSlice<AppCenterState, SliceCaseReducers<AppCenterState>>({
  name: 'appCenterSlice',
  initialState,
  reducers: {
    updateTxDappHistory(state, action) {
      state.txDappHistory = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAll.pending, (state) => {
        if (state.status === FetchStatus.IDLE) {
          state.status = FetchStatus.FETCHING;
        } else if (state.status !== FetchStatus.FETCHING) {
          state.status = FetchStatus.UPDATING;
        }
      })
      .addCase(fetchAll.rejected, (state) => {
        state.status = FetchStatus.FAILED;
      })
      .addCase(fetchAll.fulfilled, (state, action) => {
        Object.assign(state, action.payload);
        state.status = FetchStatus.SUCCESS;
      });
  },
});

export default appCenterSlice.reducer;

export const { updateTxDappHistory } = appCenterSlice.actions;
