import { VisualizationLink, VisualizationNode } from 'src/types/visualization';

export type ProjectType = 'defi' | 'nft' | 'exchange';

export type ProjectApiParams = {
  projectId: string;
  type: ProjectType;
  chain?: string;
};

export type ApiProjectToken = {
  type: 'token';
  id: string;
  name: string;
  chains: Array<string>;
  symbol: string;
  imgUrl: string;
  price: number;
  priceChangeRate: number;
  tokenHealth: number;
};

export type ApiProjectContract = {
  id: string;
  name: string;
  type: string;
  chains: Array<string>;
};

export type ApiProjectOverview = {
  projectId: string;
  name: string;
  imgUrl: string;
  description: string;
  chains: Array<string>;
  rank: number;
  projectType: ProjectType;
  tags: Array<string>;
  url: string;
  docs: string;
  whitepaper: string;
  socialNetworks: {
    [key: string]: string;
  };
  sourceCode: string;
  tokens: Array<ApiProjectToken>;
  subprojects: Array<{
    id: string;
    type: string;
    name: string;
  }>;
  contracts: Array<ApiProjectContract>;
};

export type ApiProjectNFTStats = {
  projectId: string;
  price?: number | null;
  priceChangeRate?: number | null;
  volume?: number | null;
  volumeChangeRate?: number | null;
  numberOfItems?: number | null;
  listedRate?: number | null;
  numberOfOwners?: number | null;
  uniqueRate?: number | null;
  history: {
    [key: string]: {
      price: number;
      volume: number;
    };
  };
};

export type ApiProjectExchangeStats = {
  projectId: string;
  volume?: number | null;
  volumeChangeRate?: number | null;
  numberOfMarkets?: number | null;
  numberOfCoins?: number | null;
  history: {
    [key: string]: {
      volume: number;
    };
  };
};

export type ApiProjectDeFiStats = {
  projectId: string;
  tvl?: number | null;
  tvlChangeRate?: number | null;
  numberOfActiveWallets?: number | null;
  numberOfTransactions?: number | null;
  capPerTVL?: number | null;
  history: {
    [key: string]: {
      tvl: number;
      numberOfTransactions: number;
      numberOfActiveWallets: number;
    };
  };
};

export type ApiProjectVisualization = {
  projectId: string;
  focusedNote: string;
  nodes: Array<VisualizationNode>;
  links: Array<VisualizationLink>;
};
