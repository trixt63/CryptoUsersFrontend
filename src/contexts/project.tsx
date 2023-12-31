/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext } from 'react';
// import { fetchProject } from 'src/services/_old/project-api';
import {fetchCexProject} from 'src/services/project-api/cex'
import {ApiCexIntro, ApiCexStats, FetchedCexWhalesList} from "src/services/project-api/cex/data-types";
import {ApiDexIntro, ApiDexStats, FetchedDexTopWalletsList} from "src/services/project-api/dex/data-types";

export type ProjectData = Awaited<ReturnType<typeof fetchCexProject>> & {
  id: string;
  chain: string;
  // type: ProjectType;
};

export const ProjectContext = createContext({} as ProjectData);
export const ProjectContextProvider = ProjectContext.Provider;

export const useProjectContext = () => useContext(ProjectContext);
// breakdown
export const useProjectExchangeIntro = () => useProjectContext().intro as ApiCexIntro;
export const useProjectExchangeStats = () => useProjectContext().stats as ApiCexStats;
export const useProjectExchangeWhalesList = () => useProjectContext().topWallets as FetchedCexWhalesList;

export const useProjectDexIntro = () => useProjectContext().intro as ApiDexIntro;
export const useProjectDexStats = () => useProjectContext().stats as ApiDexStats;
export const useProjectDexWalletsList = () => useProjectContext().topWallets as FetchedDexTopWalletsList;

export const useProjectParams = () => {
  const data = useProjectContext();
  return {
    id: data.id,
    chain: data.chain,
    // type: data.type,
  };
};
