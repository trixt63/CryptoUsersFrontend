import { Box, Paper, Skeleton, Typography } from '@mui/material';
import { formatNumber } from '@travalendingpool/utils';
import SafetyLevel from 'src/components/SafetyLevel';
import TooltipInfo from 'src/components/TooltipInfo';
import { useAssetData, useAssetStatus } from '../hooks';

export default function BalanceAndCreditScore() {
  const data = useAssetData();
  const { isLoading } = useAssetStatus();

  return (
    <Paper
      sx={{
        p: 3,
        height: 300,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
      variant="border"
    >
      <Box>
        <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 500, mb: 1 }}>
          Balance
        </Typography>
        {isLoading ? (
          <>
            <Skeleton variant="rounded" sx={{ maxWidth: 150, width: '100%' }} />
            <Skeleton variant="text" width={70} />
          </>
        ) : (
          <>
            <Typography variant="h3" component={'p'} sx={{ color: 'text.primary' }}>
              {formatNumber(data?.balance, { fractionDigits: 2, prefix: '$' })}
            </Typography>
            {data?.balanceChangeRate !== undefined && (
              <Box sx={{ display: 'flex' }}>
                <Typography
                  variant="small"
                  color={
                    data.balanceChangeRate > 0
                      ? 'success.main'
                      : data.balanceChangeRate < 0
                      ? 'error.main'
                      : 'text.secondary'
                  }
                >
                  {data.balanceChangeRate > 0 && '+'}
                  {formatNumber(data.balanceChangeRate * 100, { fractionDigits: 2 })}%
                </Typography>
                &nbsp;
                <Typography variant="small">/ 24h</Typography>
              </Box>
            )}
          </>
        )}
      </Box>
      <Box>
        <Box sx={{ display: 'flex', mb: 1 }}>
          <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 500, mr: 0.4 }}>
            Credit Score
          </Typography>
          <TooltipInfo title="Credit score" iconProps={{ fontSize: 'small', sx: { color: 'text.secondary' } }} />
        </Box>
        {isLoading ? (
          <>
            <Skeleton variant="rounded" sx={{ maxWidth: 150, width: '100%' }} />
            <Skeleton variant="text" width={100} />
          </>
        ) : (
          <>
            <Box sx={{ display: 'flex', alignItems: 'baseLine' }}>
              <Typography variant="h3" component={'p'} sx={{ color: 'text.primary', mr: 2 }}>
                {formatNumber(data?.creditScore, { fractionDigits: 0 })}
              </Typography>
              <SafetyLevel level={2} size="small" />
            </Box>
            <Typography variant="small" color="text.secondary">
              Top{' '}
              <Typography component="span" variant="small" color="text.primary">
                {formatNumber(data?.topCreditScorePercentage, { fractionDigits: 1, suffix: '%' })}
              </Typography>{' '}
              score
            </Typography>
          </>
        )}
      </Box>
    </Paper>
  );
}
