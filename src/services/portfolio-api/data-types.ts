export type FetchCreditScoreParams = {
  address?: string;
  chain?: string;
  duration?: number;
  history?: boolean;
};

export type FetchCreditScoreResponse = {
  address: string;
  creditScore: number;
  topCreditScorePercentage: number;
  balance: number;
  balanceChangeRate: number;
  creditScoreHistory: {
    [key: string]: {
      creditScore: number;
      balance: number;
    };
  };
};

export type FetchAlertsParams = {
  address?: string;
  chain?: string;
  startTime?: number;
  type?: string;
};

export type Alert = {
  timestamp: number;
  type: string;
  direct: string;
  valueInUSD: number;
  changeRate: number;
  duration: number;
  token?: {
    id: string;
    type: string;
    name: string;
    symbol: string;
    imgUrl: string;
  };
};

export type FetchAlertsResponse = {
  address: string;
  startTime: number;
  endTime: number;
  alerts: Array<Alert>;
};

export type FetchTokenBalanceParams = {
  address?: string;
  tokenId?: string;
  chain?: string;
  duration?: number;
};

export type FetchTokenBalanceResponse = {
  tokenBalanceHistory: {
    [key: string]: {
      amount: number;
      price: number;
    };
  };
};

export type FetchDAppsTokenBalanceParams = {
  address?: string;
  dAppId?: string;
  tokenId?: string;
  action?: string;
  chain?: string;
  duration?: number;
};

export type FetchDappTokenBalanceResponse = {
  address: string;
  dappId: string;
  tokenId: string;
  action: string;
  dappTokenBalanceHistory: {
    [key: string]: {
      amount: number;
      price: number;
    };
  };
};
