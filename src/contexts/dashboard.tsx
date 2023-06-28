import { useRouter } from 'next/router';
import { createContext, useContext } from 'react';
import { fetchDashboardWalletOverview } from 'src/services/dashboard-api';
import {
  ApiDashboardBlock,
  ApiDashboardBlockTransactions,
  ApiDashboardTransaction,
  ApiDashboardTransactionTransfers,
  ApiDashboardWallet,
  ApiDashboardTokenHolders,
  ApiDashboardTokenExchanges,
  ApiDashboardTokenTransactions,
  ApiDashboardWalletCreditScore,
  ApiDashboardWalletMoneyFlow,
  ApiDashboardWalletTransactions,
  ApiDashboardTokenOverview,
  ApiDashBoardTokenIntroduction,
} from 'src/services/dashboard-api/data-types';
import {
  ApiDashboardContractOverview,
  ApiDashboardContractTransactions,
  ApiDashboardContractUsers,
} from 'src/services/dashboard-api/data-types/contract';
import { Token } from 'src/services/token-health-api/data-types';
import { ApiIntroductionBlock, ApiIntroductionContract } from 'src/services/visualize-api/data-types/introduction';
import useSWRImmutable from 'swr/immutable';

export type DashboardTransactionTransfersData = {
  data: ApiDashboardTransactionTransfers;
  transactionHash: string;
  explorerUrl: string;
  chain: string;
};

export type DashboardBlockTransactionsData = {
  data: ApiDashboardBlockTransactions;
  block: Pick<ApiIntroductionBlock, 'number' | 'explorerUrls' | 'hash' | 'chains'>;
};

export type DashboardTokenOverview = {
  data: ApiDashboardTokenOverview;
  token: ApiDashBoardTokenIntroduction;
};
export type DashboardTokenTransfersData = {
  data: ApiDashboardTokenTransactions;
  token: ApiDashBoardTokenIntroduction;
  page: number;
};

export type DashboardTokenHoldersData = {
  data: ApiDashboardTokenHolders;
  token: ApiDashBoardTokenIntroduction;
};

export type DashboardTokenExchangesData = {
  data: ApiDashboardTokenExchanges;
  token: ApiDashBoardTokenIntroduction;
};
export type DashboardTokenHealth = {
  token: ApiDashBoardTokenIntroduction;
  tokenHealth: Token;
};

type TDashboardWalletData<T> = {
  data: T;
  wallet: Pick<ApiDashboardWallet, 'address' | 'explorerUrls' | 'chains'>;
};

export type DashboardWalletTransactionsData = TDashboardWalletData<ApiDashboardWalletTransactions>;
export type DashboardWalletCreditScoreData = TDashboardWalletData<ApiDashboardWalletCreditScore>;
export type DashboardWalletMoneyFlowData = TDashboardWalletData<ApiDashboardWalletMoneyFlow>;

export const DashboardContext = createContext({} as unknown);

export const DashboardContextProvider = DashboardContext.Provider;

export function useDashboardContext() {
  return useContext(DashboardContext);
}

// block
export const useDashboardBlock = () => useDashboardContext() as ApiDashboardBlock;
export const useDashboardBlockTransactions = () => useDashboardContext() as DashboardBlockTransactionsData;

// Token
export const useDashboardToken = () => useDashboardContext() as DashboardTokenOverview;
export const useDashboardTokenTransfers = () => useDashboardContext() as DashboardTokenTransfersData;
export const useDashboardTokenHolders = () => useDashboardContext() as DashboardTokenHoldersData;
export const useDashboardTokenExchanges = () => useDashboardContext() as DashboardTokenExchangesData;
export const useDashboardTokenHealth = () => useDashboardContext() as DashboardTokenHealth;

// tx
export const useDashboardTransaction = () => useDashboardContext() as ApiDashboardTransaction;
export const useDashboardTransactionTransfers = () => useDashboardContext() as DashboardTransactionTransfersData;

// wallet
export const useDashboardWallet = () => useDashboardContext() as ApiDashboardWallet;
export const useDashboardWalletTransactions = () => useDashboardContext() as DashboardWalletTransactionsData;
export const useDashboardWalletMoneyFlow = () => useDashboardContext() as DashboardWalletMoneyFlowData;
export const useDashboardWalletCreditScore = () => useDashboardContext() as DashboardWalletCreditScoreData;
export const useDashboardWalletOverviewCached = () => {
  const router = useRouter();
  const { data, mutate } = useSWRImmutable(['wallet-overview', router.query.id], () =>
    fetchDashboardWalletOverview(router.query.id as string)
  );

  return { data, refresh: mutate as () => Promise<void> };
};

// contract
type TDashboardContractData<T> = {
  data: T;
  overview: Pick<ApiIntroductionContract, 'address' | 'chains' | 'explorerUrls' | 'name' | 'verified'>;
};
export type DashboardContractTransactionsData = TDashboardContractData<ApiDashboardContractTransactions>;
export type DashboardContractUsersData = TDashboardContractData<ApiDashboardContractUsers>;

export const useDashboardContractOverview = () => useDashboardContext() as ApiDashboardContractOverview;
export const useDashboardContractTransactions = () => useDashboardContext() as DashboardContractTransactionsData;
export const useDashboardContractUsers = () => useDashboardContext() as DashboardContractUsersData;
