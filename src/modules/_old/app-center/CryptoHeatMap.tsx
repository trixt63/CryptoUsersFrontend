/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-this-alias */
// import { Box, Chip, CircularProgress, Typography } from '@mui/material';
import { deepmerge } from '@mui/utils';
import { compactNumber, formatNumber } from '@travalendingpool/utils';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import useHighchartsDefaultConfig from 'src/hooks/useHighchartsDefaultConfig';
import { useAppSelector } from 'src/redux/hook';
import formatNumberAfterComma from 'src/utils';
import { NestedLoading, Wrapper } from './common';
import { useStatus } from './hooks/useStatus';

// const heatmapLegends = [
//   { label: '+10%', color: '#03645a' },
//   { label: '+9%', color: '#058879' },
//   { label: '+3%', color: '#04A580' },
//   { label: '0%', color: '#909090' },
//   { label: '-3%', color: '#9A3953' },
//   { label: '-9%', color: '#761932' },
//   { label: '-10%', color: '#5a0f23' },
// ];

const getItemColor = (p: number) => {
  if (isNaN(p)) return 'transparent';
  p = Number(p.toFixed(2));
  if (p < -9) return '#5a0f23';
  if (p < -3) return '#761932';
  if (p < 0) return '#9A3953';
  if (p === 0) return '#909090';
  if (p <= 3) return '#04A580';
  if (p <= 9) return '#058879';
  return '#03645a';
};

const maxFontSizeToFit = (text: string, width: number, height: number, i?: number): number => {
  i = i ?? 1;
  if (i <= 0) return 0;
  if (typeof window === 'undefined') return 0;
  let el: HTMLElement;
  if (document.querySelector('#sizeCalculator') === null) {
    el = document.createElement('div');
    el.id = 'sizeCalculator';
    el.style.cssText =
      'font-family: inherit; width: auto; height: auto; position: absolute; bottom: 0px; visibility: hidden; white-space: nowrap;';
    document.body.appendChild(el);
  }
  el = document.getElementById('sizeCalculator') as unknown as HTMLElement;
  el.style.fontSize = `${i}px`;
  el.innerHTML = text;

  const w = el.clientWidth,
    h = el.clientHeight;
  if (w > width || h > height) {
    return i - 1;
  }
  return maxFontSizeToFit(text, width, height, i + 1);
};

export default function CryptoHeatMap() {
  const hcDefaultConfig = useHighchartsDefaultConfig();
  const { isLoading, isReady } = useStatus();
  const data = useAppSelector((state) => state.appCenterSlice.marketHeatmap);
  const router = useRouter();

  const options = useMemo(() => {
    return deepmerge(hcDefaultConfig, {
      chart: {
        // height: 380,
        height: 400,
        margin: [8, 8, 8, 8],
      },
      plotOptions: {
        treemap: {
          dataLabels: {
            enabled: true,
            allowOverlap: false,
            padding: 0,
            style: {
              color: 'white',
              textAlign: 'center',
            },
            useHTML: true,
            borderColor: '#0D1921',
            // format: '<span>{point.name}</span><br/>' + '<span>{point.colorValue}</span>',
            formatter: function () {
              const point = this.point;
              const pointData = data[point.index];

              const maxFontSize = 24,
                minFontSize = 8,
                labelMaxWidth = Number(point.graphic?.attr('width') ?? 0) * 0.7,
                labelMaxHeight = Number(point.graphic?.attr('height') ?? 0) * 0.7;

              const text =
                `<div style="margin-bottom: 4px; font-weight: 300;">${point.name}</div>` +
                `<div style="font-weight: 500;">${
                  (pointData.price_change > 0 ? '+' : '-') +
                  formatNumber(Math.abs(pointData.price_change) * 100, {
                    fractionDigits: 2,
                    padZero: true,
                    suffix: '%',
                  })
                }</div>`;
              let fs = maxFontSizeToFit(text, labelMaxWidth, labelMaxHeight);
              fs = Math.min(fs, maxFontSize);

              if (fs < minFontSize) return '';
              return `<div style="font-size: ${fs}px; line-height: 1;">${text}</div>`;
            },
          },
          point: {
            events: {
              click: function () {
                const pointData = data[this.index];
                router.push(`/visualization?q=${pointData.address}&chainId=${'0x38'}`);
              },
            },
          },
          cursor: 'pointer',
        },
      },
      tooltip: {
        outside: true,
        enabled: true,
        borderRadius: 8,
        useHTML: true,
        formatter: function () {
          const point = this.point;
          const pointData = data[point.index];
          return (
            `<span style="margin-bottom: 4px;display: block;"><b>${
              pointData.name
            } (${pointData.symbol.toUpperCase()})</b></span>` +
            '' +
            '<span style="font-size: 11px;">' +
            `<span>Price: $${formatNumberAfterComma(pointData.price)} (${
              (pointData.price_change > 0 ? '+' : '-') +
              formatNumber(Math.abs(pointData.price_change) * 100, {
                fractionDigits: 2,
                padZero: true,
                suffix: '%',
              })
            })</span>` +
            '<br/>' +
            `<span>Market Cap: $${compactNumber(pointData.market_cap, 2)}</span>` +
            '<br/>' +
            `<span>Volume (24h): $${formatNumber(pointData.trading_volume, { fractionDigits: 2 })}</span>` +
            '</span>'
          );
        },
      },
      legend: {
        enabled: false,
      },
      series: [
        {
          type: 'treemap',
          layoutAlgorithm: 'squarified',
          data: data.map((item) => ({
            name: item.symbol.toUpperCase(),
            value: item.market_cap,
            color: getItemColor(item.price_change * 100),
          })),
          borderColor: '#0D1921',
        },
      ],
    } as Highcharts.Options);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, hcDefaultConfig]);

  useEffect(() => {
    return () => {
      document.querySelector('#sizeCalculator')?.remove();
    };
  }, []);

  return (
    <Wrapper title="Crypto Market Heatmap" contentSx={{ px: 0, position: 'relative', minHeight: 400 }}>
      {isLoading && <NestedLoading />}
      {isReady && <HighchartsReact highcharts={Highcharts} options={options} />}
      {/* <Box sx={{ px: 2, mt: 1, textAlign: 'center' }}>
        {heatmapLegends.map((item) => {
          return (
            <Chip
              size="small"
              key={item.label}
              label={item.label}
              variant="filled"
              sx={{
                bgcolor: item.color,
                borderRadius: '2px',
                '&:not(:last-of-type)': { mr: 0.5 },
                px: 0,
                width: 46,
                fontSize: '0.75rem',
              }}
              // onClick={() => }
            />
          );
        })}
      </Box> */}
    </Wrapper>
  );
}
