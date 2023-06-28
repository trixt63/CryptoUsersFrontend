/* eslint-disable @typescript-eslint/no-explicit-any */
import { alpha, Paper, useTheme } from '@mui/material';
import { deepmerge } from '@mui/utils';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useMemo } from 'react';
import useHighchartsDefaultConfig from 'src/hooks/useHighchartsDefaultConfig';
import PaperTitle from '../../components/PaperTitle';
import { useAssetData, useAssetStatus } from '../hooks';
import { NestedLoading } from 'src/modules/app-center/common';
import formatNumberAfterComma from 'src/utils';

export default function BalanceHistory() {
  const defaultConfig = useHighchartsDefaultConfig();
  const theme = useTheme();

  const data = useAssetData()?.creditScoreHistory;
  const { isLoading } = useAssetStatus();

  const [balances, scores] = useMemo(() => {
    const x: [number, number][] = [],
      y: [number, number][] = [];
    if (data)
      Object.entries(data).forEach(([t, v]) => {
        const _t = Number(t) * 1000;
        x.push([_t, v.balance]);
        y.push([_t, v.creditScore]);
      });
    return [x, y];
  }, [data]);

  const options = useMemo<Highcharts.Options>(() => {
    return deepmerge(defaultConfig, {
      chart: {
        height: '220px',
      },
      colors: ['#009FDB', '#a9aaf2'],
      title: {
        text: '',
      },
      xAxis: {
        type: 'datetime',
        labels: {
          align: 'center',
        },
      },
      yAxis: [
        {
          ...defaultConfig.yAxis,
          gridLineWidth: 0,
          title: {
            enabled: true,
            text: 'Balance',
            style: {
              color: theme.palette.text.secondary,
            },
          },
        },
        {
          ...defaultConfig.yAxis,
          title: {
            enabled: true,
            text: 'Credit Score',
            style: {
              color: theme.palette.text.secondary,
            },
          },
          opposite: true,
        },
      ],
      tooltip: {
        enabled: true,
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
      plotOptions: {
        area: {
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
      },
      legend: {
        enabled: false,
      },
      series: [
        {
          type: 'area',
          name: 'Balance',
          data: balances,
          yAxis: 0,
          fillColor: {
            linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
            stops: [
              [0, alpha('#009FDB', 0.3)],
              [1, 'transparent'],
            ],
          },
        },
        {
          type: 'area',
          name: 'Credit Score',
          data: scores,
          yAxis: 1,
          fillColor: {
            linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
            stops: [
              [0, alpha('#a9aaf2', 0.3)],
              [1, 'transparent'],
            ],
          },
        },
      ],
    } as Highcharts.Options);
  }, [defaultConfig, theme.palette.text.secondary, balances, scores]);
  return (
    <Paper sx={{ p: 3, height: 300, position: 'relative' }} variant="border">
      <PaperTitle title={'Balance and Credit score history'} />
      {isLoading ? <NestedLoading /> : <HighchartsReact highcharts={Highcharts} options={options} />}
    </Paper>
  );
}
