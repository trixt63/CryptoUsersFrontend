/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Grid, Paper, Typography } from '@mui/material';
import { deepmerge } from '@mui/utils';
import { compactNumber, formatNumber } from '@travalendingpool/utils';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import { useProjectNFTStats } from 'src/contexts/project';
import useHighchartsDefaultConfig from 'src/hooks/useHighchartsDefaultConfig';
import formatNumberAfterComma from 'src/utils';
import ChangeRate from '../../components/ChangeRate';
import StatisticItem from '../components/StatisticItem';

const ProjectRelationship = dynamic(() => import('src/modules/ranking/project-detail/components/ProjectRelationship'), {
  ssr: false,
});

export default function NFTStats() {
  const data = useProjectNFTStats();

  const [price, volume] = useMemo(() => {
    const x: [number, number][] = [];
    const y: [number, number][] = [];
    Object.entries(data.history).forEach(([t, v]) => {
      const _t = Number(t) * 1000;
      x.push([_t, v.price]);
      y.push([_t, v.volume]);
    });
    return [x, y];
  }, [data]);
  const defaultConfig = useHighchartsDefaultConfig();

  const options = useMemo<Highcharts.Options>(() => {
    return deepmerge(defaultConfig, {
      chart: {
        height: 240,
      },
      title: {
        text: '',
      },
      xAxis: {
        type: 'datetime',
        crosshair: false,
      },
      plotOptions: {
        spline: {
          marker: {
            enabled: false,
            symbol: 'circle',
            radius: 1,
            states: {
              hover: {
                enabled: true,
              },
            },
          },
        },
      },
      yAxis: [
        {
          // Primary yAxis
          ...defaultConfig.yAxis,
          gridLineWidth: 1,
          labels: {
            formatter: function () {
              return `<span>${compactNumber(this.value)}</span>`;
            },
            style: {
              color: '#657ca3',
            },
          },
          title: {
            enabled: false,
          },
        },
        {
          ...defaultConfig.yAxis,
          labels: {
            formatter: function () {
              return `<span>${compactNumber(this.value)}</span>`;
            },
            style: { color: '#a2a3dc' },
          },
          title: {
            enabled: false,
          },
          opposite: true,
        },
      ],
      tooltip: {
        enabled: true,
        shared: true,
        formatter: function (this: any) {
          return this.points.reduce(function (s: any, point: any) {
            return (
              s +
              '<br/><span style="color:' +
              point.color +
              '">\u25CF </span>' +
              point.series.name +
              ': ' +
              formatNumberAfterComma(point.y)
            );
          }, '<b>' + new Highcharts.Time().dateFormat('%Y-%m-%d %H:%M', this.x) + '</b>');
        },
      },
      legend: {
        enabled: true,
        layout: 'horizontal',
        align: 'right',
        verticalAlign: 'top',
        itemMarginTop: 0,
        itemMarginBottom: 10,
      },
      series: [
        {
          type: 'spline',
          name: 'Price',
          data: price,
          yAxis: 1,
        },
        {
          type: 'spline',
          name: 'Volume',
          data: volume,
        },
      ],
    } as Highcharts.Options);
  }, [defaultConfig, price, volume]);

  return (
    <Box>
      <Grid container spacing={2} sx={{ mb: 2, mt: 0.4 }}>
        {data.price != null && data.priceChangeRate != null && (
          <Grid item xs={6} sm={3}>
            <StatisticItem
              title="Price"
              value={formatNumber(data.price, { fractionDigits: 2, prefix: '$' })}
              subValue={
                <Typography variant="small">
                  <ChangeRate rate={data.priceChangeRate * 100} />
                </Typography>
              }
              tooltipInfo="The floor price of NFT items."
            />
          </Grid>
        )}
        {data.volume != null && data.volumeChangeRate != null && (
          <Grid item xs={6} sm={3}>
            <StatisticItem
              title="24h Volume"
              value={`$${compactNumber(data.volume)}`}
              subValue={
                <Typography variant="small">
                  <ChangeRate rate={data.volumeChangeRate * 100} />
                </Typography>
              }
              tooltipInfo="Trading volume in the last 24h."
            />
          </Grid>
        )}
        {data.numberOfItems != null && data.listedRate != null && (
          <Grid item xs={6} sm={3}>
            <StatisticItem
              title="# Items"
              value={formatNumber(data.numberOfItems, { fractionDigits: 2, prefix: '$' })}
              // subValue={data.listedRate * 100}
              subValue={
                <Typography variant="small" sx={{ color: 'text.secondary' }}>
                  {formatNumber(data.listedRate * 100, { fractionDigits: 2, suffix: '% listed' })}
                </Typography>
              }
              tooltipInfo="The number of NFT items and the percentage of items listed on the marketplace."
            />
          </Grid>
        )}
        {data.numberOfOwners != null && data.uniqueRate != null && (
          <Grid item xs={6} sm={3}>
            <StatisticItem
              title="# Owners"
              value={formatNumber(data.numberOfOwners, { fractionDigits: 2, prefix: '$' })}
              subValue={
                <Typography variant="small" sx={{ color: 'text.secondary' }}>
                  {formatNumber(data.uniqueRate * 100, { fractionDigits: 2, suffix: '% unique' })}
                </Typography>
              }
              tooltipInfo="The number of unique owners and the ratio between number of unique owners and number of items."
            />
          </Grid>
        )}
      </Grid>
      <Paper sx={{ p: 3, position: 'relative' }} variant="border">
        <Typography variant="subtitle1" sx={{ position: 'absolute', mt: 1 }}>
          Historical activities
        </Typography>
        <Box sx={{ mt: { xs: 4, sm: 0 } }}>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </Box>
      </Paper>
      <ProjectRelationship />
    </Box>
  );
}
