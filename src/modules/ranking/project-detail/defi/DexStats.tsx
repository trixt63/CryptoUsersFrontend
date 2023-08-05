/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Grid, Paper, Typography, useTheme } from '@mui/material';
import { compactNumber, formatNumber } from '@travalendingpool/utils';
import StatisticItem from '../components/StatisticItem';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useMemo } from 'react';
import { deepmerge } from '@mui/utils';
import { useProjectDexStats } from 'src/contexts/project';
import dynamic from 'next/dynamic';
import ChangeRate from '../../components/ChangeRate';

const ProjectRelationship = dynamic(() => import('src/modules/ranking/project-detail/components/ProjectRelationship'), {
  ssr: false,
});

export default function DexStats() {
  // const theme = useTheme();
  const data = useProjectDexStats();

    return (
    <Box>
      <Grid container spacing={2} sx={{ mb: 2, mt: 0.4 }}>
        {data.tvl != null && (
          <Grid item xs={6} sm={3}>
            <StatisticItem
              title="Trading Volume"
              value={`$${compactNumber(data.tvl)}`}
              tooltipInfo="Trading volume in the last 24h."
            />
          </Grid>
        )}
        {data.traders != null && (
          <Grid item xs={6} sm={3}>
            <StatisticItem title="# Users" value={compactNumber(data.traders)} />
          </Grid>
        )}
      </Grid>
    </Box>
  );

  // const options = useMemo<Highcharts.Options>(() => {
  //   return deepmerge(defaultConfig, {
  //     chart: {
  //       height: 240,
  //     },
  //     title: {
  //       text: '',
  //     },
  //     xAxis: {
  //       type: 'datetime',
  //       crosshair: false,
  //       tickPixelInterval: 150,
  //     },
  //     yAxis: {
  //       // Primary yAxis
  //       labels: {
  //         formatter: function () {
  //           return `<span>${compactNumber(this.value)}</span>`;
  //         },
  //         style: {
  //           color: theme.palette.text.secondary,
  //         },
  //       },
  //       title: {
  //         enabled: false,
  //       },
  //       gridLineWidth: 1,
  //     },
  //     plotOptions: {
  //       spline: {
  //         marker: {
  //           enabled: false,
  //           symbol: 'circle',
  //           radius: 1,
  //           states: {
  //             hover: {
  //               enabled: true,
  //             },
  //           },
  //         },
  //       },
  //     },
  //     tooltip: {
  //       shared: true,
  //       formatter: function (this: any) {
  //         return this.points.reduce(function (s: any, point: any) {
  //           return (
  //             s +
  //             '<br/><span style="color:' +
  //             point.color +
  //             '">\u25CF </span>' +
  //             point.series.name +
  //             ': ' +
  //             formatNumberAfterComma(point.y)
  //           );
  //         }, '<b>' + new Highcharts.Time().dateFormat('%Y-%m-%d %H:%M', this.x) + '</b>');
  //       },
  //     },
  //
  //     legend: {
  //       enabled: true,
  //       layout: 'horizontal',
  //       align: 'right',
  //       verticalAlign: 'top',
  //       itemMarginTop: 0,
  //       itemMarginBottom: 10,
  //     },
  //     series: [
  //       {
  //         type: 'spline',
  //         name: 'Volume',
  //         data: volume,
  //         marker: {
  //           lineWidth: 0,
  //         },
  //       },
  //     ],
  //   } as Highcharts.Options);
  // }, [defaultConfig, theme.palette.text.secondary, volume]);
  // return (
  //   <Box>
  //     <Grid container spacing={2} sx={{ mb: 2, mt: 0.4 }}>
  //       {data.volume != null && data.volumeChangeRate != null && (
  //         <Grid item xs={6} sm={3}>
  //           <StatisticItem
  //             title="Trading Volume"
  //             value={`$${compactNumber(data.volume)}`}
  //             tooltipInfo="Trading volume in the last 24h."
  //             subValue={
  //               <Typography variant="small">
  //                 <ChangeRate rate={data.volumeChangeRate * 100} />
  //               </Typography>
  //             }
  //           />
  //         </Grid>
  //       )}
  //       {data.numberOfMarkets != null && (
  //         <Grid item xs={6} sm={3}>
  //           <StatisticItem title="# Markets" value={compactNumber(data.numberOfMarkets)} />
  //         </Grid>
  //       )}
  //       {data.numberOfCoins != null && (
  //         <Grid item xs={6} sm={3}>
  //           <StatisticItem title="# Coins" value={formatNumber(data.numberOfCoins, { fractionDigits: 2 })} />
  //         </Grid>
  //       )}
  //     </Grid>
  //     {/*<Paper sx={{ p: 3, position: 'relative' }} variant="border">*/}
  //     {/*  <Typography variant="subtitle1" sx={{ position: 'absolute', mt: 1 }}>*/}
  //     {/*    Historical activities*/}
  //     {/*  </Typography>*/}
  //     {/*  <Box sx={{ mt: { xs: 4, sm: 0 } }}>*/}
  //     {/*    <HighchartsReact highcharts={Highcharts} options={options} />*/}
  //     {/*  </Box>*/}
  //     {/*</Paper>*/}
  //     {/*<ProjectRelationship />*/}
  //   </Box>
  // );
}
