export type ApiDashboardTransaction = {
  id: string;
  chain: string;
  hash: string;
  status: number;
  blockNumber: number;
  timestamp: number;
  fromAddress: string;
  toAddress: string;
  value: number;
  method: string;
  input: string;
  gas: number;
  gasLimit: number;
  gasPrice: number;
  from: {
    id: string;
    address: string;
    name: string;
    type: string;
  };
  to: {
    id: string;
    address: string;
    name: string;
    type: string;
  };
  explorerUrl: string;
  fromAddressExplorerUrl: string;
  toAddressExplorerUrl: string;
};

export type ApiDashboardToken = {
  id: string;
  name: string;
  type: 'token';
  chains: string[];
  symbol: string;
  imgUrl: string;
  price: number | null;
  priceChangeRate: number | null;
  tokenHealth: number | null;
  address?: string;
};

export type ApiDashboardTransfer = {
  chain: string;
  transactionHash: string;
  blockNumber: number;
  fromAddress: string;
  toAddress: string;
  token: ApiDashboardToken;
  value: number;
};

export type ApiDashboardTransactionTransfers = {
  id: string;
  numberOfTransfers: 3;
  transfers: Array<ApiDashboardTransfer>;
};
