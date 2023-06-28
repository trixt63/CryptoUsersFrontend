/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Box, Grid, Stack, Typography } from '@mui/material';
import { formatAddress, formatNumber } from '@travalendingpool/utils';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useMemo, useState } from 'react';
import { useDashboardContractUsers } from 'src/contexts/dashboard';
import useDonutConfig, { donutColors } from 'src/hooks/useDonutConfig';

type ChartData = {
  name: string;
  y: number;
  percentage: number;
  color: string;
};

function Chart({ data: chartData }: { data: ChartData[] }) {
  const [selectedItem, setSelectedItem] = useState<ChartData | null>(null);

  const options = useDonutConfig(
    {
      chart: {
        height: 220,
      },
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
                {formatNumber(selectedItem.percentage, { fractionDigits: 2, suffix: '%' })}
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

export default function TVLByUserChart() {
  const { data } = useDashboardContractUsers();

  const sortedData = useMemo(() => data.users.sort((a, b) => b.percentage - a.percentage), [data.users]);
  const [legendCount] = useState(6);

  const chartData = useMemo(() => {
    const d: ChartData[] = [];
    sortedData.slice(0, legendCount - 1).forEach((item, idx) => {
      d.push({
        name: formatAddress(item.address),
        y: item.tvl,
        percentage: item.percentage,
        color: donutColors[idx],
      });
    });
    if (sortedData.length > legendCount - 1) {
      d.push({
        name: 'Others',
        y: d.reduce((acc, item) => acc + item.y, 0),
        percentage: 100 - d.reduce((acc, item) => acc + item.percentage, 0),
        color: donutColors[3],
      });
    }
    return d;
  }, [sortedData, legendCount]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={5}>
        <Chart data={chartData} />
      </Grid>
      <Grid item xs={12} sm={7} sx={{ display: 'flex', alignItems: 'center' }}>
        <Grid container spacing={2}>
          {chartData.map((item) => (
            <Grid key={item.name} item xs={6}>
              <Stack direction="row" spacing={1}>
                <Box
                  component="span"
                  sx={{ borderRadius: 1, display: 'inline-flex', width: 16, height: 16, bgcolor: item.color }}
                />
                <Typography color="text.secondary" variant="body2" mb={0.25}>
                  {item.name}
                </Typography>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
