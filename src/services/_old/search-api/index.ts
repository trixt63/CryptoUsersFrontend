import fetchJson from 'src/utils/FetchJson';
import { getApi } from '../../index';
import { ApiExplorerSearch, SearchType } from './data-types';

export async function fetchExplorerSearch(params: { keyword: string; type?: SearchType; chain?: string }) {
  return await fetchJson<ApiExplorerSearch>(getApi('/explorer/search', params));
}
