import { Box, Grid, Paper, Stack, Typography } from '@mui/material';
import { formatNumber } from '@travalendingpool/utils';
import Image from 'next/image';
import CreditScoreImg from 'public/images/credit_score.png';
import MoneyHandImg from 'public/images/money_hand.png';
import { useDashboardWallet } from 'src/contexts/dashboard';
import WalletTracker from './WalletTracker';

export default function TopOverview() {
  const data = useDashboardWallet();

  return (
    <Paper variant="border" sx={{ p: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Image src={CreditScoreImg} alt="credit score" width={50} height={50} />
            <Box>
              <Typography variant="h4" fontWeight={700} color="secondary.main">
                {formatNumber(data.creditScore)}
              </Typography>
              <Typography variant="body2" color="text.secondary" fontWeight={500}>
                Credit Score
              </Typography>
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Image src={MoneyHandImg} alt="credit score" width={50} height={50} />
            <Box>
              <Typography variant="h4" fontWeight={700} color="secondary.main">
                {formatNumber(data.balance, { fractionDigits: 4, prefix: '$' })}
              </Typography>
              <Typography variant="body2" color="text.secondary" fontWeight={500}>
                Balance
              </Typography>
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={4} sx={{ display: 'flex', alignItems: 'center' }}>
          <WalletTracker data={data.tracker} />
        </Grid>
      </Grid>
    </Paper>
  );
}
