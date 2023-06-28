import { createSlice } from '@reduxjs/toolkit';
import { FetchStatus } from 'src/constants';
import { Dispatch } from 'redux';
import { getCurrentNetwork, NETWORKS } from 'src/configs/networkConfig';

export interface ConfigSlice {
  fetchingStatus: string;
  network?: { id: number; name: string; chainId?: string; hexChainId?: string };
  forceGraphType: string;
  token: string;
}

const configSlice = createSlice({
  name: 'configSlice',
  initialState: {
    fetchingStatus: FetchStatus.IDLE,
    network: NETWORKS[0],
    forceGraphType: '3D',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRyZXNzIjoiMHgiLCJleHAiOjE2NzgwMDQxODIsInJvbGUiOiJhZG1pbiJ9.AAyIbL6z32OQ-Xsnxte57SlrzKrLh-NgD1wH7o4_49A',
  },
  reducers: {
    startFetchConfig: (state) => {
      state.fetchingStatus = FetchStatus.FETCHING;
    },
    fetchingConfigSuccess: (state, action) => {
      state.fetchingStatus = FetchStatus.SUCCESS;
      Object.assign(state, action.payload);
    },
    fetchingConfigFail: (state) => {
      state.fetchingStatus = FetchStatus.FAILED;
    },
  },
});

export default configSlice.reducer;
export const { fetchingConfigSuccess, fetchingConfigFail, startFetchConfig } = configSlice.actions;

export const fetchingConfig = () => (dispatch: Dispatch) => {
  try {
    dispatch(startFetchConfig());
    const network = getCurrentNetwork();
    const data = { network };
    dispatch(fetchingConfigSuccess(data));
  } catch (error) {
    console.error(error);
    dispatch(fetchingConfigFail());
  }
};
