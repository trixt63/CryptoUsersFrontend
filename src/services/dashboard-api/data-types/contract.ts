import { ApiDashboardTransaction } from './tx';

export type ApiDashboardContractIntroduction = {
  id: string;
  name: string;
  transactions24h: number;
  users24h: number;
  address: string;
  explorerUrls: string[];
  chains: string[];
};

export type ApiDashboardContractOverview = ApiDashboardContractIntroduction & {
  createdAt: number;
  verified: boolean;
  numberOfTransactions: number;
  project?: {
    id: string;
    type: 'project';
    name: string;
    projectType: string;
    url: string;
  } | null;
  tvl: number;
  tokens: Array<{
    id: string;
    type: string;
    name: string;
    symbol: string;
    imgUrl: string;
    amount: number;
    valueInUSD: number;
  }>;
};

export type ApiDashboardContractTransactions = {
  id: string;
  numberOfTransactions: number;
  dailyTransactions: {
    [timestamp: string]: number;
  };
  transactions: Array<Omit<ApiDashboardTransaction, 'explorerUrl' | 'fromAddressExplorerUrl' | 'toAddressExplorerUrl'>>;
};

export type ApiDashboardContractUser = {
  id: string;
  address: string;
  tvl: number;
  percentage: number;
  lastActiveAt: number;
};

export type ApiDashboardContractUsers = {
  id: string;
  numberOfUsers: number;
  numberOfTopUsers: number;
  users: Array<ApiDashboardContractUser>;
};
