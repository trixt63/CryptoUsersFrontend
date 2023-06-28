import { Box, Paper, Typography } from '@mui/material';
import { formatAddress } from '@travalendingpool/utils';
import dynamic from 'next/dynamic';
import { useDashboardWalletCreditScore } from 'src/contexts/dashboard';
import WalletLayout from '../WalletLayout';
import CreditScore from './CreditScore';

const DynamicScoreRadarChart = dynamic(() => import('./ScoreRadarChart'), { ssr: false });
const DynamicScoreHistoryChart = dynamic(() => import('./ScoreHistoryChart'), { ssr: false });

export default function WalletCreditScore() {
  const { wallet } = useDashboardWalletCreditScore();

  return (
    <WalletLayout
      header={{
        name: 'Wallet',
        value: formatAddress(wallet.address),
        valueCopy: wallet.address,
        externalLink: wallet.explorerUrls[0],
        chains: wallet.chains,
      }}
    >
      <Paper variant="border" sx={{ p: 3 }}>
        <CreditScore />
      </Paper>
      <Paper variant="border" sx={{ p: 3, mt: 2 }}>
        <Box sx={{ minHeight: 332 }}>
          <Typography color="secondary.main" variant="subtitle1" mb={1}>
            Score Overview
          </Typography>
          <DynamicScoreRadarChart />
        </Box>
      </Paper>
      <Paper variant="border" sx={{ p: 3, mt: 2 }}>
        <Box sx={{ minHeight: 332 }}>
          <Typography color="secondary.main" variant="subtitle1" mb={1}>
            Score History
          </Typography>
          <DynamicScoreHistoryChart />
        </Box>
      </Paper>
    </WalletLayout>
  );
}
