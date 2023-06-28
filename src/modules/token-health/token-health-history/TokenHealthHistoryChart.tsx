/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, useTheme } from '@mui/material';
import { deepmerge } from '@mui/utils';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useMemo } from 'react';
import useHighchartsDefaultConfig from 'src/hooks/useHighchartsDefaultConfig';
import formatNumberAfterComma from 'src/utils';

interface TokenHealthHistoryChart {
  series: any;
}

export default function TokenHealthHistoryChart(props: TokenHealthHistoryChart) {
  const { series } = props;
  const defaultConfig = useHighchartsDefaultConfig();
  const theme = useTheme();

  const options = useMemo<Highcharts.Options>(() => {
    return deepmerge(defaultConfig, {
      chart: {
        height: '240px',
      },
      colors: ['#009FDB', '#764C79', '#A9AAF2', '#14A090', '#B77D72'],
      title: {
        text: '',
      },
      xAxis: {
        type: 'datetime',
        labels: {
          align: 'center',
        },
      },
      yAxis: series.map((item: any) => {
        return {
          ...defaultConfig.yAxis,
          title: {
            enabled: false,
            text: item.name,
            style: {
              color: theme.palette.text.primary,
            },
          },
          visible: false,
        };
      }),
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
        line: {
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
      series: series.map((item: any) => {
        return {
          type: item.type,
          name: item.name,
          data: item.data,
          yAxis: item.yAxis,
        };
      }),
      legend: {
        enabled: false,
      },
    } as Highcharts.Options);
  }, [defaultConfig, series, theme.palette.text.primary]);
  return (
    <Box sx={{ py: 2, height: 300 }}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </Box>
  );
}
