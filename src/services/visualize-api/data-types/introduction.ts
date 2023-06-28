export type ApiIntroductionWallet = {
  id: string;
  name: string;
  address: string;
  explorerUrls: Array<string>;
  chains: Array<string>;
  creditScore: number;
  balance: number;
  dappsValue: number;
};

export type ApiIntroductionToken = {
  id: string;
  name: string;
  symbol: string;
  explorerUrls: Array<string>;
  chains: Array<string>;
  price: number;
  marketCap: number;
  imgUrl: string;
  tokenHealth: number;
};

export type ApiIntroductionContract = {
  id: string;
  name: string;
  address: string;
  explorerUrls: Array<string>;
  chains: Array<string>;
  tvl: number;
  transactions24h: number;
  users24h: number;
  verified: boolean;
};

export type ApiIntroductionProject = {
  id: string;
  projectId: string;
  name: string;
  imgUrl: string;
  tvl?: number;
  volume?: number;
  chains: Array<string>;
  explorerUrls: Array<string>;
  rank: number;
  projectType: string;
  tags: Array<string>;
  url: string;
};

export type ApiIntroductionTransaction = {
  id: string;
  name: string;
  hash: string;
  explorerUrls: Array<string>;
  chains: Array<string>;
};

export type ApiIntroductionBlock = {
  id: string;
  name: number;
  hash: string;
  number: number;
  explorerUrls: Array<string>;
  chains: Array<string>;
};
