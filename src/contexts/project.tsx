/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext } from 'react';
import { fetchProject } from 'src/services/_old/project-api';
import {
  ApiProjectDeFiStats,
  ApiProjectExchangeStats,
  ApiProjectNFTStats,
  ProjectType,
} from 'src/services/_old/project-api/data-types';

export type ProjectData = Awaited<ReturnType<typeof fetchProject>> & {
  id: string;
  chain: string;
  type: ProjectType;
};

export const ProjectContext = createContext({} as ProjectData);
export const ProjectContextProvider = ProjectContext.Provider;

export const useProjectContext = () => useContext(ProjectContext);
// breakdown breakdown
export const useProjectOverview = () => useProjectContext().overview;
export const useProjectDeFiStats = () => useProjectContext().stats as ApiProjectDeFiStats;
export const useProjectExchangeStats = () => useProjectContext().stats as ApiProjectExchangeStats;
export const useProjectNFTStats = () => useProjectContext().stats as ApiProjectNFTStats;
export const useProjectVisualization = () => useProjectContext().visualization;
export const useProjectParams = () => {
  const data = useProjectContext();
  return {
    id: data.id,
    chain: data.chain,
    type: data.type,
  };
};
