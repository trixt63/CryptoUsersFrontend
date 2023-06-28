import { Box, Typography } from '@mui/material';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import formatNumberAfterComma from 'src/utils';
import { useMemo, useState } from 'react';
import { deepmerge } from '@mui/utils';
import useHighchartsDefaultConfig from 'src/hooks/useHighchartsDefaultConfig';

interface AllocationDonutChartProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dataChart: Array<Array<any>>;
}

export const colors = ['#009FDB', '#764C79', '#A9AAF2', '#5185AA', '#C9E1F8'];

export default function AllocationDonutChart(props: AllocationDonutChartProps) {
  const { dataChart } = props;

  const defaultConfig = useHighchartsDefaultConfig();

  const [centerChartData, setCenterChartData] = useState<
    undefined | { name?: string; volume?: number; ratio?: number }
  >({
    name: undefined,
    volume: undefined,
    ratio: undefined,
  });

  const options = useMemo<Highcharts.Options>(() => {
    return deepmerge(defaultConfig, {
      chart: {
        type: 'pie',
        options3d: {
          enabled: true,
          alpha: 45,
        },
        height: '220px',
      },
      colors: colors,
      title: {
        text: '',
      },
      tooltip: {
        enabled: false,
      },
      plotOptions: {
        pie: {
          // allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false,
          },
          innerSize: '84%',
          depth: 45,
        },

        series: {
          point: {
            events: {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              mouseOver: function (e: any) {
                setCenterChartData(() => {
                  const dataCenterFilter = dataChart.find((item) => item[0] === e.target.name);
                  return {
                    name: e.target.name,
                    volume: dataCenterFilter ? dataCenterFilter[1] : undefined,
                    ratio: e.target.percentage,
                  };
                });
              },
              mouseOut: function () {
                setCenterChartData({
                  name: undefined,
                  volume: undefined,
                  ratio: undefined,
                });
              },
            },
          },
        },
      },
      series: [
        {
          name: 'Price',
          data: dataChart,
          yAxis: 0,
        },
      ],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultConfig, dataChart]);
  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      <HighchartsReact highcharts={Highcharts} options={options} />
      {centerChartData && (
        <Box sx={{ position: 'absolute', width: '120px', right: 0, left: 0, top: 80, margin: '0px auto' }}>
          {centerChartData.volume != undefined && (
            <Box>
              <Typography
                variant="body2"
                sx={{ color: 'text.secondary', textAlign: 'center', fontSize: { xs: '12px', md: '14px' } }}
              >
                Volume
              </Typography>
              <Typography
                color="text.secondary"
                variant="body2"
                sx={{ textAlign: 'center', fontSize: { xs: '12px', md: '14px' }, fontWeight: 600 }}
              >
                ${formatNumberAfterComma(centerChartData.volume)}
              </Typography>
            </Box>
          )}
          {centerChartData.ratio != undefined && (
            <Box sx={{ mt: 1 }}>
              <Typography
                variant="body2"
                sx={{ color: 'text.secondary', textAlign: 'center', fontSize: { xs: '12px', md: '14px' } }}
              >
                Ratio
              </Typography>
              <Typography
                color="text.secondary"
                variant="body2"
                sx={{ textAlign: 'center', fontSize: { xs: '12px', md: '14px' }, fontWeight: 600 }}
              >
                {formatNumberAfterComma(centerChartData.ratio)}%
              </Typography>
            </Box>
          )}
        </Box>
      )}
      {centerChartData && centerChartData.name && (
        <Typography
          color="text.primary"
          variant="body2"
          sx={{
            textAlign: 'center',
            position: 'absolute',
            bottom: -6,
            right: 0,
            left: 0,
            fontWeight: 500,
          }}
        >
          {centerChartData.name}
        </Typography>
      )}
    </Box>
  );
}
