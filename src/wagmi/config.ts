import { bsc, fantom, mainnet, polygon } from 'wagmi/chains';
import { configureChains, createClient } from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { LedgerConnector } from 'wagmi/connectors/ledger';
import { TrustWalletConnector } from './connectors/trusWallet';

const CHAINS = [bsc, mainnet, polygon, fantom];

export const { chains, provider } = configureChains(CHAINS, [
  // publicProvider(),
  jsonRpcProvider({
    rpc: (chain) => {
      return { http: chain.rpcUrls.default.http[0] };
    },
  }),
]);

export const injectedConnector = new InjectedConnector({
  chains,
  options: {
    shimDisconnect: true,
    shimChainChangedDisconnect: true,
  },
});

export const metamaskConnector = new MetaMaskConnector({
  chains,
  options: {
    shimDisconnect: true,
    shimChainChangedDisconnect: true,
  },
});

export const walletConnectConnector = new WalletConnectConnector({
  chains,
  options: {
    projectId: 'e798d9e6ae31f96eeb80c8396b17611b',
    showQrModal: true,
  },
});

export const coinbaseWalletConnector = new CoinbaseWalletConnector({
  chains,
  options: {
    appName: 'Centic',
    appLogoUrl: 'https://centic.io/images/logos/centic_dark_icon.png',
    // darkMode: true,
  },
});

export const trustWalletConnector = new TrustWalletConnector({
  chains,
  options: {
    shimDisconnect: true,
    shimChainChangedDisconnect: true,
  },
});

export const ledgerWalletConnector = new LedgerConnector({
  chains,
});

export const client = createClient({
  autoConnect: true,
  provider,
  connectors: [
    injectedConnector,
    metamaskConnector,
    trustWalletConnector,
    walletConnectConnector,
    coinbaseWalletConnector,
    ledgerWalletConnector,
  ],
});
