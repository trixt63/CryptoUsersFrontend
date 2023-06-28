import { Box, Paper, Typography } from '@mui/material';
import { formatAddress, formatNumber } from '@travalendingpool/utils';
import dynamic from 'next/dynamic';
import { Link } from 'src/components/primitives/Link';
import { useDashboardContractTransactions } from 'src/contexts/dashboard';
import ContractLayout from '../ContractLayout';
import TxsTable from './TxsTable';

const DynamicTxChart = dynamic(() => import('./TxChart'), { ssr: false });

export default function ContractTransactions() {
  const { data, overview } = useDashboardContractTransactions();

  return (
    <ContractLayout
      header={{
        name: overview.name,
        verified: overview.verified,
        value: formatAddress(overview.address),
        valueCopy: overview.address,
        externalLink: overview.explorerUrls[0],
        chains: overview.chains,
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
          Show total{' '}
          <Link href="#" underline="hover">
            {formatNumber(data.numberOfTransactions)}
          </Link>{' '}
          transactions in the last 30 days
        </Typography>
        <Box mx={-3}>
          <TxsTable />
        </Box>
      </Paper>
    </ContractLayout>
  );
}
