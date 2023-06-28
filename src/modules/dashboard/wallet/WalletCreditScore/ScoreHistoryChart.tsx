/* eslint-disable @typescript-eslint/no-non-null-assertion */
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import useAreaChartConfig from 'src/hooks/highcharts/useAreaChartConfig';
import { useDashboardWalletCreditScore } from 'src/contexts/dashboard';
import { useMemo } from 'react';
import { alpha, useTheme } from '@mui/material';
import { formatNumber } from '@travalendingpool/utils';

export default function ScoreHistoryChart() {
  const { data } = useDashboardWalletCreditScore();
  const theme = useTheme();

  const [balanceHistory, creditScoreHistory] = useMemo(() => {
    const x: number[][] = [],
      y: number[][] = [];
    let minX = Number.MAX_SAFE_INTEGER,
      maxX = Number.MIN_SAFE_INTEGER,
      minY = Number.MAX_SAFE_INTEGER,
      maxY = Number.MIN_SAFE_INTEGER;

    Object.entries(data.creditScoreHistory).forEach(([t, v]) => {
      const _t = Number(t) * 1000;
      x.push([_t, v.balance]);
      y.push([_t, v.creditScore]);
      minX = Math.min(minX, v.balance);
      minY = Math.min(minY, v.creditScore);
      maxX = Math.max(maxX, v.balance);
      maxY = Math.max(maxY, v.balance);
    });
    return [
      { data: x, min: minX, max: maxX },
      { data: y, min: minY, max: maxY },
    ];
  }, [data]);

  const options = useAreaChartConfig(
    {
      chart: {
        height: 300,
      },
      tooltip: {
        enabled: true,
        shared: true,
        formatter: function () {
          const p1 = this.points![0],
            p2 = this.points![1];
          return (
            `<b>${new Highcharts.Time().dateFormat('%Y-%m-%d %H:%M', this.x as number)}</b>` +
            '<br />' +
            `<span style="color: ${p1.color}">\u25CF </span>` +
            `${p1.series.name}: <b>${formatNumber(p1.y, { prefix: '$' })}</b>` +
            '<br/ >' +
            `<span style="color: ${p2.color}">\u25CF </span>` +
            `${p2.series.name}: <b>${formatNumber(p2.y)}</b>`
          );
        },
      },
      xAxis: {
        type: 'datetime',
      },
      yAxis: [
        {
          gridLineWidth: 0,
          title: {
            text: 'Balance ($)',
            style: {
              color: theme.palette.text.secondary,
            },
          },
          min: balanceHistory.min,
          max: balanceHistory.max,
        },
        {
          gridLineWidth: 1,
          opposite: true,
          title: {
            text: 'Score',
            style: {
              color: theme.palette.text.secondary,
            },
          },
          min: creditScoreHistory.min,
          max: creditScoreHistory.max,
        },
      ],
      series: [
        {
          type: 'area',
          name: 'Balance',
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          data: balanceHistory.data,
          yAxis: 0,
          fillColor: {
            linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
            stops: [
              [0, alpha(Highcharts.getOptions()!.colors![0] as string, 0.4)],
              [1, 'transparent'],
            ],
          },
        },
        {
          type: 'area',
          name: 'Credit score',
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          data: creditScoreHistory.data,
          yAxis: 1,
          fillColor: {
            linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
            stops: [
              [0, alpha(Highcharts.getOptions()!.colors![1] as string, 0.4)],
              [1, 'transparent'],
            ],
          },
        },
      ],
    },
    [balanceHistory, creditScoreHistory]
  );

  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </>
  );
}
