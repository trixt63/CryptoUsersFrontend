import { createContext, useContext } from 'react';
import { ApiHomeIntro, FetchHomeCexes, FetchHomeDexes, FetchHomeLendings } from 'src/services/home-api/data-types';

export type HomeData = {
  intro: ApiHomeIntro;
  cexes: FetchHomeCexes;
  dexes: FetchHomeDexes;
  lendings: FetchHomeLendings;
};

export const HomeContext = createContext({} as HomeData);
export const HomeContextProvider = HomeContext.Provider;

export function useHomeContext() {
  return useContext(HomeContext);
}
