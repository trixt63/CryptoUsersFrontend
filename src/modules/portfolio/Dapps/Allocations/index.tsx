import { Box, Grid, Paper, Typography } from '@mui/material';
import { useMemo } from 'react';
import formatNumberAfterComma from 'src/utils';
import AllocationDonutChart, { colors } from '../../components/AllocationDonutChart';
import PaperTitle from '../../components/PaperTitle';
import { useDAppsData } from '../hook';

export default function Allocations() {
  const data = useDAppsData();

  const arrSort = useMemo(() => {
    const dataSort = data.slice().sort(function (a, b) {
      const vla = a.tvl;
      const vlb = b.tvl;
      if (vla > vlb) return -1;
      if (vla < vlb) return 1;
      return 0;
    });
    return dataSort;
  }, [data]);

  const dataAllocation = useMemo(() => {
    const total = arrSort.reduce((total, item) => item.tvl + total, 0);
    if (data.length > 4) {
      const dataOthers = arrSort.slice(4).reduce((total, item) => item.tvl + total, 0);
      return [
        ...arrSort.slice(0, 4).map((item) => [item.name, item.tvl, (item.tvl / total) * 100, item.type, item.id]),
        ...[['Others', dataOthers, (dataOthers / total) * 100]],
      ];
    } else {
      return data.map((item) => {
        return [item.name, item.tvl, (item.tvl / total) * 100];
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arrSort]);
  return (
    <Paper variant="border" sx={{ p: 3, borderRadius: '14px', height: 300 }}>
      <PaperTitle title="Dapps Allocation" />
      <Grid container>
        <Grid item xs={6}>
          {dataAllocation.length > 0 && <AllocationDonutChart dataChart={dataAllocation} />}
        </Grid>
        <Grid item xs={6}>
          {dataAllocation.slice(0, 6).map((item, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
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
                <Typography
                  className={'text-truncate'}
                  variant="body2"
                  sx={{ color: 'text.secondary', minWidth: { xs: 60, sm: 100 }, maxWidth: { xs: 60, sm: 100 } }}
                >
                  {item[0]}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 500, ml: 1 }}>
                  {formatNumberAfterComma(Number(item[2]))}%
                </Typography>
              </Box>
            </Box>
          ))}
        </Grid>
      </Grid>
    </Paper>
  );
}
