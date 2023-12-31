import { formatNumber } from '@travalendingpool/utils';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useMemo } from 'react';
import { useDashboardTokenTransfers } from 'src/contexts/dashboard';
import useBarChartConfig from 'src/hooks/useBarChartConfig';

export default function TransfersChart() {
  const { data } = useDashboardTokenTransfers();

  const chartData = useMemo(() => {
    return Object.entries(data.dailyTransfers).map((item) => [Number(item[0]) * 1000, item[1]]);
  }, [data]);

  const options = useBarChartConfig(
    {
      chart: {
        height: 300,
      },
      xAxis: {
        type: 'datetime',
        tickLength: 15,
        tickPixelInterval: 150,
      },
      yAxis: {
        title: {
          text: undefined,
        },
      },
      tooltip: {
        formatter: function () {
          return (
            `<b>${new Highcharts.Time().dateFormat('%Y-%m-%d %H:%M', this.x as number)}</b>` +
            '<br />' +
            `<span style="color: ${this.color}">\u25CF </span>` +
            `${'Number of Transactions'}: <b>${formatNumber(this.y)}</b>`
          );
        },
      },
      series: [
        {
          name: 'Transactions',
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          data: chartData,
        },
      ],
    },
    [chartData]
  );

  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </>
  );
}
