import type { Ethereum } from 'wagmi';

export interface ExtendEthereum extends Ethereum {
  isSafePal?: true;
  isCoin98?: true;
  // isBlocto?: true;
  // isMathWallet?: true;
  isTrustWallet?: true;
}

declare global {
  interface Window {
    coin98?: true;
    ethereum?: ExtendEthereum;
    BinanceChain?: {
      bnbSign?: (address: string, message: string) => Promise<{ publicKey: string; signature: string }>;
      switchNetwork?: (networkId: string) => Promise<string>;
    } & Ethereum;
  }
}

declare global {
  interface Window {
    coin98?: true;
    ethereum?: ExtendSliderUnstyled;
  }
}

export type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>;

export type Range<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>;
