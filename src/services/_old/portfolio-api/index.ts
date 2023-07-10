import { fetchAuthJson } from 'src/utils/FetchJson';
import { getApi } from '../../index';
import {
  FetchAlertsParams,
  FetchAlertsResponse,
  FetchCreditScoreParams,
  FetchCreditScoreResponse,
  FetchDAppsTokenBalanceParams,
  FetchDappTokenBalanceResponse,
  FetchTokenBalanceParams,
  FetchTokenBalanceResponse,
} from './data-types';

export async function fetchCreditScore(address: string, params: FetchCreditScoreParams) {
  return await fetchAuthJson<FetchCreditScoreResponse>(getApi(`/portfolio/${address}/credit-score`, params ?? {}));
}

export async function fetchAlerts(address: string, params: FetchAlertsParams) {
  return await fetchAuthJson<FetchAlertsResponse>(getApi(`/portfolio/${address}/alerts`, params ?? {}));
}

export async function fetchTokenBalance(address: string, tokenId: string, params: FetchTokenBalanceParams) {
  return await fetchAuthJson<FetchTokenBalanceResponse>(
    getApi(`/portfolio/${address}/tokens/${tokenId}`, params ?? {})
  );
}

export async function fetchDAppsTokenBalance(
  address: string,
  dAppId: string,
  tokenId: string,
  params: FetchDAppsTokenBalanceParams
) {
  return await fetchAuthJson<FetchDappTokenBalanceResponse>(
    getApi(`/portfolio/${address}/dapp/${dAppId}/${tokenId}`, params ?? {})
  );
}
