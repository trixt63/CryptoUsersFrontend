import { compactNumber } from '@travalendingpool/utils';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useMemo } from 'react';
import { useDashboardTokenHolders } from 'src/contexts/dashboard';
import useBarChartConfig from 'src/hooks/useBarChartConfig';
import { ApiTokenHolderType } from 'src/services/dashboard-api/data-types';

export default function TokenChart() {
  const { data, token } = useDashboardTokenHolders();
  const chartData = useMemo(() => {
    return data.holders
      .sort((a: ApiTokenHolderType, b: ApiTokenHolderType) => {
        return b.estimatedBalance - a.estimatedBalance;
      })
      .slice(0, 10)
      .map((item: ApiTokenHolderType) => [item.address, item.estimatedBalance]);
  }, [data]);

  const options = useBarChartConfig(
    {
      chart: {
        height: 300,
      },
      xAxis: {
        type: 'category',
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
            `<b>${this.key}</b>` +
            '<br />' +
            `<span style="color: ${this.color}">\u25CF </span>` +
            `${'Balance'}: <b>${compactNumber(this.y || 0)}</b>`
          );
        },
      },
      series: [
        {
          name: `${token.symbol}`,
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
