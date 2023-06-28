import { WalletConfig } from 'src/configs/wallet';

import useSWRImmutable from 'swr/immutable';

export function useSelectedWallet() {
  const { data, mutate } = useSWRImmutable<WalletConfig | null | undefined>('selectedWallet', {
    fallbackData: null,
  });

  return [data, mutate] as [WalletConfig | null | undefined, (w: WalletConfig | null | undefined) => void];
}

export function useWalletConnectionError() {
  const { data, mutate } = useSWRImmutable<string>('wallet-error', { fallbackData: '' });

  return [data, mutate] as [string, (msg: string) => void];
}
