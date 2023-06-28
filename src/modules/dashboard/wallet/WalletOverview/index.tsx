import { Box, Paper, Typography } from '@mui/material';
import { formatAddress, formatNumber } from '@travalendingpool/utils';
import dynamic from 'next/dynamic';
import { useDashboardWallet } from 'src/contexts/dashboard';
import WalletLayout from '../WalletLayout';
import TopOverview from './TopOverview';

const DynamicAssetChart = dynamic(() => import('./AssetChart'), { ssr: false });
const DynamicProtocolChart = dynamic(() => import('./ProtocolChart'), { ssr: false });

export default function WalletOverview() {
  const data = useDashboardWallet();

  return (
    <WalletLayout
      header={{
        name: 'Wallet',
        value: formatAddress(data.address),
        valueCopy: data.address,
        externalLink: data.explorerUrls?.[0],
        chains: data.chains,
      }}
    >
      <TopOverview />
      <Paper variant="border" sx={{ p: 3, mt: 2 }}>
        <Typography variant="h4" color="secondary.main">
          Asset
        </Typography>
        <Box minHeight={220}>
          <DynamicAssetChart />
        </Box>
        {data.dappsValue > 0 && (
          <>
            <Typography variant="h4" color="secondary.main" mt={6} mb={2}>
              Protocol Allocation
            </Typography>
            <Typography align="center" color="text.secondary">
              Protocol Total Value&nbsp;
              <Typography component="span" fontWeight={600} color="secondary.main">
                {formatNumber(data.dappsValue, { fractionDigits: 4, prefix: '$' })}
              </Typography>
            </Typography>
            <Box minHeight={220}>
              <DynamicProtocolChart />
            </Box>
          </>
        )}
      </Paper>
    </WalletLayout>
  );
}
