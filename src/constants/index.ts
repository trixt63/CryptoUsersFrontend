export const isDev = process.env.NODE_ENV === 'development';
export const isTestMode = process.env.NEXT_PUBLIC_TEST_MODE === 'true';

export enum FetchStatus {
  IDLE = 'idle',
  FETCHING = 'fetching',
  UPDATING = 'updating',
  SUCCESS = 'success',
  FAILED = 'failed',
}

export const LS = {
  THEME: 'theme',
  CONNECTOR: 'connector',
  CHAIN_ID: 'chainId',
  ID: 'id',
};
