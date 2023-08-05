import { API_ROOT, API_ROOT_V2 } from 'src/configs/api';
import fetchJson from 'src/utils/FetchJson';
import {getApi} from "src/services";
import {ProjectApiParams, ApiDexIntro, ApiDexStats, FetchedDexTopWalletsList} from "src/services/project-api/dex/data-types";

// v2
export async function fetchDexIntro(params: ProjectApiParams) {
  return await fetchJson<ApiDexIntro>(
      getApi(`/dex/${params.projectId}/introduction`, {chain: params.chain})
  );
}

export async function fetchDexStats(params: ProjectApiParams) {
  return await fetchJson<ApiDexStats>(
      getApi(`/dex/${params.projectId}/stats`, {chain: params.chain})
  );
}

export async function fetchDexWalletsList(params: ProjectApiParams) {
  return await fetchJson<FetchedDexTopWalletsList>(
    getApi(`/dex/${params.projectId}/top-traders`, {chain: params.chain})
  );
}


export async function fetchDexProject(params: ProjectApiParams) {
  const [intro, stats, topWallets] = await Promise.all([
    fetchDexIntro(params),
    fetchDexStats(params),
    fetchDexWalletsList(params),
  ]);
  return {
    intro,
    stats,
    topWallets,
  };
}

// export async function fetchHomeStatistic() {
//   return await fetchJson<ApiHomeStatistic>(`${API_ROOT_V2}/homepage/statistic`);
// }

// export async function fetchHomeData() {
//   const [res1] = await Promise.all([fetchJson<ApiHomeIntro>(`${API_ROOT_V2}/homepage/intro`)]);
//   return {
//     intro: res1,
//   };
// }

// export async function fetchLatestTransactions(chainId = '0x38', limit = 10) {
//   const res = await fetch(`${API_ROOT}/home/latest-transactions?chain_id=${chainId}&limit=${limit}`);
//   return (await res.json()) as Array<ApiTransaction>;
// }
//
// export async function fetchTopTokens(chainId = '0x38', limit = 5) {
//   const res = await fetch(`${API_ROOT}/home/top-tokens?chain_id=${chainId}&limit=${limit}`);
//   return (await res.json()) as Array<ApiTopToken>;
// }
//
// export async function fetchMostVisitedContracts(chainId = '0x38', limit = 5) {
//   const res = await fetch(`${API_ROOT}/home/most-visited-contracts?chain_id=${chainId}&limit=${limit}`);
//   return (await res.json()) as Array<ApiMostVisitedContract>;
// }
//
// export async function fetchMarketCapHeatmap() {
//   const res = await fetch(`${API_ROOT}/home/heat-map-market-cap`);
//   return (await res.json()) as Array<ApiMarketCapHeatmap>;
// }
//
// export async function fetchTransactionDappHistory(chainId = '0x38', pin: TopTokenPin = '1d') {
//   const res = await fetch(`${API_ROOT}/home/transaction-dapp-history?chain_id=${chainId}&days=${pin}`);
//   const json = (await res.json()) as ApiTransactionDappHistory;
//   return Object.entries(json).map<TransactionDappHistoryItem>(([t, v]) => ({ timestamp: Number(t) * 1000, ...v }));
// }

