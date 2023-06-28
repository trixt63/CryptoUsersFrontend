import { Box, Paper, Typography } from '@mui/material';
import { formatAddress } from '@travalendingpool/utils';
import { useDashboardWalletMoneyFlow } from 'src/contexts/dashboard';
import WalletLayout from '../WalletLayout';
import ExchangeActiveTable from './ExchangeActiveTable';
import TokenTransferTable from './TokenTransferTable';

export default function WalletMoneyFlow() {
  const { wallet } = useDashboardWalletMoneyFlow();

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
        <Typography color="secondary.main" fontWeight={500} mb={2}>
          Total token transfer value in the last 24 hours
        </Typography>
        <Box mx={-3}>
          <TokenTransferTable />
        </Box>
      </Paper>
      <Paper variant="border" sx={{ p: 3, mt: 2 }}>
        <Typography color="secondary.main" fontWeight={500} mb={2}>
          Exchanges active in the last 24 hours
        </Typography>
        <Box mx={-3}>
          <ExchangeActiveTable />
        </Box>
      </Paper>
    </WalletLayout>
  );
}
