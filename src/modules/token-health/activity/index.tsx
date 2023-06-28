import { Box, Grid, Typography } from '@mui/material';
import { compactNumber } from '@travalendingpool/utils';
import formatNumberAfterComma from 'src/utils';
import { useTokenHealthContext } from '../context';

function ActivityDetail({ title, value, subTitle }: { title: string; value: string; subTitle: string }) {
  return (
    <Box sx={{ p: 3, backgroundColor: '#0E1D27', borderRadius: '14px' }}>
      <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
        {title}
      </Typography>
      <Typography sx={{ fontSize: '24px', color: 'text.primary', fontWeight: 700 }}>{value}</Typography>
      <Typography variant="small" sx={{ fontWeight: 400, color: 'text.primary' }}>
        {subTitle}
      </Typography>
    </Box>
  );
}

export default function Activity() {
  const { totalTokens, token } = useTokenHealthContext();

  return (
    <Box sx={{ mt: 4 }}>
      <Grid container sx={{ mt: { lg: '14px', xs: '0px' } }} spacing={2}>
        <Grid item xs={6} sm={4} lg={6}>
          <ActivityDetail
            title="Price"
            value={`$${formatNumberAfterComma(token.price)}`}
            subTitle={`Highest: $${formatNumberAfterComma(token.highest_price)}`}
          />
        </Grid>
        <Grid item xs={6} sm={4} lg={6}>
          <ActivityDetail
            title="Price Stability"
            value={`${compactNumber(token.price_stability, 2)}%`}
            subTitle={`Rank ${token.rank_stable}/${totalTokens}`}
          />
        </Grid>
        <Grid item xs={6} sm={4} lg={6}>
          <ActivityDetail
            title="Market Cap"
            value={`$${compactNumber(token.market_cap)}`}
            subTitle={`Rank ${token.rank_market_cap}/${totalTokens}`}
          />
        </Grid>
        <Grid item xs={6} sm={4} lg={6}>
          <ActivityDetail
            title="Volume 24h"
            value={`$${compactNumber(token.trading_volume_24h)}`}
            subTitle={`Rank ${token.rank_trading_volume_24h}/${totalTokens}`}
          />
        </Grid>
        <Grid item xs={6} sm={4} lg={6}>
          <ActivityDetail
            title="Daily Tx"
            value={`${compactNumber(token.daily_transaction)}`}
            subTitle={`Rank ${token.rank_daily_transactions}/${totalTokens}`}
          />
        </Grid>
        <Grid item xs={6} sm={4} lg={6}>
          <ActivityDetail
            title="Holders"
            value={`${compactNumber(token.holder)}`}
            subTitle={`Rank ${token.rank_holders}/${totalTokens}`}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
