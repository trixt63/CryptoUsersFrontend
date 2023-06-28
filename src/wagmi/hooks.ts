import { Web3Provider } from '@ethersproject/providers';
import useSWRImmutable from 'swr/immutable';
import { useAccount, useNetwork } from 'wagmi';

export function useWeb3React() {
  const { chain } = useNetwork();
  const { address, connector, isConnected, isConnecting } = useAccount();

  const { data: library } = useSWRImmutable(connector && ['web3-library', connector, chain], async () => {
    const provider = await connector?.getProvider();
    return new Web3Provider(provider);
  });

  return {
    chainId: chain?.id,
    address: isConnected ? address : null,
    isConnected,
    isConnecting,
    connector,
    chain,
    web3Provider: library,
  };
}
