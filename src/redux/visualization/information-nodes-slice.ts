/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createAsyncThunk, createSlice, SliceCaseReducers } from '@reduxjs/toolkit';
import { FetchStatus } from 'src/constants';
import {
  fetchIntroductionBlock,
  fetchIntroductionContract,
  fetchIntroductionProject,
  fetchIntroductionToken,
  fetchIntroductionTransaction,
  fetchIntroductionWallet,
} from 'src/services/_old/visualize-api';

export type InformationNodesSlice = {
  introduction: {
    [key: string]: {
      status?: FetchStatus;
      data?: unknown;
    };
  };
};

export const fetchDashboardIntroductionData = createAsyncThunk<
  unknown,
  {
    id: string;
    type: string;
    chainId?: string;
    projectType?: string;
  }
>('informationNodesSlice/fetchDashboardIntroductionData', async ({ id, type, chainId, projectType }) => {
  let data = {};
  if (type == 'wallet') {
    data = await fetchIntroductionWallet(id, { chainId });
  } else if (type == 'token') {
    data = await fetchIntroductionToken(id, { chainId });
  } else if (type == 'dapp' || type == 'contract') {
    data = await fetchIntroductionContract(id, { chainId });
  } else if (type == 'project' && projectType) {
    data = await fetchIntroductionProject(id, { type: projectType, chainId: chainId });
  } else if (type == 'tx' || type == 'transaction') {
    data = await fetchIntroductionTransaction(id);
  } else if (type == 'block') {
    data = await fetchIntroductionBlock(id);
  } else throw new Error('wrong type');

  return {
    ...data,
    type: type,
  };
});

const informationNodesSlice = createSlice<InformationNodesSlice, SliceCaseReducers<InformationNodesSlice>>({
  name: 'informationNodesSlice',
  initialState: { introduction: {} } as InformationNodesSlice,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchDashboardIntroductionData.fulfilled, (state, action) => {
      state.introduction[`${action.meta.arg.type}/${action.meta.arg.id}`].status = FetchStatus.SUCCESS;
      state.introduction[`${action.meta.arg.type}/${action.meta.arg.id}`].data = action.payload;
    });
    builder.addCase(fetchDashboardIntroductionData.rejected, (state, action) => {
      const id = state.introduction[`${action.meta.arg.type}/${action.meta.arg.id}`]!;
      id.status = FetchStatus.FAILED;
    });
    builder.addCase(fetchDashboardIntroductionData.pending, (state, action) => {
      if (!state.introduction[`${action.meta.arg.type}/${action.meta.arg.id}`]) {
        state.introduction[`${action.meta.arg.type}/${action.meta.arg.id}`] = {
          status: FetchStatus.FETCHING,
          data: undefined,
        };
      }
    });
  },
});

export default informationNodesSlice.reducer;
