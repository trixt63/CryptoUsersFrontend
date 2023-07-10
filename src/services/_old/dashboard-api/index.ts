import fetchJson from 'src/utils/FetchJson';
import { getApi } from '../../index';
import {
  ApiDashboardBlock,
  ApiDashboardBlockTransactions,
  ApiDashboardTransaction,
  ApiDashboardTransactionTransfers,
  ApiDashboardWallet,
  ApiDashboardWalletCreditScore,
  ApiDashboardWalletMoneyFlow,
  ApiDashboardWalletTransactions,
  ApiDashboardTokenHolders,
  ApiDashboardTokenExchanges,
  ApiDashboardTokenTransactions,
  ApiDashboardTokenOverview,
  ApiDashBoardTokenIntroduction,
} from './data-types';
import {
  ApiDashboardContractIntroduction,
  ApiDashboardContractOverview,
  ApiDashboardContractTransactions,
  ApiDashboardContractUsers,
} from './data-types/contract';

// Block
export async function fetchDashboardBlock(blockHash: string, params?: { chain?: string }) {
  return await fetchJson<ApiDashboardBlock>(getApi(`/blocks/${blockHash}/overview`, params));
}

export async function fetchDashboardBlockTransactions(blockHash: string, params?: { chain?: string }) {
  return await fetchJson<ApiDashboardBlockTransactions>(getApi(`/blocks/${blockHash}/transactions`, params));
}

// Token
export async function fetchDashboardToken(tokenName: string, params?: { chain?: string }) {
  return await fetchJson<ApiDashboardTokenOverview>(getApi(`/tokens/${tokenName}/overview`, params));
}
export async function fetchDashboardTokenIntro(tokenName: string, params?: { chain?: string }) {
  return await fetchJson<ApiDashBoardTokenIntroduction>(getApi(`/tokens/${tokenName}/introduction`, params));
}
export async function fetchDashboardTokenTransactions(
  tokenName: string,
  params?: { chain?: string; page?: number; pageSize?: number }
) {
  return await fetchJson<ApiDashboardTokenTransactions>(getApi(`/tokens/${tokenName}/transfers`, params));
}

export async function fetchDashboardTokenHolders(tokenName: string, params?: { chain?: string }) {
  return await fetchJson<ApiDashboardTokenHolders>(getApi(`/tokens/${tokenName}/holders`, params));
}

export async function fetchDashboardTokenExchanges(tokenName: string, params?: { chain?: string }) {
  return await fetchJson<ApiDashboardTokenExchanges>(getApi(`/tokens/${tokenName}/exchanges`, params));
}

// Transaction
export async function fetchDashboardTransaction(transactionHash: string, params?: { chain?: string }) {
  return await fetchJson<ApiDashboardTransaction>(getApi(`/transactions/${transactionHash}/overview`, params ?? {}));
}

export async function fetchDashboardTransactionTransfers(transactionHash: string, params?: { chain?: string }) {
  return await fetchJson<ApiDashboardTransactionTransfers>(
    getApi(`/transactions/${transactionHash}/transfers`, params)
  );
}

// Wallet
export async function fetchDashboardWalletOverview(address: string, params?: { chain?: string }) {
  return await fetchJson<ApiDashboardWallet>(getApi(`/wallets/${address}/overview`, params));
}

export async function fetchDashboardWalletCreditScore(address: string, params?: { chain?: string }) {
  return await fetchJson<ApiDashboardWalletCreditScore>(getApi(`/wallets/${address}/credit-score`, params));
}

export async function fetchDashboardWalletMoneyFlow(address: string, params?: { chain?: string }) {
  return await fetchJson<ApiDashboardWalletMoneyFlow>(getApi(`/wallets/${address}/money-flow`, params));
}

export async function fetchDashboardWalletTransactions(
  address: string,
  params?: { chain?: string; page?: string | number; pageSize?: string | number }
) {
  return await fetchJson<ApiDashboardWalletTransactions>(getApi(`/wallets/${address}/transactions`, params));
}

// Contract
export async function fetchDashboardContract(id: string) {
  return await fetchJson<ApiDashboardContractOverview>(getApi(`/contracts/${id}/overview`));
}

export async function fetchDashboardContractIntroduction(id: string) {
  return await fetchJson<ApiDashboardContractIntroduction>(getApi(`/contracts/${id}/introduction`));
}

export async function fetchDashboardContractTransactions(
  id: string,
  params?: { page?: string | number; pageSize?: string | number }
) {
  return await fetchJson<ApiDashboardContractTransactions>(getApi(`/contracts/${id}/transactions`, params));
}

export async function fetchDashboardContractUsers(id: string) {
  return await fetchJson<ApiDashboardContractUsers>(getApi(`/contracts/${id}/users`));
}
