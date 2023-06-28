import { ServerPagination } from '..';

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

export type ApiDerivativeExchangeRanking = {
  id: string;
  type: string;
  name: string;
  imgUrl: string;
  volume: number;
  volumeChangeRate: number;
  makerFeesRate: number;
  takerFeesRate: number;
  openInterests: number;
  numberOfMarkets: number;
  launchedAt: number;
};
export type FetchDerivativeExchangesRankingResponse = {
  numberOfDocs: number;
  docs: Array<ApiDerivativeExchangeRanking>;
};

export type ApiNFTsRanking = {
  id: string;
  type: string;
  name: string;
  imgUrl: string;
  volume: number;
  volumeChangeRate: number;
  price: number;
  priceChangeRate: number;
  numberOfOwners: number;
  numberOfItems: number;
};
export type FetchNFTsRankingResponse = {
  numberOfDocs: number;
  docs: Array<ApiNFTsRanking>;
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

export type ApiTokensRanking = {
  id: string;
  type: string;
  name: string;
  imgUrl: string;
  tokenHealth: number;
  volume: number;
  // volumeChangeRate: number;
  marketCap: number;
  price: number;
  priceChangeRate: number;
  numberOfHolders: number;
};
export type FetchTokensRankingResponse = {
  numberOfDocs: number;
  docs: Array<ApiTokensRanking>;
};
