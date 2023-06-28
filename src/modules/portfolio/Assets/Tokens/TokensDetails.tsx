/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { alpha, Box, useTheme } from '@mui/material';
import { deepmerge } from '@mui/utils';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useEffect, useMemo } from 'react';
import Loading from 'src/components/Loading';
import useHighchartsDefaultConfig from 'src/hooks/useHighchartsDefaultConfig';
import { useAppDispatch, useAppSelector } from 'src/redux/hook';
import { fetchTokenBalanceData } from 'src/redux/portfolio/assets-slice';
import formatNumberAfterComma from 'src/utils';
import { useWeb3React } from 'src/wagmi';
import PaperTitle from '../../components/PaperTitle';
import { useTokenBalanceData, useTokenBalanceStatus } from '../hooks';

interface TokenDetailsProps {
  tokenId: string;
}

export default function TokensDetails(props: TokenDetailsProps) {
  const { tokenId } = props;
  const theme = useTheme();
  const { address } = useWeb3React();
  const dispatch = useAppDispatch();

  const chain = useAppSelector((state) => state.portfolio.configSlice.chainId);

  const defaultConfig = useHighchartsDefaultConfig();
  const data = useTokenBalanceData(tokenId);
  const { isLoading } = useTokenBalanceStatus(tokenId);

  const [amount, price] = useMemo(() => {
    const x: [number, number][] = [],
      y: [number, number][] = [];
    if (data)
      Object.entries(data).forEach(([t, v]) => {
        const _t = Number(t) * 1000;
        x.push([_t, Number(v.amount)]);
        y.push([_t, Number(v.price)]);
      });
    return [x, y];
  }, [data]);

  useEffect(() => {
    if (chain && address && tokenId) dispatch(fetchTokenBalanceData({ address, tokenId: tokenId, chain }));
    // dispatch(
    //   fetchTokenBalanceData({ address: '0x5f54d6056a0ea0a3bc882455e9c287d64035e0f6', tokenId: tokenId, chain })
    // );
  }, [chain, address]);

  const options = useMemo<Highcharts.Options>(() => {
    return deepmerge(defaultConfig, {
      chart: {
        height: '200px',
      },
      colors: ['#009FDB', '#a9aaf2'],
      title: {
        text: '',
      },
      xAxis: {
        type: 'datetime',
        labels: {
          align: 'center',
        },
      },
      yAxis: [
        {
          ...defaultConfig.yAxis,
          gridLineWidth: 0,

          title: {
            enabled: true,
            text: 'Token Balance($)',
            style: {
              color: theme.palette.text.secondary,
            },
          },
        },
        {
          ...defaultConfig.yAxis,
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
          }, '<b>' + new Highcharts.Time().dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '</b>');
        },
      },
      plotOptions: {
        area: {
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
      legend: {
        enabled: false,
      },
      series: [
        {
          type: 'area',
          name: 'Amount',
          data: amount,
          yAxis: 1,
          fillColor: {
            linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
            stops: [
              [0, alpha('#009FDB', 0.3)],
              [1, 'transparent'],
            ],
          },
        },
        {
          type: 'area',
          name: 'Price',
          data: price,
          fillColor: {
            linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
            stops: [
              [0, alpha('#a9aaf2', 0.3)],
              [1, 'transparent'],
            ],
          },
        },
      ],
    } as Highcharts.Options);
  }, [amount, price, defaultConfig]);
  return (
    <Box sx={{ height: 220, width: '100%' }}>
      <PaperTitle title="Token Balance" />
      {isLoading ? (
        <Box>
          <Loading size={24} />
        </Box>
      ) : (
        <HighchartsReact highcharts={Highcharts} options={options} />
      )}
    </Box>
  );
}
