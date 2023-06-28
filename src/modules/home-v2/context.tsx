import { createContext, useContext } from 'react';
import { ApiHomeIntro, ApiHomeStatistic } from 'src/services/home-api/data-types';
import {
  FetchDappsRankingResponse,
  FetchDerivativeExchangesRankingResponse,
  FetchNFTsRankingResponse,
  FetchSpotExchangesRankingResponse,
  FetchTokensRankingResponse,
} from 'src/services/xt-home-api/data-types';

export type HomeData = {
  intro: ApiHomeIntro;
  statistic: ApiHomeStatistic;
  nfts: FetchNFTsRankingResponse;
  // defi: FetchDappsRankingResponse;
  // tokens: FetchTokensRankingResponse;
  // derivatives: FetchDerivativeExchangesRankingResponse;

  defis: FetchDappsSummaryResponse;
  spots: FetchSpotExchangesRankingResponse;
};

export const HomeContext = createContext({} as HomeData);
export const HomeContextProvider = HomeContext.Provider;

export function useHomeContext() {
  return useContext(HomeContext);
}
