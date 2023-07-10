export type ApiDashboardTokenOverview = {
  id: string;
  name: string;
  symbol: string;
  type: 'token';
  decimals: number;
  chains: string[];
  explorerUrls: string[];
  price: number;
  marketCap: number;
  tradingVolume: number;
  totalSupply: number;
  numberOfHolders: number;
  address: string;
  tokenHealth: number;
  socialNetworks: { [key: string]: string };
  sourceCode: string;
};

export type ApiDashBoardTokenIntroduction = {
  id: string;
  name: string;
  symbol: string;
  chains: Array<string>;
  explorerUrls?: Array<string>;
  price: number;
  markeyCap: number;
  imgUrl: string;
  tokeHealth: number;
  address: string;
};
export type ApiDashboardTokenTransactions = {
  id: string;
  numberOfTransfers: number;
  dailyTransfers: { [key: number]: number };
  transfers: Array<{
    id: string;
    chain: string;
    transactionHash: string;
    blockNumber: number;
    timestamp: number;
    fromAddress: string;
    toAddress: string;
    token: {
      id: string;
      name: string;
      type: string;
      chains: string[];
      symbol: string;
      imgUrl: string;
      price: number;
      priceChangeRate: number;
      tokenHealth: number;
    };
    value: 0;
    from: { id: string; address: string; name: string; type: string; chains: string[] };
    to: { id: string; address: string; name: string; type: string; chains: string[] };
  }>;
};
export type ApiTokenHolderType = {
  id: string;
  address: string;
  type: string;
  balance: number;
  isContract: boolean;
  value: number;
  percentage: number;
};
export type ApiDashboardTokenHolders = {
  id: string;
  numberOfHolders: number;
  numberOfTopHolders: number;
  holders: Array<ApiTokenHolderType>;
};

export type ApiDashboardTokenExchanges = {
  id: string;
  numberOfExchanges: number;
  exchanges: Array<{
    name: string;
    id: string;
    price: number;
    tradingVolume: number;
    type: string;
    projectType: string;
    isDex: boolean;
    pair: string;
  }>;
};
