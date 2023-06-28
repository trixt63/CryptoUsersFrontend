import { Box, Paper, Typography } from '@mui/material';
import { deepmerge } from '@mui/utils';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsMoreInit from 'highcharts/highcharts-more';
import { useMemo } from 'react';
import TooltipInfo from 'src/components/TooltipInfo';
import { useDashboardTokenHealth } from 'src/contexts/dashboard';
import useHighchartsDefaultConfig from 'src/hooks/useHighchartsDefaultConfig';

if (typeof Highcharts === 'object') {
  highchartsMoreInit(Highcharts);
}

export default function TokenHealthOverview() {
  const { tokenHealth } = useDashboardTokenHealth();
  const hcDefaultConfig = useHighchartsDefaultConfig();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const categories = [
    'Health',
    'Market Cap',
    'Volume',
    'Price',
    'Price Stability',
    'Daily Tx',
    'Holders',
    'Holder Distribution',
  ];

  const series = useMemo(() => {
    if (tokenHealth) {
      return [
        {
          name: 'Score',
          data: [
            tokenHealth.credit_score,
            tokenHealth.market_cap_score,
            tokenHealth.trading_over_cap_score,
            tokenHealth.price_over_highest_score,
            tokenHealth.price_stability_score,
            tokenHealth.number_of_transaction_score,
            tokenHealth.holders_score,
            tokenHealth.holder_distribution_score,
          ],
          pointPlacement: 'on',
          fillOpacity: 0.2,
        },
      ];
    }
    return [
      {
        name: 'Score',
        data: [1, 1, 1, 1, 1, 1, 1, 1],
      },
    ];
  }, [tokenHealth]);

  const options = useMemo(() => {
    return deepmerge(hcDefaultConfig, {
      chart: {
        height: 300,
        polar: true, //should call highchartsMoreInit to enable radar chart (check lines 12-14)
        type: 'area',
      },
      colors: ['#009FDB'],
      xAxis: {
        tickmarkPlacement: 'on',
        lineWidth: 0,
        categories: categories,
        gridLineColor: '#1d2a37',
      },
      yAxis: {
        gridLineInterpolation: 'polygon',
        lineWidth: 0,
        min: 0,
        max: 1000,
        tickInterval: 500,
      },
      legend: {
        layout: 'vertical',
        enabled: false,
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
        },
      },
      pane: {
        startAngle: 0,
        endAngle: 360,
      },
      tooltip: {
        enabled: true,
        shared: true,
      },
      series: series,
    } as Highcharts.Options);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hcDefaultConfig, series]);

  return (
    <Paper
      sx={{
        mt: 4,
        borderRadius: '10px',
        width: '100%',
        p: 3,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography sx={{ fontSize: '20px', mr: '4px', fontWeight: 600 }}>Health Overview</Typography>
        <TooltipInfo iconProps={{ fontSize: 'small' }} title={''} />
      </Box>
      <Box sx={{ height: 340, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </Box>
    </Paper>
  );
}
