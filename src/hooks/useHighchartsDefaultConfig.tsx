import { useTheme } from '@mui/material';
import { useMemo } from 'react';

export default function useHighchartsDefaultConfig(): Highcharts.Options {
  const theme = useTheme();

  return useMemo<Highcharts.Options>(
    () => ({
      title: {
        style: {
          color: theme.palette.text.secondary,
          fontSize: '16px',
        },
      },
      yAxis: {
        gridLineColor: '#1A212B',
        lineColor: '#1A212B',
        tickColor: '#1A212B',
        title: {
          style: {
            color: theme.palette.text.primary,
          },
        },
        labels: {
          style: {
            color: theme.palette.text.secondary,
          },
        },
      },
      xAxis: {
        gridLineColor: '#1A212B',
        tickColor: '#1A212B',
        lineColor: '#1A212B',
        title: {
          style: {
            color: theme.palette.text.primary,
          },
        },
        labels: {
          style: {
            color: theme.palette.text.secondary,
          },
        },
      },
      legend: {
        itemStyle: {
          color: theme.palette.text.primary,
        },
        itemHoverStyle: {
          color: theme.palette.primary.main,
        },
        itemHiddenStyle: {
          color: theme.palette.mode === 'dark' ? '#7a7a7a' : '#cccccc',
        },
      },
      loading: {
        style: {
          backgroundColor: theme.palette.mode === 'dark' ? '#000' : '#fff',
        },
      },
    }),
    [theme]
  );
}
