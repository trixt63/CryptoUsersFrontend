import { Box, Grid, Stack, Typography } from '@mui/material';
import { formatNumber } from '@travalendingpool/utils';
import Image from 'next/image';
import CreditScoreImg from 'public/images/credit_score.png';
import { useDashboardWalletCreditScore } from 'src/contexts/dashboard';

export default function CreditScore() {
  const { data } = useDashboardWalletCreditScore();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={4}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Image src={CreditScoreImg} alt="credit score" width={60} height={60} />
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
      <Grid item xs={12} sm={4} sx={{ display: 'flex', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" fontWeight={500} color="text.secondary">
            {data.minCreditScore}
          </Typography>
          <Typography variant="body2" color="text.secondary" fontWeight={500}>
            Min Score
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} sm={4} sx={{ display: 'flex', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" fontWeight={500} color="text.secondary">
            {data.maxCreditScore}
          </Typography>
          <Typography variant="body2" color="text.secondary" fontWeight={500}>
            Max Score
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
