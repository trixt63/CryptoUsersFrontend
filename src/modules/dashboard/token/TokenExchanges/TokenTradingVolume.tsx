import { Box, Grid, Paper, Stack, Typography } from '@mui/material';
import { formatNumber } from '@travalendingpool/utils';
import HighchartsReact from 'highcharts-react-official';
import useDonutConfig, { donutColors } from 'src/hooks/useDonutConfig';
import { useState, useMemo } from 'react';
import Highcharts from 'highcharts';
import { useDashboardTokenExchanges } from 'src/contexts/dashboard';

type ChartData = {
  name: string;
  y: number;
  ratio: number;
  amount: number | null;
  color: string;
  // symbol: string | null;
};

function Chart({ data: chartData }: { data: ChartData[] }) {
  const [selectedItem, setSelectedItem] = useState<ChartData | null>(null);

  const options = useDonutConfig(
    {
      series: [
        {
          point: {
            events: {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              mouseOver: function (e: any) {
                setSelectedItem(() => {
                  return chartData.find((item) => item.name === e.target.name) ?? null;
                });
              },
              mouseOut: function () {
                setSelectedItem(null);
              },
            },
          },
          states: {
            inactive: {
              opacity: 0.2,
              enabled: true,
            },
          },
          name: 'Asset',
          type: 'pie',
          data: chartData,
        },
      ],
    },
    [chartData]
  );

  return (
    <Box sx={{ position: 'relative' }}>
      <HighchartsReact highcharts={Highcharts} options={options} />
      {selectedItem && (
        <>
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <Typography component="div" align="center" color="text.secondary" variant="body2" mb={1}>
              <div>Value</div>
              <div style={{ fontWeight: 600 }}>{formatNumber(selectedItem.y, { fractionDigits: 2, prefix: '$' })}</div>
            </Typography>
            <Typography component="div" align="center" color="text.secondary" variant="body2">
              <div>Ratio</div>
              <div style={{ fontWeight: 600 }}>
                {formatNumber(selectedItem.ratio, { fractionDigits: 2, suffix: '%' })}
              </div>
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ position: 'absolute', bottom: -8, left: 0, right: 0 }} align="center">
            {selectedItem.name}
          </Typography>
        </>
      )}
    </Box>
  );
}

export default function TokenTradingVolume() {
  const { data } = useDashboardTokenExchanges();
  const chartData = useMemo(() => {
    const total = data.exchanges.reduce((acc, item) => acc + item.tradingVolume, 0);
    const d: ChartData[] = [];
    data.exchanges.slice(0, 4).forEach((item, idx) => {
      d.push({
        name: item.name,
        y: item.tradingVolume,
        ratio: (item.tradingVolume / total) * 100,
        amount: item.tradingVolume,
        color: donutColors[idx],
      });
    });
    if (data.exchanges.length > 4) {
      const value = data.exchanges.slice(4).reduce((acc, item) => acc + item.tradingVolume, 0);
      d.push({
        name: 'Others',
        y: value,
        ratio: (value / total) * 100,
        color: donutColors[3],
        amount: null,
      });
    }
    return d;
  }, [data]);
  return (
    <Paper variant="border" sx={{ p: 3 }}>
      <Typography>Trading volume 24h by exchanges</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Chart data={chartData} />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Grid
            container
            spacing={2}
            sx={{
              display: 'flex',
              alignItems: 'center',
              pt: 3,
              height: '100%',
            }}
          >
            {chartData.map((item) => (
              <Grid key={item.name} item xs={6}>
                <Stack direction="row" spacing={1}>
                  <Box
                    component="span"
                    sx={{ borderRadius: 1, display: 'inline-flex', width: 16, height: 16, bgcolor: item.color }}
                  />
                  <Box>
                    <Typography color="text.secondary" variant="body2" mb={0.25}>
                      {item.name}
                    </Typography>
                  </Box>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
