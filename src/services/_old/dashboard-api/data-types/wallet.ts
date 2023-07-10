import { ApiDashboardTransaction } from './tx';

export type ApiDashboardAsset = {
  id: string;
  type: 'token' | 'contract';
  name: string;
  symbol: string | null;
  imgUrl: string;
  amount: number;
  valueInUSD: number;
};

export type ApiDashboardDapp = {
  id: string;
  type: 'dapp';
  name: string;
  imgUrl: string;
  value: number;
};

export type ApiDashboardWallet = {
  address: string;
  chains: string[];
  explorerUrls: string[];
  creditScore: number;
  tracker: ApiDashboardAsset;
  balance: number;
  dappsValue: number;
  assets: Array<ApiDashboardAsset>;
  dapps: Array<ApiDashboardDapp>;
};

export type ApiDashboardWalletCreditScore = {
  address: string;
  creditScore: number;
  detail: {
    assets: number;
    transactions: number;
    loan: number;
    circulatingAssets: number;
    trustworthinessAssets: number;
  };
  minCreditScore: number;
  maxCreditScore: number;
  creditScoreHistory: {
    [timestamp: string]: {
      balance: number;
      creditScore: number;
    };
  };
};

export type ApiDashboardWalletToken = {
  id: string;
  type: 'token';
  name: string;
  symbol: string;
  input: {
    amount: number;
    valueInUSD: number;
  };
  output: {
    amount: number;
    valueInUSD: number;
  };
  transferVolume: number;
};

export type ApiDashboardWalletExchange = {
  id: string;
  name: string;
  type: string;
  tradingVolume: string;
  transactions: number;
};

export type ApiDashboardWalletMoneyFlow = {
  address: string;
  tokens: Array<ApiDashboardWalletToken>;
  exchanges: Array<ApiDashboardWalletExchange>;
};

export type ApiDashboardWalletTransaction = Omit<
  ApiDashboardTransaction,
  'contract' | 'explorerUrl' | 'fromAddressExplorerUrl' | 'toAddressExplorerUrl'
> & {
  from: {
    id: string;
    address: string;
    name: string;
    type: string;
  };
  to: {
    id: string;
    address: string;
    name: string;
    type: string;
    chains: string[];
  };
};

export type ApiDashboardWalletTransactions = {
  address: string;
  numberOfTransactions: number;
  dailyTransactions: {
    [timestamp: string]: number;
  };
  transactions: Array<ApiDashboardWalletTransaction>;
};
