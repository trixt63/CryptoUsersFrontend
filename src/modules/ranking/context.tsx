/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext } from 'react';
import {
  FetchDappsRankingResponse,
  FetchDerivativeExchangesRankingResponse,
  FetchNFTsRankingResponse,
  FetchSpotExchangesRankingResponse,
  FetchTokensRankingResponse,
} from 'src/services/_old/ranking-api/data-types';

export interface RankingPagination {
  page: number;
  pageSize: number;
  order: 'asc' | 'desc';
  orderBy: string;
  total: number;
}

export interface DeFiRankingData {
  chain?: string | null;
  t?: string;
  c?: string;
  data: FetchDappsRankingResponse;
  title: string;
  description: string;
  pagination: RankingPagination;
}

export interface NFTsRankingData {
  t?: string;
  data: FetchNFTsRankingResponse;
  title: string;
  description: string;
  pagination: RankingPagination;
}

export interface TokensRankingData {
  t?: string;
  data: FetchTokensRankingResponse;
  title: string;
  description: string;
  pagination: RankingPagination;
}

export interface SpotsRankingData {
  t?: string;
  data: FetchSpotExchangesRankingResponse;
  title: string;
  description: string;
  pagination: RankingPagination;
}

export interface DerivativesRankingData {
  t?: string;
  data: FetchDerivativeExchangesRankingResponse;
  title: string;
  description: string;
  pagination: RankingPagination;
}

export const RankingContext = createContext({} as any);
export const RankingContextProvider = RankingContext.Provider;

export function useRankingContext<T = any>() {
  return useContext<T>(RankingContext);
}

export const useRankingPaginationContext = (): RankingPagination => useRankingContext().pagination ?? {};
export const useDeFiRankingContext = () => useRankingContext<DeFiRankingData>();
export const useNFTsRankingContext = () => useRankingContext<NFTsRankingData>();
export const useTokensRankingContext = () => useRankingContext<TokensRankingData>();
export const useSpotsRankingContext = () => useRankingContext<SpotsRankingData>();
export const useDerivativesRankingContext = () => useRankingContext<DerivativesRankingData>();
