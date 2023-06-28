import { useDashboardTokenHealth } from 'src/contexts/dashboard';
import TokenLayout from '../TokenLayout';
import { Box } from '@mui/material';
import TokenDetail from './TokenDetail';
import { formatAddress } from '@travalendingpool/utils';
import dynamic from 'next/dynamic';

const DynamicTHChart = dynamic(() => import('./TokenHealthOverview'), { ssr: false });
export default function TokenHealth() {
  const { token } = useDashboardTokenHealth();

  return (
    <TokenLayout
      header={{
        name: 'Token',
        logoIcon: token.imgUrl,
        tokenName: token.name,
        symbol: token.symbol,
        value: token.address && formatAddress(token.address),
        valueCopy: String(token.address),
        externalLink: token.explorerUrls && token.explorerUrls[0], // Haven't handle switch chain
        chains: token.chains,
      }}
    >
      <Box>
        <TokenDetail />
      </Box>
      <Box minHeight={300}>
        <DynamicTHChart />
      </Box>
    </TokenLayout>
  );
}
