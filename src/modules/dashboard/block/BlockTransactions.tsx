import { Paper, Typography } from '@mui/material';
import { formatNumber } from '@travalendingpool/utils';
import { useDashboardBlockTransactions } from 'src/contexts/dashboard';
import BlockLayout from './BlockLayout';
import TxsTable from './TxsTable';

export default function BlockTransactions() {
  const { block, data } = useDashboardBlockTransactions();

  return (
    <BlockLayout
      header={{
        name: 'Block',
        value: `#${block.number}`,
        valueCopy: String(block.number),
        externalLink: block.explorerUrls[0],
        chains: block.chains,
      }}
    >
      <Paper variant="border" sx={{ p: 3 }}>
        <Typography fontWeight={500} mb={2} color="secondary.main">
          Total{' '}
          <Typography component="span" fontWeight={600}>
            {formatNumber(data.numberOfTransactions)}
          </Typography>{' '}
          {data.numberOfTransactions > 1 ? 'transactions' : 'transaction'}
        </Typography>
        <TxsTable />
      </Paper>
    </BlockLayout>
  );
}
