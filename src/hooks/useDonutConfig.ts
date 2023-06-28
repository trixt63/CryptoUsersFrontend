import Highcharts from 'highcharts';
import { useMemo } from 'react';
import useHighchartsDefaultConfig from 'src/hooks/useHighchartsDefaultConfig';

export const donutColors = ['#009FDB', '#764C79', '#A9AAF2', '#5185AA', '#C9E1F8'];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function useDonutConfig(extraOptions?: Highcharts.Options, deps: any[] = []) {
  const defaultConfig = useHighchartsDefaultConfig();

  return useMemo<Highcharts.Options>(() => {
    return Highcharts.merge(
      defaultConfig,
      {
        chart: {
          type: 'pie',
          options3d: {
            enabled: true,
            alpha: 45,
          },
          height: 220,
        },
        colors: donutColors,
        tooltip: {
          enabled: false,
        },
        plotOptions: {
          pie: {
            cursor: 'pointer',
            dataLabels: {
              enabled: false,
            },
            innerSize: '82%',
            depth: 45,
            borderWidth: 0,
          },
        },
        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 500,
              },
              chartOptions: {
                chart: {
                  height: 200,
                },
              },
            },
          ],
        },
      } as Highcharts.Options,
      extraOptions
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultConfig, ...deps]);
}
