import { createSlice, SliceCaseReducers } from '@reduxjs/toolkit';

export type AuthSlice = {
  owner?: string;
  status: 'idle' | 'checking' | 'ready';
} & (
  | {
      token?: string;
      authenticated: false;
    }
  | {
      token: string;
      authenticated: true;
      status: 'ready';
    }
);

const authSlice = createSlice<AuthSlice, SliceCaseReducers<AuthSlice>>({
  name: 'authSlice',
  initialState: {
    authenticated: false,
    status: 'idle',
  },
  reducers: {
    login(state, action) {
      state.owner = action.payload.owner;
      state.token = state.token = action.payload.token;
      // state.owner = '0x5f54d6056a0ea0a3bc882455e9c287d64035e0f6';
      // state.token =
      //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRyZXNzIjoiMHgiLCJleHAiOjE2ODE4ODkxNDcsInJvbGUiOiJhZG1pbiJ9.yJ47WLgOncse911fHEZS9aEP2kuebhHqKQYMa9FJZ8g';
      state.authenticated = true;
      state.status = 'ready';
    },
    logout(state) {
      state.owner = undefined;
      state.token = undefined;
      state.authenticated = false;
      state.status = 'idle';
    },
    updateStatus(state, action) {
      state.status = action.payload.status;
    },
  },
});

export default authSlice.reducer;

export const { login, logout, updateStatus } = authSlice.actions;
