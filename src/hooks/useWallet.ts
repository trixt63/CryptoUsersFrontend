import { useMemo } from 'react';
import { walletsConfig } from 'src/configs/wallet';
import { useWeb3React } from 'src/wagmi';

export default function useWallet() {
  const { connector } = useWeb3React();

  const wallet = useMemo(() => {
    return walletsConfig().find((w) => w.connectorId === connector?.id);
  }, [connector]);

  return wallet ?? null;
}
