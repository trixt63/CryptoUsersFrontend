import { Box, Paper, Typography } from '@mui/material';
import { formatNumber } from '@travalendingpool/utils';
import { useMemo } from 'react';
import { useDAppsData } from '../hook';

export default function TotalValueLockedAndAPR() {
  const data = useDAppsData();

  const [tvl, tvl24h, avgAPR] = useMemo(() => {
    const tvl = data.reduce((total, item) => item.tvl + total, 0);
    const tvl24h = data.reduce((total, item) => item.tvl24hAgo + total, 0);
    const avgAPR = data.reduce((total, item) => item.avgAPR + total, 0);
    return [tvl, tvl24h, avgAPR];
  }, [data]);
  return (
    <Paper
      variant="border"
      sx={{
        p: 3,
        borderRadius: '14px',
        height: 300,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Box>
        <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 500 }}>
          Total Value Locked
        </Typography>
        <Typography variant="h3" sx={{ color: 'text.primary', mt: 1 }}>
          {formatNumber(tvl, { fractionDigits: 2, prefix: '$' })}
        </Typography>
        <Box sx={{ display: 'flex' }}>
          <Typography sx={{ fontSize: '12px', color: ((tvl - tvl24h) / tvl24h) * 100 > 0 ? '#15b579' : '#b51524' }}>
            {formatNumber(((tvl - tvl24h) / tvl24h) * 100, { fractionDigits: 2, suffix: '%' })}
          </Typography>
          <Typography sx={{ fontSize: '12px' }}>&nbsp;/ 24h</Typography>
        </Box>
      </Box>
      <Box>
        <Typography variant="body1" sx={{ color: 'text.secondary', mr: 0.5, fontWeight: 500 }}>
          Avg APR
        </Typography>
        <Typography variant="h3" sx={{ color: 'text.primary', mr: '6px', mt: 1 }}>
          {formatNumber((avgAPR * tvl) / tvl, { fractionDigits: 2, suffix: '%' })}
        </Typography>
      </Box>
    </Paper>
  );
}
