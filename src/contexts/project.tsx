/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext } from 'react';
// import { fetchProject } from 'src/services/_old/project-api';
import {fetchCexProject} from 'src/services/project-api/cex'
import {
  ApiProjectDeFiStats,
  ApiProjectExchangeStats,
  ApiProjectNFTStats,
  ProjectType,
} from 'src/services/_old/project-api/data-types';
import {ApiCexIntro, ApiCexStats} from "src/services/project-api/cex/data-types";

export type ProjectData = Awaited<ReturnType<typeof fetchCexProject>> & {
  id: string;
  chain: string;
  // type: ProjectType;
};

export const ProjectContext = createContext({} as ProjectData);
export const ProjectContextProvider = ProjectContext.Provider;

export const useProjectContext = () => useContext(ProjectContext);
// breakdown breakdown
// export const useProjectOverview = () => useProjectContext().overview;
// export const useProjectDeFiStats = () => useProjectContext().stats as ApiProjectDeFiStats;
// export const useProjectExchangeStats = () => useProjectContext().stats as ApiProjectExchangeStats;
export const useProjectExchangeIntro = () => useProjectContext().intro as ApiCexIntro;
export const useProjectExchangeStats = () => useProjectContext().stats as ApiCexStats;
// export const useProjectNFTStats = () => useProjectContext().stats as ApiProjectNFTStats;
// export const useProjectVisualization = () => useProjectContext().visualization;
export const useProjectParams = () => {
  const data = useProjectContext();
  return {
    id: data.id,
    chain: data.chain,
    // type: data.type,
  };
};
