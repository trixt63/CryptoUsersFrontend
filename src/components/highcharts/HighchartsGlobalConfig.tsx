import { alpha } from '@mui/material';
import Highcharts from 'highcharts';
import { useIsomorphicLayoutEffect } from 'src/hooks';

export default function HighchartsGlobalConfig() {
  useIsomorphicLayoutEffect(() => {
    Highcharts.setOptions({
      credits: {
        enabled: false,
      },
      chart: {
        backgroundColor: 'transparent',
        style: {
          // eslint-disable-next-line quotes
          fontFamily: 'inherit',
          fontSize: '12px',
        },
      },
      title: {
        text: undefined, // disable chart title by default
      },
      colors: [
        '#B39DDB',
        '#1B95F4',
        '#90ed7d',
        '#f7a35b',
        '#8085e9',
        '#1aadce',
        '#492970',
        '#f28f43',
        '#77a1e5',
        '#c42525',
      ],
      time: {
        useUTC: false,
      },
      tooltip: {
        // backgroundColor: {
        //   linearGradient: { x1: 0, x2: 0, y1: 0, y2: 0.6 },
        //   stops: [
        //     [0, '#FFFFFF'],
        //     [1, '#E0E0E0'],
        //   ],
        // },
        backgroundColor: alpha('#000', 0.8),
        borderRadius: 8,
        shadow: false,
        borderWidth: 0,
        style: {
          color: '#FFF',
        },
      },
      plotOptions: {
        series: {
          dataLabels: {
            style: {
              textOutline: '0px',
            },
          },
        },
      },
    });
  }, []);

  return null;
}
