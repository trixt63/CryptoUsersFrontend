import { useDashboardTokenHolders } from 'src/contexts/dashboard';
import TokenLayout from '../TokenLayout';
import { Box, Paper, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import TokenTable from './TokenTable';
import { formatAddress } from '@travalendingpool/utils';

const DynamicTxChart = dynamic(() => import('./TokenChart'), { ssr: false });

export default function TokenHolders() {
  const { data, token } = useDashboardTokenHolders();

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
      <Paper variant="border" sx={{ p: 3 }}>
        <Typography color="secondary.main" fontWeight={500}>
          Token histogram of top 10 holders
        </Typography>
        <Box minHeight={300}>
          <DynamicTxChart />
        </Box>
      </Paper>
      <Paper variant="border" sx={{ p: 3, mt: 3 }}>
        <Typography>{`Top 25 holders in total ${data?.holders.length} holders`}</Typography>
        <Box mx={-3}>
          <TokenTable />
        </Box>
      </Paper>
    </TokenLayout>
  );
}
