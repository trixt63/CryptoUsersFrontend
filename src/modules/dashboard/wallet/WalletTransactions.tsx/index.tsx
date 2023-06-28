import { Box, Paper, Typography } from '@mui/material';
import { formatAddress, formatNumber } from '@travalendingpool/utils';
import dynamic from 'next/dynamic';
import { Link } from 'src/components/primitives/Link';
import { useDashboardWalletTransactions } from 'src/contexts/dashboard';
import WalletLayout from '../WalletLayout';
import TxsTable from './TxsTable';

const DynamicTxChart = dynamic(() => import('./TxChart'), { ssr: false });

export default function WalletTransactions() {
  const { data, wallet } = useDashboardWalletTransactions();

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
        <Typography color="secondary.main" fontWeight={500}>
          There are {formatNumber(data.numberOfTransactions)} transactions in the last 30 days
        </Typography>
        <Box minHeight={300}>
          <DynamicTxChart />
        </Box>
      </Paper>
      <Paper variant="border" sx={{ p: 3, mt: 2 }}>
        <Typography color="secondary.main" fontWeight={500} mb={2}>
          Show all{' '}
          <Link href="#" underline="hover">
            {formatNumber(data.numberOfTransactions)}
          </Link>{' '}
          transactions.
        </Typography>
        <Box mx={-3}>
          <TxsTable />
        </Box>
      </Paper>
    </WalletLayout>
  );
}
