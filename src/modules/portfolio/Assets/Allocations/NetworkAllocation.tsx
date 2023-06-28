import { Box, Grid, Paper, Typography } from '@mui/material';
import { useMemo } from 'react';
import formatNumberAfterComma from 'src/utils';
import AllocationDonutChart, { colors } from '../../components/AllocationDonutChart';
import PaperTitle from '../../components/PaperTitle';
import { useTokensData } from '../hooks';

export default function NetworkAllocation() {
  const data = useTokensData();

  const filterFunction = (hex: string) => {
    const result = data.reduce((accumulator, currentValue) => {
      const check = currentValue.chains.toString().includes(hex);
      if (check) {
        return accumulator + currentValue.valueInUSD;
      }
      return accumulator;
    }, 0);
    return result;
  };

  const dataChart = useMemo(() => {
    const bsc = filterFunction('0x38');
    const eth = filterFunction('0x1');
    const ftm = filterFunction('0xfa');
    const plg = filterFunction('0x89');
    if (bsc !== undefined && eth !== undefined && ftm !== undefined && plg !== undefined) {
      const total = bsc + eth + ftm + plg;
      return [
        ['BSC', bsc, (bsc / total) * 100],
        ['ETH', eth, (eth / total) * 100],
        ['FTM', ftm, (ftm / total) * 100],
        ['PLG', plg, (plg / total) * 100],
      ];
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <Paper sx={{ p: 3, height: 300 }} variant="border">
      <PaperTitle title="Network Allocation" />
      <Grid container>
        <Grid item xs={6}>
          {dataChart && dataChart.length > 0 && <AllocationDonutChart dataChart={dataChart} />}
        </Grid>
        <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
          <Box>
            {dataChart &&
              dataChart.map((item, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '2px',
                      mr: '4px',
                      backgroundColor: colors[index],
                    }}
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary', minWidth: 50 }}>
                      {item[0]}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 500 }}>
                      {formatNumberAfterComma(Number(item[2]))}%
                    </Typography>
                  </Box>
                </Box>
              ))}
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}
