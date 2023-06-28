/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Grid, Paper, Typography, useTheme } from '@mui/material';
import { deepmerge } from '@mui/utils';
import { compactNumber, formatNumber } from '@travalendingpool/utils';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import { useProjectDeFiStats } from 'src/contexts/project';
import useHighchartsDefaultConfig from 'src/hooks/useHighchartsDefaultConfig';
import formatNumberAfterComma from 'src/utils';
import ChangeRate from '../../components/ChangeRate';
import StatisticItem from '../components/StatisticItem';

const ProjectRelationship = dynamic(() => import('src/modules/ranking/project-detail/components/ProjectRelationship'), {
  ssr: false,
});

export default function DeFiStats() {
  const data = useProjectDeFiStats();
  const theme = useTheme();

  const [tvl, numberOfTransactions] = useMemo(() => {
    const x: [number, number][] = [];
    const y: [number, number][] = [];

    Object.entries(data.history).forEach(([t, v]) => {
      const _t = Number(t) * 1000;
      x.push([_t, Number(v.tvl)]);
      y.push([_t, Number(v.numberOfTransactions)]);
    });
    return [x, y];
  }, [data]);

  const defaultConfig = useHighchartsDefaultConfig();
  const options = useMemo<Highcharts.Options>(() => {
    return deepmerge(defaultConfig, {
      chart: {
        height: 240,
        zoomType: 'xy',
      },
      title: {
        text: '',
      },
      xAxis: {
        type: 'datetime',
        crosshair: false,
        tickLength: 20,
        tickPixelInterval: 150,
      },
      plotOptions: {
        spline: {
          marker: {
            enabled: false,
            symbol: 'circle',
            radius: 1,
            states: {
              hover: {
                enabled: true,
              },
            },
          },
        },
        series: {
          borderWidth: 0,
          borderRadius: 2,
        },
      },
      yAxis: [
        {
          ...defaultConfig.yAxis,
          labels: {
            formatter: function () {
              return `<span>$${compactNumber(this.value)}</span>`;
            },
            style: {
              color: theme.palette.text.secondary,
            },
          },
          title: {
            enabled: false,
          },
          visible: true,
        },
        {
          ...defaultConfig.yAxis,
          title: {
            enabled: false,
          },
          labels: {
            formatter: function () {
              return `<span>${compactNumber(this.value)}</span>`;
            },
            style: { color: '#8f91c3' },
          },
          opposite: true,
          visible: true,
        },
      ],
      tooltip: {
        shared: true,
        formatter: function (this: any) {
          return this.points.reduce(function (s: any, point: any) {
            return (
              s +
              '<br/><span style="color:' +
              point.color +
              '">\u25CF </span>' +
              point.series.name +
              ': ' +
              formatNumberAfterComma(point.y)
            );
          }, '<b>' + new Highcharts.Time().dateFormat('%Y-%m-%d %H:%M', this.x) + '</b>');
        },
      },
      legend: {
        enabled: true,
        layout: 'horizontal',
        align: 'right',
        verticalAlign: 'top',
        itemMarginTop: 0,
        itemMarginBottom: 10,
      },
      series: [
        {
          type: 'column',
          name: 'Number Of Transactions',
          data: numberOfTransactions,
          pointWidth: 20,
          yAxis: 1,
        },
        {
          type: 'spline',
          name: 'TVL',
          data: tvl,
        },
      ],
    } as Highcharts.Options);
  }, [defaultConfig, numberOfTransactions, theme.palette.text.secondary, tvl]);

  return (
    <Box>
      <Grid container spacing={2} sx={{ mb: 2, mt: 0.4 }}>
        {data.tvl != null && data.tvlChangeRate != null && (
          <Grid item xs={6} sm={3}>
            <StatisticItem
              title="TVL"
              value={`$${compactNumber(data.tvl)}`}
              tooltipInfo="Total value locked."
              subValue={
                <Typography variant="small">
                  <ChangeRate rate={data.tvlChangeRate * 100} />
                </Typography>
              }
            />
          </Grid>
        )}
        {data.numberOfActiveWallets != null && (
          <Grid item xs={6} sm={3}>
            <StatisticItem
              title="Active Wallets"
              value={compactNumber(data.numberOfActiveWallets)}
              tooltipInfo="The number of unique active wallets interacting or performing a transaction with a project's smart contracts in the last 24h."
            />
          </Grid>
        )}
        {data.numberOfTransactions != null && (
          <Grid item xs={6} sm={3}>
            <StatisticItem
              title="Transactions"
              value={compactNumber(data.numberOfTransactions)}
              tooltipInfo="The total number of transactions made between wallets and the project’s smart contracts in the last 24h."
            />
          </Grid>
        )}
        {data.capPerTVL != null && (
          <Grid item xs={6} sm={3}>
            <StatisticItem
              title="Cap / TVL"
              value={formatNumber(data.capPerTVL, { fractionDigits: 2 })}
              tooltipInfo="The ratio between market cap and total value locked by project’s smart contracts."
            />
          </Grid>
        )}
      </Grid>
      <Paper sx={{ p: 3, position: 'relative' }} variant="border">
        <Typography variant="subtitle1" sx={{ position: 'absolute', mt: 1 }}>
          Historical activities
        </Typography>
        <Box sx={{ mt: { xs: 4, sm: 0 } }}>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </Box>
      </Paper>
      <ProjectRelationship />
    </Box>
  );
}
