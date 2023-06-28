import { client } from 'src/wagmi/config';
import { WagmiConfig } from 'wagmi';

export function WagmiProvider({ children }: { children: React.ReactNode }) {
  return <WagmiConfig client={client}>{children}</WagmiConfig>;
}
