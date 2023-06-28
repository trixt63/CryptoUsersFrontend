/* eslint-disable @typescript-eslint/no-use-before-define */
import { createSlice, Dispatch, SliceCaseReducers } from '@reduxjs/toolkit';
import { FetchStatus } from 'src/constants';
import {
  fetchGraphBlock,
  fetchGraphDApp,
  fetchGraphProject,
  fetchGraphToken,
  fetchGraphTransaction,
  fetchGraphWallet,
} from 'src/services/visualize-api';
import { ApiVisualize, Link, Node } from 'src/services/visualize-api/data-types';

export type NodeData = {
  [key: string]: Node;
};

export type GraphSlice = {
  status: FetchStatus;
  data: { id?: string; nodes?: NodeData; links?: Array<Link>; focusedNode?: string };
  selectedNode?: string;
};

const initialState = {
  status: FetchStatus.IDLE,
  data: {},
  selectedNode: undefined,
};

export const fetchVisualizeData =
  (id: string, type: string, projectType?: string, chainId?: string) => async (dispatch: Dispatch) => {
    dispatch(startFetchVisualizationData(initialState));
    // eslint-disable-next-line prefer-const
    let result: NodeData = {};
    let res: ApiVisualize = {};
    try {
      if (type == 'wallet') {
        res = await fetchGraphWallet(id, { chain: chainId });
      } else if (type == 'token') {
        res = await fetchGraphToken(id, { chain: chainId });
      } else if (type == 'contract') {
        res = await fetchGraphDApp(id, { chain: chainId });
      } else if (type == 'project' && projectType) {
        res = await fetchGraphProject(id, { type: projectType, chain: chainId });
      } else if (type == 'tx') {
        res = await fetchGraphTransaction(id);
      } else if (type == 'block') {
        res = await fetchGraphBlock(id);
      } else throw new Error('wrong type');
      res.nodes?.forEach((item) => (result[item.id] = item));

      dispatch(
        fetchVisualizeDataSuccess({
          status: FetchStatus.SUCCESS,
          data: { id: res.id, links: res.links, nodes: result },
        })
      );
    } catch (error) {
      dispatch(fetchVisualizeDataFail(null));
    }
    finishFetchVisualizeData(null);
  };

const graphSlice = createSlice<GraphSlice, SliceCaseReducers<GraphSlice>>({
  name: 'graphSlice',
  initialState: initialState as GraphSlice,
  reducers: {
    startFetchVisualizationData: (state) => {
      state.status = FetchStatus.FETCHING;
    },
    fetchVisualizeDataSuccess: (state, action) => {
      state.status = action.payload.status;
      state.data = action.payload.data;
    },
    fetchVisualizeDataFail: (state) => {
      state.status = FetchStatus.FAILED;
    },
    finishFetchVisualizeData: (state, action) => {
      state.status = action.payload.status;
    },
    setSelectedNodeId: (state, action) => {
      state.selectedNode = action.payload;
    },
    setNodeAppearancesStatus: (state, action) => {
      if (state.data.nodes) {
        if (state.data.nodes[action.payload].isHide) {
          state.data.nodes[action.payload].isHide = false;
        } else {
          state.data.nodes[action.payload].isHide = true;
        }
      }
    },
  },
});

export default graphSlice.reducer;

export const {
  startFetchVisualizationData,
  fetchVisualizeDataSuccess,
  fetchVisualizeDataFail,
  finishFetchVisualizeData,
  setSelectedNodeId,
  setNodeAppearancesStatus,
} = graphSlice.actions;
