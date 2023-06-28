import { Link, Typography } from '@mui/material';
import { formatNumber } from '@travalendingpool/utils';
import moment from 'moment';
import { useDashboardContractOverview } from 'src/contexts/dashboard';
import LabelValue from '../../shared/LabelValue';

export default function Information() {
  const data = useDashboardContractOverview();

  return (
    <>
      <LabelValue
        label="Created At"
        value={
          <>
            <Typography fontWeight={'inherit'}>
              {moment(data.createdAt * 1000)
                .utc()
                .format('MMM-DD-YYYY')}{' '}
              <Typography component="span">
                {moment(data.createdAt * 1000)
                  .utc()
                  .format('hh:mm:ss A +UTC')}
              </Typography>
            </Typography>
          </>
        }
      />
      {data.project && (
        <LabelValue
          label="Project"
          value={
            <Link underline="hover" href={data.project.url} target="_blank" rel="noreferrer noopener" fontWeight={500}>
              {data.name}
            </Link>
          }
        />
      )}
      <LabelValue
        label="Transactions 24h"
        value={
          <>
            <Typography fontWeight={'inherit'}>
              {formatNumber(data.transactions24h)} txs{' '}
              <Typography component="span">(Total {formatNumber(data.numberOfTransactions)} txs in 30 days)</Typography>
            </Typography>
          </>
        }
      />
      <LabelValue
        label="Users 24h"
        value={
          <>
            <Typography fontWeight={'inherit'}>{formatNumber(data.users24h)} addresses</Typography>
          </>
        }
      />
      <LabelValue
        label="TVL"
        value={
          <Typography fontWeight={'inherit'}>{formatNumber(data.tvl, { fractionDigits: 2, prefix: '$' })}</Typography>
        }
      />
    </>
  );
}
