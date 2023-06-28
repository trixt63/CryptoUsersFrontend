export type SearchType = 'transaction' | 'block' | 'wallet' | 'text' | 'contract' | 'token';

export type SearchResult = {
  id: string;
  type: SearchType;
  name: string;
  chains: string[];
};

export type ApiExplorerSearch = {
  keyword: string;
  results: Array<SearchResult>;
};
