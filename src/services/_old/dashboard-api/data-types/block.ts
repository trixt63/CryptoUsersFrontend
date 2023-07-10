import { ApiDashboardTransaction } from './tx';

export type ApiDashboardBlock = {
  id: string;
  chain: string;
  number: number;
  hash: string;
  timestamp: number;
  numberOfTransactions: number;
  difficulty: string;
  totalDifficulty: string;
  size: string;
  gasUsed: string;
  gasLimit: string;
  explorerUrl: string;
  validatedBy: {
    id: string;
    type: string;
    address: string;
    explorerUrl: string;
  };
};

export type ApiDashboardBlockTransactions = {
  id: string;
  numberOfTransactions: number;
  transactions: Array<Omit<ApiDashboardTransaction, 'explorerUrl' | 'fromAddressExplorerUrl' | 'toAddressExplorerUrl'>>;
};
