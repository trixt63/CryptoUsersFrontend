import { useDashboardTokenTransfers } from 'src/contexts/dashboard';
import TokenLayout from '../TokenLayout';
import { Paper, Typography } from '@mui/material';
import TransfersTable from './TransferTable';
import { formatAddress } from '@travalendingpool/utils';
import dynamic from 'next/dynamic';

const DynamicTransfersChart = dynamic(() => import('./TransfersChart'), { ssr: false });

export default function TokenTransfers() {
  const { token, data } = useDashboardTokenTransfers();
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
      <Paper variant="border" sx={{ p: 3, minHeight: '300px' }}>
        <DynamicTransfersChart />
      </Paper>
      <Paper variant="border" sx={{ p: 3, mt: 3 }}>
        <Typography mb={3}>{`Show total ${data.transfers.length} transfers`}</Typography>
        <TransfersTable />
      </Paper>
    </TokenLayout>
  );
}
