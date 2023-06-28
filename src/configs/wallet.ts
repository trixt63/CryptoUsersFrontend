import { isFirefox } from 'react-device-detect';
import { ExtendEthereum } from 'src/global';
import { getTrustWalletProvider } from 'src/wagmi/connectors/trusWallet';

export class WalletConnectorNotFoundError extends Error {
  constructor() {
    super('No provider found');
  }
}

type LinkOrTextAndLink = string | { text: string; url: string };

type DeviceLink = {
  desktop?: LinkOrTextAndLink;
  mobile?: LinkOrTextAndLink;
};

export type LinkOfDevice = string | DeviceLink;

// wagmi connector id
export enum ConnectorNames {
  MetaMask = 'metaMask',
  Injected = 'injected',
  WalletConnect = 'walletConnect',
  BSC = 'bsc',
  Coinbase = 'coinbaseWallet',
  Ledger = 'ledger',
  TrustWallet = 'trustWallet',
}

export type WalletConfig = {
  id: string;
  title: string;
  icon: string;
  connectorId: ConnectorNames;
  deepLink?: string;
  installed?: boolean;
  guide?: LinkOfDevice;
  downloadLink?: LinkOfDevice;
  mobileOnly?: boolean;
  qrCode?: () => Promise<string>;
};

const isMetamaskInstalled = () => {
  if (typeof window === 'undefined') {
    return false;
  }

  if (window.ethereum?.isMetaMask) {
    return true;
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (window.ethereum?.providers?.some((p) => p.isMetaMask)) {
    return true;
  }

  return false;
};

export const walletsConfig: () => WalletConfig[] = () => {
  return [
    {
      id: 'metamask',
      title: 'Metamask',
      icon: '/images/wallets/metamask.png',
      get installed() {
        return isMetamaskInstalled();
        // && metamaskConnector.ready;
      },
      connectorId: ConnectorNames.MetaMask,
      deepLink: 'https://metamask.app.link/dapp/centic.io/',
      downloadLink: {
        desktop: 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en',
        mobile: 'https://metamask.app.link/dapp/centic.io/',
      },
    },
    {
      id: 'coinbase',
      title: 'Coinbase Wallet',
      icon: '/images/wallets/coinbase.png',
      connectorId: ConnectorNames.Coinbase,
    },
    {
      id: 'binance',
      title: 'Binance Wallet',
      icon: '/images/wallets/binance.png',
      get installed() {
        return typeof window !== 'undefined' && Boolean(window.BinanceChain);
      },
      connectorId: ConnectorNames.BSC,
      guide: {
        desktop: 'https://www.bnbchain.org/en/binance-wallet',
      },
      downloadLink: {
        desktop: isFirefox
          ? 'https://addons.mozilla.org/en-US/firefox/addon/binance-chain'
          : 'https://chrome.google.com/webstore/detail/binance-wallet/fhbohimaelbohpjbbldcngcnapndodjp',
      },
    },
    {
      id: 'trust',
      title: 'Trust Wallet',
      icon: '/images/wallets/trustwallet.png',
      connectorId: ConnectorNames.TrustWallet,
      get installed() {
        return !!getTrustWalletProvider();
      },
      deepLink: 'https://link.trustwallet.com/open_url?url=https://centic.io/',
      downloadLink: 'https://chrome.google.com/webstore/detail/trust-wallet/egjidjbpglichdcondbcbdnbeeppgdph',
      guide: {
        desktop: 'https://trustwallet.com/browser-extension',
        mobile: 'https://trustwallet.com/',
      },
    },
    {
      id: 'ledger',
      title: 'Ledger',
      icon: '/images/wallets/ledger.png',
      connectorId: ConnectorNames.Ledger,
    },
    {
      id: 'walletconnect',
      title: 'WalletConnect',
      icon: '/images/wallets/walletconnect.png',
      connectorId: ConnectorNames.WalletConnect,
    },
    {
      id: 'coin98',
      title: 'Coin98',
      icon: '/images/wallets/coin98.png',
      connectorId: ConnectorNames.Injected,
      deepLink: 'https://coin98.com/dapp/centic.io/56',
      downloadLink: 'https://chrome.google.com/webstore/detail/coin98-wallet/aeachknmefphepccionboohckonoeemg',
      get installed() {
        return (
          typeof window !== 'undefined' &&
          (Boolean((window.ethereum as ExtendEthereum)?.isCoin98) || Boolean(window.coin98))
        );
      },
    },
    {
      id: 'opera',
      title: 'Opera Wallet',
      icon: '/images/wallets/opera.png',
      connectorId: ConnectorNames.Injected,
      get installed() {
        return typeof window !== 'undefined' && Boolean(window.ethereum?.isOpera);
      },
      downloadLink: 'https://www.opera.com/crypto/next',
    },
    {
      id: 'brave',
      title: 'Brave Wallet',
      icon: '/images/wallets/brave.png',
      connectorId: ConnectorNames.Injected,
      get installed() {
        return typeof window !== 'undefined' && Boolean(window.ethereum?.isBraveWallet);
      },
      downloadLink: 'https://brave.com/wallet/',
    },
  ];
};

export const createWallets = (): WalletConfig[] => {
  const hasInjected = typeof window !== 'undefined' && !window.ethereum;
  const config = walletsConfig();
  return hasInjected && config.some((w) => w.installed && w.connectorId === ConnectorNames.Injected)
    ? config
    : [
        ...config,
        {
          id: 'injected',
          title: 'Injected',
          icon: '/images/wallets/injected.png',
          connectorId: ConnectorNames.Injected,
          installed: typeof window !== 'undefined' && Boolean(window.ethereum),
        },
      ];
};
