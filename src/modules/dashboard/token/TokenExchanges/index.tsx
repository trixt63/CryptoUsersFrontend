import { useDashboardTokenExchanges } from 'src/contexts/dashboard';
import TokenLayout from '../TokenLayout';
import { Box } from '@mui/material';
import TokenExchange from './TokenExchange';
import { formatAddress } from '@travalendingpool/utils';
import dynamic from 'next/dynamic';

const DynamicTVChart = dynamic(() => import('./TokenTradingVolume'), { ssr: false });
export default function TokenExchanges() {
  const { token } = useDashboardTokenExchanges();
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
      <Box minHeight={300}>
        <DynamicTVChart />
      </Box>
      <Box sx={{ mt: 3 }}>
        <TokenExchange />
      </Box>
    </TokenLayout>
  );
}
