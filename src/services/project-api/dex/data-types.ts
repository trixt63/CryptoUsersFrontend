export type ProjectApiParams = {
  projectId: string;
  chain: string | undefined;
};

// TODO: merge Intro into one API
export type ApiDexIntro = {
  id: string;
  projectId: string;
  name: string;
  imgUrl: string;
  url: string | null;
  socialNetworks: object;
  chains: Array<string>;
};

export type ApiDexStats = {
  id: string;
  tvl: number;
  traders: number;
};

export type ApiDexTopWalletsList = {
  id: string;
  address: Array<string>;
};
export type FetchedDexTopWalletsList = Array<ApiDexTopWalletsList>;
