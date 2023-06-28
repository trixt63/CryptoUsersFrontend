import Highcharts from 'highcharts';
import { useMemo } from 'react';
import useHighchartsDefaultConfig from './useHighchartsDefaultConfig';

export default function useBarChartConfig(extraOptions: Highcharts.Options, deps: unknown[] = []) {
  const defaultConfig = useHighchartsDefaultConfig();

  return useMemo(() => {
    return Highcharts.merge(
      defaultConfig,
      {
        chart: {
          type: 'column',
        },
        plotOptions: {
          series: {
            borderWidth: 0,
            borderRadius: 2,
            color: '#5185AA',
          },
        },
        legend: {
          enabled: true,
          layout: 'horizontal',
          align: 'right',
          verticalAlign: 'top',
          itemMarginTop: 0,
          itemMarginBottom: 10,
          // itemStyle: {
          //   color: '#5185AA',
          // },
        },
      } as Highcharts.Options,
      extraOptions
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultConfig, ...deps]);
}
