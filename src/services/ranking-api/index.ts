/* eslint-disable @typescript-eslint/no-explicit-any */
import fetchJson from 'src/utils/FetchJson';
import { getApi, ServerPagination } from '..';
import {
  FetchDappsRankingParams,
  FetchDappsRankingResponse,
  FetchDerivativeExchangesRankingResponse,
  FetchNFTsRankingResponse,
  FetchSpotExchangesRankingResponse,
  FetchTokensRankingResponse,
} from './data-types';

export async function fetchDappsRanking(params?: FetchDappsRankingParams) {
  return await fetchJson<FetchDappsRankingResponse>(getApi('/ranking/dapps', params ?? {}));
}

export async function fetchDerivativeExchangesRanking(params?: { duration?: number } & ServerPagination) {
  return await fetchJson<FetchDerivativeExchangesRankingResponse>(
    getApi('/ranking/derivative-exchanges', params ?? {})
  );
}

export async function fetchNFTsRanking(params?: { duration?: number } & ServerPagination) {
  return await fetchJson<FetchNFTsRankingResponse>(getApi('/ranking/nfts', params ?? {}));
}

export async function fetchSpotExchangesRanking(params?: { duration?: number } & ServerPagination) {
  return await fetchJson<FetchSpotExchangesRankingResponse>(getApi('/ranking/spot-exchanges', params ?? {}));
}

export async function fetchTokensRanking(params?: { duration?: number } & ServerPagination) {
  return await fetchJson<FetchTokensRankingResponse>(getApi('/ranking/tokens', params ?? {}));
}
