/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, useTheme } from '@mui/material';
import { deepmerge } from '@mui/utils';
import { compactNumber } from '@travalendingpool/utils';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useMemo } from 'react';
import useHighchartsDefaultConfig from 'src/hooks/useHighchartsDefaultConfig';
import formatNumberAfterComma from 'src/utils';

interface DetailScoreChartProps {
  chartData: Array<{
    name: string;
    data: Array<Array<number>>;
  }>;
}

export default function DetailScoreChart(props: DetailScoreChartProps) {
  const { chartData } = props;
  const [seriesLeft, seriesRight] = useMemo(() => {
    const leftData = chartData[0].data.map((item) => {
      return [item[0] * 1000, item[1]];
    });
    const rightData = chartData[1].data.map((item) => {
      return [item[0] * 1000, item[1]];
    });
    return [leftData, rightData];
  }, [chartData]);

  const theme = useTheme();
  const defaultConfig = useHighchartsDefaultConfig();

  const options = useMemo<Highcharts.Options>(() => {
    return deepmerge(defaultConfig, {
      chart: {
        height: '240px',
      },
      colors: ['#009FDB', '#A9AAF2'],
      title: {
        text: '',
      },
      xAxis: {
        type: 'datetime',
        labels: {
          align: 'center',
        },
        tickPixelInterval: 120,
      },
      yAxis: [
        {
          ...defaultConfig.yAxis,
          gridLineWidth: 0,
          title: {
            enabled: false,
            text: chartData[0].name,
            style: {
              color: theme.palette.text.primary,
            },
          },
          labels: {
            formatter: function (this: any) {
              return `<span style='color:#6d86b0'>${compactNumber(this.value)}</span>`;
            },
          },
        },
        {
          ...defaultConfig.yAxis,
          title: {
            enabled: false,
            text: chartData[1].name,
            style: {
              color: theme.palette.text.primary,
            },
          },
          opposite: true,
          labels: {
            formatter: function (this: any) {
              return `<span style='color:#a9aaf2'>${compactNumber(this.value)}</span>`;
            },
          },
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
          type: 'line',
          name: chartData[0].name,
          data: seriesLeft,
          yAxis: 0,
        },
        {
          type: 'line',
          name: chartData[1].name,
          data: seriesRight,
          yAxis: 1,
        },
      ],
    } as Highcharts.Options);
  }, [chartData, defaultConfig, seriesLeft, seriesRight, theme.palette.text.primary]);
  return (
    <Box sx={{ height: 260, width: '100%', mt: { xs: 4, sm: 0 } }}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </Box>
  );
}
