import { Grid, Typography } from '@mui/material';
import { useDashboardTokenHealth } from 'src/contexts/dashboard';
import StatisticItem from 'src/modules/ranking/project-detail/components/StatisticItem';
import { compactNumber } from '@travalendingpool/utils';
import formatNumberAfterComma from 'src/utils';

export default function TokenDetail() {
  const { tokenHealth } = useDashboardTokenHealth();

  return (
    <Grid container sx={{ mt: { lg: '14px', xs: '0px' } }} spacing={2}>
      <Grid item xs={6} sm={4} lg={4}>
        <StatisticItem
          title="Price"
          value={`$${formatNumberAfterComma(tokenHealth.price)}`}
          subValue={
            <Typography variant="small">{`Highest: $${formatNumberAfterComma(tokenHealth.highest_price)}`}</Typography>
          }
        />
      </Grid>
      <Grid item xs={6} sm={4} lg={4}>
        <StatisticItem
          title="Price Stability"
          value={`${compactNumber(tokenHealth.price_stability, 2)}%`}
          subValue={
            <Typography variant="small">{`Rank ${tokenHealth.rank_stable}/${tokenHealth.n_tokens}`}</Typography>
          }
        />
      </Grid>
      <Grid item xs={6} sm={4} lg={4}>
        <StatisticItem
          title="Market Cap"
          value={`$${compactNumber(tokenHealth.market_cap)}`}
          subValue={
            <Typography variant="small">{`Rank ${tokenHealth.rank_market_cap}/${tokenHealth.n_tokens}`}</Typography>
          }
        />
      </Grid>
      <Grid item xs={6} sm={4} lg={4}>
        <StatisticItem
          title="Volume 24h"
          value={`$${compactNumber(tokenHealth.trading_volume_24h)}`}
          subValue={
            <Typography variant="small">{`Rank ${tokenHealth.rank_trading_volume_24h}/${tokenHealth.n_tokens}`}</Typography>
          }
        />
      </Grid>
      <Grid item xs={6} sm={4} lg={4}>
        <StatisticItem
          title="Daily Tx"
          value={`${compactNumber(tokenHealth.daily_transaction)}`}
          subValue={
            <Typography variant="small">{`Rank ${tokenHealth.rank_daily_transactions}/${tokenHealth.n_tokens}`}</Typography>
          }
        />
      </Grid>
      <Grid item xs={6} sm={4} lg={4}>
        <StatisticItem
          title="Holder"
          value={`${compactNumber(tokenHealth.holder)}`}
          subValue={
            <Typography variant="small">{`Rank ${tokenHealth.rank_holders}/${tokenHealth.n_tokens}`}</Typography>
          }
        />
      </Grid>
    </Grid>
  );
}
