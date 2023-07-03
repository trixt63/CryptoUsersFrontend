import { Box, Paper, Typography } from '@mui/material';
import { formatAddress, formatNumber } from '@travalendingpool/utils';
import dynamic from 'next/dynamic';
import { useDashboardContractUsers } from 'src/contexts/dashboard';
import ContractLayout from '../ContractLayout';
import TopUsersTable from './TopUsersTable';

const DynamicTVLByUserChart = dynamic(() => import('./TVLByUserChart'), { ssr: false });

export default function ContractUsers() {
  const { data, overview } = useDashboardContractUsers();

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
        <Typography variant="h4" color="secondary.main" mb={2}>
          Total value locked by users
        </Typography>
        <Box minHeight={220}>
          <DynamicTVLByUserChart />
        </Box>
      </Paper>
      <Paper variant="border" sx={{ p: 3, mt: 2 }}>
        <Typography color="secondary.main" mb={2} fontWeight={500}>
          Top {Math.min(20, data.users)} in total {formatNumber(data.users)}
        </Typography>
        <Box sx={{ mx: -3 }}>
          <TopUsersTable />
        </Box>
      </Paper>
    </ContractLayout>
  );
}
