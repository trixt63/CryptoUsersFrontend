/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Box, Grid, Stack, Typography } from '@mui/material';
import { formatNumber, isNumeric } from '@travalendingpool/utils';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useMemo, useState } from 'react';
import { Link } from 'src/components/primitives/Link';
import { useDashboardContractOverview } from 'src/contexts/dashboard';
import useDonutConfig, { donutColors } from 'src/hooks/useDonutConfig';
import formatNumberAfterComma from 'src/utils';

type ChartData = {
  name: string;
  y: number;
  ratio: number;
  amount: number | null;
  color: string;
  symbol: string | null;
  entity?: {
    type: string;
    id: string;
  };
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

export default function TokensChart() {
  const data = useDashboardContractOverview();

  const chartData = useMemo(() => {
    const total = data.tokens.reduce((acc, item) => acc + item.valueInUSD, 0);
    const d: ChartData[] = [];
    data.tokens.slice(0, 3).forEach((item, idx) => {
      d.push({
        name: item.name,
        y: item.valueInUSD,
        ratio: (item.valueInUSD / total) * 100,
        amount: item.amount,
        color: donutColors[idx],
        symbol: item.symbol,
        entity: {
          type: item.type,
          id: item.id,
        },
      });
    });
    if (data.tokens.length > 3) {
      const value = data.tokens.slice(3).reduce((acc, item) => acc + item.valueInUSD, 0);
      d.push({
        name: 'Others',
        y: value,
        ratio: (value / total) * 100,
        color: donutColors[3],
        amount: null,
        symbol: null,
      });
    }
    return d;
  }, [data]);

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
                <Box>
                  <Link href={item.entity ? `/${item.entity.type}/${item.entity.id}` : '#'}>
                    <Typography color="text.secondary" variant="body2" mb={0.5}>
                      {item.name}
                    </Typography>
                  </Link>
                  <Typography fontWeight={600} variant="body2">
                    {isNumeric(item.amount)
                      ? `${formatNumberAfterComma(item.amount)} ${(item.symbol! as string).toUpperCase()}`
                      : ''}{' '}
                    <Typography component="span" variant="small">
                      {formatNumberAfterComma(item.y)}
                    </Typography>
                  </Typography>
                </Box>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
