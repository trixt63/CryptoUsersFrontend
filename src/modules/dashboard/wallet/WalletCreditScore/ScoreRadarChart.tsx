import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useDashboardWalletCreditScore } from 'src/contexts/dashboard';
import useRadarChartConfig from 'src/hooks/highcharts/useRadarChartConfig';

export default function ScoreRadarChart() {
  const { data } = useDashboardWalletCreditScore();

  const options = useRadarChartConfig(
    {
      chart: {
        height: 320,
      },
      xAxis: {
        categories: ['Assets', 'Transactions', 'Loan', 'Circulating assets', 'Trustworthiness assets'],
        // tickInterval: 72,
      },
      yAxis: {
        min: 0,
        max: 1000.1,
        tickInterval: 500,
      },
      legend: {
        enabled: false,
      },
      plotOptions: {
        series: {
          pointStart: 0,
        },
      },
      tooltip: {
        valueDecimals: 0,
      },
      series: [
        {
          type: 'area',
          name: 'Score',
          data: [
            data.detail.assets,
            data.detail.transactions,
            data.detail.loan,
            data.detail.circulatingAssets,
            data.detail.trustworthinessAssets,
          ],
          fillOpacity: 0.2,
        },
      ],
    },
    [data]
  );

  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </>
  );
}
