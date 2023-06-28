/* eslint-disable @typescript-eslint/no-explicit-any */
import { alpha, Box } from '@mui/material';
import { deepmerge } from '@mui/utils';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useEffect, useMemo } from 'react';
import useHighchartsDefaultConfig from 'src/hooks/useHighchartsDefaultConfig';
import { useAppDispatch, useAppSelector } from 'src/redux/hook';
import { fetchDAppTokenBalanceData } from 'src/redux/portfolio/dapps-slice';
import formatNumberAfterComma from 'src/utils';
import { useWeb3React } from 'src/wagmi';
import PaperTitle from '../../components/PaperTitle';
import { useDAppsTokenBalanceData } from '../hook';

interface DAppsRowDetailsProps {
  dAppId: string;
  tokenId: string;
  action: string;
}

export default function DappsRowDetails(props: DAppsRowDetailsProps) {
  const { dAppId, tokenId, action } = props;
  const defaultConfig = useHighchartsDefaultConfig();
  const dispatch = useAppDispatch();
  const { address } = useWeb3React();
  const chain = useAppSelector((state) => state.portfolio.configSlice.chainId);

  const data = useDAppsTokenBalanceData(dAppId, tokenId, action);

  useEffect(() => {
    if (address && dAppId && tokenId) {
      dispatch(
        fetchDAppTokenBalanceData({
          address,
          dAppId,
          tokenId,
          chain,
          action,
        })
      );
      // dispatch(
      //   fetchDAppTokenBalanceData({
      //     address: '0x5f54d6056a0ea0a3bc882455e9c287d64035e0f6',
      //     dAppId,
      //     tokenId,
      //     chain,
      //     action,
      //   })
      // );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [action, address, chain, dAppId, tokenId]);

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

  // eslint-disable-next-line react-hooks/exhaustive-deps

  const options = useMemo<Highcharts.Options>(() => {
    return deepmerge(defaultConfig, {
      chart: {
        height: '240px',
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
            enabled: false,
          },
        },
        {
          ...defaultConfig.yAxis,
          title: {
            enabled: false,
            // text: 'Credit Score',
            // style: {
            //   color: theme.palette.text.primary,
            // },
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
  }, [price, amount, defaultConfig]);
  return (
    <Box>
      <PaperTitle title="Token Borrow" />
      <HighchartsReact highcharts={Highcharts} options={options} />
    </Box>
  );
}
