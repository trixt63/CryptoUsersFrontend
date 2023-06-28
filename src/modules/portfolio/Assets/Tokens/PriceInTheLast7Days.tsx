import { Box } from '@mui/material';
import { deepmerge } from '@mui/utils';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useMemo } from 'react';
import useHighchartsDefaultConfig from 'src/hooks/useHighchartsDefaultConfig';

interface PriceInTheLast7Days {
  data: {
    [key: string]: number;
  };
}

export default function PriceInTheLast7Days(props: PriceInTheLast7Days) {
  const { data } = props;
  const series = useMemo(() => {
    const result = Object.entries(data);
    return result;
  }, [data]);
  const hcDefaultConfig = useHighchartsDefaultConfig();

  const checkIncrease = () => {
    const firstPrice = Object.values(data)[0];
    const lastPrice = Object.values(data)[Object.values(data).length - 1];
    return lastPrice > firstPrice;
  };

  const options = useMemo(() => {
    return deepmerge(hcDefaultConfig, {
      chart: {
        type: 'line',
        height: 50,
        width: 180,
      },
      xAxis: {
        visible: false,
      },
      yAxis: {
        labels: {
          enabled: false,
        },
        title: {
          text: undefined,
        },
        gridLineWidth: 0,
      },
      legend: {
        enabled: false,
      },
      plotOptions: {
        series: {
          color: checkIncrease() ? '#15c784' : '#ce214e',
        },
        line: {
          marker: {
            enabled: false,
            symbol: 'circle',
          },
          states: {
            hover: {
              enabled: false,
            },
          },
        },
      },
      tooltip: {
        enabled: false,
        shared: true,
        // headerFormat: '<span style="font-size: 11px;">Market cap: <b>{point.key}</b></span><br/>',
      },
      series: [
        {
          name: 'Price in the last 7 days',
          data: series,
        },
      ],
    } as Highcharts.Options);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hcDefaultConfig, series]);
  return (
    <Box>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </Box>
  );
}
