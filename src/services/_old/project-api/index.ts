import fetchJson from 'src/utils/FetchJson';
import { getApi } from '../../index';
import {
  ApiProjectDeFiStats,
  ApiProjectExchangeStats,
  ApiProjectNFTStats,
  ApiProjectOverview,
  ApiProjectVisualization,
  ProjectApiParams,
} from './data-types';

export async function fetchProjectOverview(params: ProjectApiParams) {
  return fetchJson<ApiProjectOverview>(
    getApi(`/projects/${params.projectId}/overview`, { type: params.type, chain: params.chain })
  );
}

export async function fetchProjectStats(params: ProjectApiParams & { history?: boolean }) {
  return fetchJson<ApiProjectDeFiStats | ApiProjectExchangeStats | ApiProjectNFTStats>(
    getApi(`/projects/${params.projectId}/stats`, {
      type: params.type,
      chain: params.chain,
      history: params.history,
    })
  );
}

export async function fetchProjectVisualization(params: ProjectApiParams) {
  return fetchJson<ApiProjectVisualization>(
    getApi(`/projects/${params.projectId}/visualize`, { type: params.type, chain: params.chain })
  );
}

export async function fetchProject(params: ProjectApiParams) {
  const [overview, stats, visualization] = await Promise.all([
    fetchProjectOverview(params),
    fetchProjectStats({ ...params, history: true }),
    fetchProjectVisualization(params),
  ]);
  return {
    overview,
    stats,
    visualization,
  };
}
