import { ServerPagination } from '..';

// APIs
export type ApiTransaction = {
  type: 'transaction';
  hash: string;
  from_address: string;
  to_address: string;
  value: string;
  gas: string;
  gas_price: string;
  input: string;
  block_timestamp: number;
  block_number: number;
  receipt_gas_used: string;
  receipt_contract_address?: string | null;
  receipt_status: number;
};

export type TopTokenPin = '1d' | '1w' | '1m' | '1y' | 'ytd' | 'all' | 'range';
export type ApiTopToken = {
  address: string;
  name: string;
  price: number;
  supply: number;
  market_cap: number;
  trading_volume: number;
};

export type ApiMostVisitedContract = {
  address: string;
  name: string;
  project?: string | null;
  url?: string | null;
  calls?: number | null;
};

export type ApiMarketCapHeatmap = {
  name: string;
  symbol: string;
  address: string;
  price: number;
  market_cap: number;
  trading_volume: number;
  price_change: number;
  percentage: number;
};

export type ApiTransactionDappHistory = {
  [timestamp: string]: {
    transaction: number;
    dapp: number;
  };
};

export type TransactionDappHistoryItem = {
  timestamp: number;
  transaction: number;
  dapp: number;
};

// v2
export type ApiHomeStatistic = {
  numberOfDApps: number;
  numberOfContracts: number;
  numberOfProtocols: number;
};
export type HomeDeFiItem = {
  id: string;
  type: string;
  name: string;
  imgUrl: string;
};
export type HomeNftItem = {
  id: string;
  type: string;
  name: string;
  imgUrl: string;
};
export type HomeTokenItem = {
  id: string;
  type: string;
  name: string;
  imgUrl: string;
};
export type HomeSpotItem = {
  id: string;
  type: string;
  name: string;
  imgUrl: string;
};
export type HomeDerivativeItem = {
  id: string;
  type: string;
  name: string;
  imgUrl: string;
};
export type ApiHomeIntro = {
  defi: HomeDeFiItem[];
  nfts: HomeNftItem[];
  tokens: HomeTokenItem[];
  spots: HomeSpotItem[];
  derivatives: HomeDerivativeItem[];
};

// Rankings

export type ApiDappRanking = {
  id: string;
  type: string;
  name: string;
  imgUrl: string;
  category: string;
  chains: Array<string>;
  tvl: number;
  tvlChangeRate: number;
  numberOfUsers: number;
  numberOfTransactions: number;
};
export type FetchDappsRankingParams = ServerPagination & {
  chain?: string;
  category?: string;
  duration?: number;
};
export type FetchDappsRankingResponse = {
  numberOfDocs: number;
  docs: Array<ApiDappRanking>;
};

export type ApiSpotExchangesRanking = {
  id: string;
  type: string;
  name: string;
  imgUrl: string;
  volume: number;
  volumeChangeRate: number;
  avgLiquidity: number;
  numberOfMarkets: number;
  numberOfCoins: number;
  fiatSupported?: string[] | null;
  // volumeHistory: {
  //   [timestamp: string]: number;
  // };
  volumeHistoryGraph: string;
  volumeHistoryGraphIsUp: boolean;
};
export type FetchSpotExchangesRankingResponse = {
  numberOfDocs: number;
  docs: Array<ApiSpotExchangesRanking>;
};
