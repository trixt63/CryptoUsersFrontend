import { Box, Paper, Typography } from '@mui/material';
import { formatAddress } from '@travalendingpool/utils';
import dynamic from 'next/dynamic';
import { useDashboardContractOverview } from 'src/contexts/dashboard';
import ContractLayout from '../ContractLayout';
import Information from './Information';

const DynamicTokensChart = dynamic(() => import('./TokensChart'), { ssr: false });

export default function ContractOverview() {
  const data = useDashboardContractOverview();

  return (
    <ContractLayout
      header={{
        name: data.name,
        verified: data.verified,
        value: formatAddress(data.address),
        valueCopy: data.address,
        externalLink: data.explorerUrls[0],
        chains: data.chains,
      }}
    >
      <Paper variant="border" sx={{ p: 3 }}>
        <Information />
      </Paper>
      <Paper variant="border" sx={{ p: 3, mt: 2 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Tokens
        </Typography>
        <Box minHeight={220}>
          <DynamicTokensChart />
        </Box>
      </Paper>
    </ContractLayout>
  );
}
