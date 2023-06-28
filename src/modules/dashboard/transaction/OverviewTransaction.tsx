import { Paper, Stack, Typography } from '@mui/material';
import { formatAddress, formatNumber } from '@travalendingpool/utils';
import moment from 'moment';
import Copy from 'src/components/CopyButton/Copy';
import ViewOnExplorer from 'src/components/ViewOnExplorer';
import { useDashboardTransaction } from 'src/contexts/dashboard';
import formatNumberAfterComma, { getEntityUrl } from 'src/utils';
import LabelValue from '../shared/LabelValue';
import TransactionLayout from './TransactionLayout';
import { Link } from 'src/components/primitives/Link';

function CopyAndLink({ hash, explorerUrl }: { hash: string; explorerUrl: string }) {
  return (
    <Stack direction="row" spacing={1}>
      <Copy text={hash} IconProps={{ fontSize: 'small', sx: { color: 'text.secondary' } }} />
      <ViewOnExplorer href={explorerUrl} />
    </Stack>
  );
}

export default function OverviewTransaction() {
  const data = useDashboardTransaction();

  return (
    <TransactionLayout
      header={{
        name: 'Transaction',
        value: `#${formatAddress(data.hash)}`,
        valueCopy: String(data.hash),
        externalLink: data.explorerUrl,
        chains: [data.chain],
      }}
    >
      <Paper sx={{ p: 3 }}>
        <LabelValue
          label="Transaction Hash"
          value={
            <Stack direction="row" spacing={2}>
              <Typography className="text-truncate" sx={{ width: 150, fontWeight: 'inherit' }}>
                {data.hash}
              </Typography>
              <CopyAndLink hash={data.hash} explorerUrl={data.explorerUrl} />
            </Stack>
          }
        />
        <LabelValue
          label="Status"
          value={
            <Typography
              component="span"
              variant="body2"
              sx={{
                textTransform: 'capitalize',
                color: data.status == 1 ? '#178b4d' : '#8e5115',
                padding: '6px 12px',
                backgroundColor: '#052a35',
                borderRadius: '5px',
                textAlign: 'center',
                fontWeight: 'inherit',
              }}
            >
              {data.status == 1 ? 'Success' : 'Fail'}
            </Typography>
          }
        />
        <LabelValue label="Block Number" value={`#${data.blockNumber}`} />
        <LabelValue
          label="Timestamp"
          value={
            <Typography fontWeight={'inherit'}>
              {moment(data.timestamp * 1000)
                .utc()
                .format('MMM-DD-YYYY')}{' '}
              <Typography component="span">
                {moment(data.timestamp * 1000)
                  .utc()
                  .format('hh:mm:ss A +UTC')}
              </Typography>
            </Typography>
          }
        />
        <LabelValue
          label="From"
          value={
            <Stack direction="row" spacing={2}>
              <Link href={getEntityUrl(data.from)}>
                <Typography sx={{ fontWeight: 'inherit' }}>{formatAddress(data.fromAddress)}</Typography>
              </Link>
              <CopyAndLink hash={data.fromAddress} explorerUrl={data.fromAddressExplorerUrl} />
            </Stack>
          }
        />
        <LabelValue
          label="To"
          value={
            <Stack direction="row" spacing={2}>
              <Link href={getEntityUrl(data.to)}>
                <Typography sx={{ fontWeight: 'inherit' }}>{formatAddress(data.toAddress)}</Typography>
              </Link>
              <CopyAndLink hash={data.toAddress} explorerUrl={data.toAddressExplorerUrl} />
            </Stack>
          }
        />
        {data.to.type != 'wallet' && (
          <LabelValue
            label=""
            value={
              <>
                <Typography component="span" sx={{ fontWeight: 'inherit', textTransform: 'capitalize' }}>
                  {data.to.type}
                </Typography>
                &nbsp;
                <Link href={getEntityUrl(data.to)}>
                  <Typography component="span" sx={{ color: 'primary.main', fontWeight: 500 }}>
                    {data.to.name}
                  </Typography>
                </Link>
              </>
            }
          />
        )}
        <LabelValue label="Value" value={formatNumberAfterComma(data.value)} />
        <LabelValue
          label="Method"
          value={<Typography sx={{ textTransform: 'capitalize', fontWeight: 'inherit' }}>{data.method}</Typography>}
        />
        <LabelValue label="Gas Limit" value={formatNumber(data.gasLimit, { fractionDigits: 2 })} />
        <LabelValue
          label="Gas Used"
          value={
            <>
              {formatNumber(data.gas, { fractionDigits: 2 })}{' '}
              <Typography component="span">
                ({formatNumber((data.gas / data.gasLimit) * 100, { fractionDigits: 2, suffix: '%' })})
              </Typography>
            </>
          }
        />
        <LabelValue label="Gas Price" value={formatNumber(data.gasPrice, { fractionDigits: 2 })} />
      </Paper>
    </TransactionLayout>
  );
}
