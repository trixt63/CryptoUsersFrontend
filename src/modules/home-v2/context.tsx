import { createContext, useContext } from 'react';
import { ApiHomeStatistic, FetchDappsRankingResponse, FetchSpotExchangesRankingResponse } from 'src/services/home-api/data-types';

export type HomeData = {
  // intro: ApiHomeIntro;
  statistic: ApiHomeStatistic;
  // nfts: FetchNFTsRankingResponse;
  // tokens: FetchTokensRankingResponse;
  // derivatives: FetchDerivativeExchangesRankingResponse;
  defi: FetchDappsRankingResponse;
  spots: FetchSpotExchangesRankingResponse;
};

export const HomeContext = createContext({} as HomeData);
export const HomeContextProvider = HomeContext.Provider;

export function useHomeContext() {
  return useContext(HomeContext);
}
