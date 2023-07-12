export type ProjectApiParams = {
    projectId: string;
    chain: string | undefined;
}

// TODO: merge Intro into one API
export type ApiCexIntro = {
    id: string;
    projectId: string;
    name: string;
    imgUrl: string;
    url: string;
    socialNetworks: object
};

export type ApiCexStats = {
    id: string;
    volume: number;
    users: number;
};

export type ApiCexTopWallet = {
    depositWallets: Array<string>;
    userWallets: Array<string>;
    socialNetworks: object;
};
export type FetchedCexTopWallets = Array<ApiCexTopWallet>