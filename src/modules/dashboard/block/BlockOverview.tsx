import { Link, Paper, Stack, Typography } from '@mui/material';
import { formatAddress, formatNumber } from '@travalendingpool/utils';
import moment from 'moment';
import Copy from 'src/components/CopyButton/Copy';
import { useDashboardBlock } from 'src/contexts/dashboard';
import ViewOnExplorer from '../../../components/ViewOnExplorer';
import LabelValue from '../shared/LabelValue';
import BlockLayout from './BlockLayout';
import { getEntityUrl } from 'src/utils';

export default function BlockOverview() {
  const data = useDashboardBlock();

  return (
    <BlockLayout
      header={{
        name: 'Block',
        value: `#${data.number}`,
        valueCopy: String(data.number),
        externalLink: data.explorerUrl,
        chains: [data.chain],
      }}
    >
      <Paper variant="border" sx={{ p: 3 }}>
        <LabelValue label="Block Height" value={data.number} />
        <LabelValue
          label="Block Hash"
          value={
            <Stack direction="row" spacing={2}>
              <Typography className="text-truncate" sx={{ width: 150, fontWeight: 500 }}>
                {data.hash}
              </Typography>
              <Stack direction="row" spacing={1}>
                <Copy text={data.hash} IconProps={{ fontSize: 'small', sx: { color: 'text.secondary' } }} />
                <ViewOnExplorer href={data.explorerUrl} />
              </Stack>
            </Stack>
          }
        />
        <LabelValue
          label="Timestamp"
          value={
            <>
              <Typography fontWeight={500}>
                {moment(data.timestamp * 1000)
                  .utc()
                  .format('MMM-DD-YYYY')}{' '}
                <Typography component="span">
                  {moment(data.timestamp * 1000)
                    .utc()
                    .format('hh:mm:ss A +UTC')}
                </Typography>
              </Typography>
            </>
          }
        />
        <LabelValue label="Transactions" value={`${data.numberOfTransactions} Txs`} />
        <LabelValue
          label="Validated by"
          value={
            <>
              <Stack direction="row" spacing={2}>
                <Link href={getEntityUrl(data.validatedBy)} sx={{ fontWeight: 500 }}>
                  {formatAddress(data.validatedBy.address, 9, 5)}
                </Link>
                <Stack direction="row" spacing={1}>
                  <Copy text={data.hash} IconProps={{ fontSize: 'small', sx: { color: 'text.secondary' } }} />
                  <ViewOnExplorer href={data.validatedBy.explorerUrl} />
                </Stack>
              </Stack>
            </>
          }
        />
        <LabelValue label="Difficulty" value={formatNumber(data.difficulty)} />
        <LabelValue label="Total Difficulty" value={formatNumber(data.totalDifficulty)} />
        <LabelValue label="Size" value={`${formatNumber(data.size)} bytes`} />
        <LabelValue
          label="Gas Used"
          value={
            <>
              <Typography fontWeight={500}>
                {formatNumber(data.gasUsed)}{' '}
                <Typography component="span">
                  (
                  {formatNumber((Number(data.gasUsed) / Number(data.gasLimit)) * 100, {
                    fractionDigits: 2,
                    suffix: '%',
                  })}
                  )
                </Typography>
              </Typography>
            </>
          }
        />
        <LabelValue label="Gas Limit" value={formatNumber(data.gasLimit)} />
      </Paper>
    </BlockLayout>
  );
}
