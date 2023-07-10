import fetchJson from 'src/utils/FetchJson';
import { getApi } from '../../index';
import { ApiVisualize } from './data-types';
import {
  ApiIntroductionBlock,
  ApiIntroductionContract,
  ApiIntroductionProject,
  ApiIntroductionToken,
  ApiIntroductionTransaction,
  ApiIntroductionWallet,
} from './data-types/introduction';

//visualize

export async function fetchGraphWallet(address: string, params?: { chain?: string }) {
  return await fetchJson<ApiVisualize>(getApi(`/wallets/${address}/visualize`, params ?? {}));
}

export async function fetchGraphToken(tokenId: string, params?: { chain?: string }) {
  return await fetchJson<ApiVisualize>(getApi(`/tokens/${tokenId}/visualize`, params ?? {}));
}

export async function fetchGraphDApp(dAppId: string, params?: { chain?: string }) {
  return await fetchJson<ApiVisualize>(getApi(`/contracts/${dAppId}/visualize`, params ?? {}));
}

export async function fetchGraphProject(projectId: string, params: { type: string; chain?: string }) {
  return await fetchJson<ApiVisualize>(getApi(`/projects/${projectId}/visualize`, params ?? {}));
}

export async function fetchGraphTransaction(id: string) {
  return await fetchJson<ApiVisualize>(getApi(`/transactions/${id}/visualize`));
}

export async function fetchGraphBlock(id: string) {
  return await fetchJson<ApiVisualize>(getApi(`/blocks/${id}/visualize`));
}

//introduction

export async function fetchIntroductionWallet(address: string, params?: { chainId?: string }) {
  return await fetchJson<ApiIntroductionWallet>(getApi(`/wallets/${address}/introduction`, params ?? {}));
}

export async function fetchIntroductionToken(tokenId: string, params?: { chainId?: string }) {
  return await fetchJson<ApiIntroductionToken>(getApi(`/tokens/${tokenId}/introduction`, params ?? {}));
}

export async function fetchIntroductionContract(contractId: string, params?: { chainId?: string }) {
  return await fetchJson<ApiIntroductionContract>(getApi(`/contracts/${contractId}/introduction`, params ?? {}));
}

export async function fetchIntroductionProject(projectId: string, params: { type: string; chainId?: string }) {
  return await fetchJson<ApiIntroductionProject>(getApi(`/projects/${projectId}/introduction`, params ?? {}));
}

export async function fetchIntroductionTransaction(transactionHash: string) {
  return await fetchJson<ApiIntroductionTransaction>(getApi(`/transactions/${transactionHash}/introduction`));
}

export async function fetchIntroductionBlock(blockHash: string) {
  return await fetchJson<ApiIntroductionBlock>(getApi(`/blocks/${blockHash}/introduction`));
}
