import { Avatar, Box, Paper } from '@mui/material';
import { formatNumber } from '@travalendingpool/utils';
import moment from 'moment';
import { useMemo } from 'react';
import { Link } from 'src/components/primitives/Link';
import RankingTable, { RankingTableColumn } from 'src/components/RankingTable';
import ChangeRate from '../components/ChangeRate';
import { NoData } from '../components/common';
import { useDerivativesRankingContext, useRankingPaginationContext } from '../context';

type DataRow = {
  id: string;
  rank: number;
  exchange: {
    name: string;
    imgUrl: string;
  };
  volume: number;
  volumeChangeRate: number;
  makerFees: number;
  takerFees: number;
  openInterests: number;
  markets: number;
  launched: number;
};

const columnConfigs: RankingTableColumn<keyof DataRow, DataRow>[] = [
  { title: 'Rank', name: 'rank', cellProps: { width: 80, align: 'center' } },
  {
    title: 'Exchange',
    name: 'exchange',
    sticky: true,
    cellProps: { sx: { fontWeight: 600 } },
    headProps: { sx: { fontWeight: 500 } },
    render: (row) => (
      <Box
        component={Link}
        href={`/ranking/exchanges/${row.id}`}
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          color: 'inherit',
          '&:hover': {
            color: 'primary.main',
          },
        }}
      >
        <Avatar src={row['exchange'].imgUrl} alt={row['exchange'].name} sx={{ width: 28, height: 28, mr: 1.5 }} />
        {row['exchange'].name}
      </Box>
    ),
  },
  {
    title: 'Trading Volume',
    name: 'volume',
    sortable: true,
    cellProps: { align: 'right' },
    render: (row) => {
      return formatNumber(row['volume'], { prefix: '$', fractionDigits: 0, fallback: <NoData /> });
    },
  },
  {
    title: 'TV Change',
    name: 'volumeChangeRate',
    sortable: true,
    cellProps: { align: 'right' },
    render: (row) => {
      return <ChangeRate rate={row['volumeChangeRate']} />;
    },
  },
  {
    title: 'Maker Fees',
    name: 'makerFees',
    sortable: true,
    cellProps: { align: 'right' },
    render: (row) => {
      return formatNumber(row['makerFees'], { suffix: '%', fractionDigits: 4, fallback: <NoData /> });
    },
  },
  {
    title: 'Taker Fees',
    name: 'takerFees',
    sortable: true,
    cellProps: { align: 'right' },
    render: (row) => {
      return formatNumber(row['takerFees'], { suffix: '%', fractionDigits: 4, fallback: <NoData /> });
    },
  },
  {
    title: 'Open Interests',
    name: 'openInterests',
    sortable: true,
    cellProps: { align: 'right' },
    render: (row) => {
      return formatNumber(row['openInterests'], { fractionDigits: 2, prefix: '$', fallback: <NoData /> });
    },
  },
  {
    title: 'Markets',
    name: 'markets',
    sortable: true,
    cellProps: { align: 'right', sx: { pr: 3 } },
    render: (row) => {
      return formatNumber(row['markets'], { fallback: <NoData /> });
    },
  },
  {
    title: 'Launched',
    name: 'launched',
    cellProps: { align: 'center' },
    render: (row) => {
      return moment(row['launched']).format('MMM YYYY');
    },
  },
];

export default function RankingTableDetail() {
  const { data } = useDerivativesRankingContext();
  const { page, pageSize } = useRankingPaginationContext();

  const tableData = useMemo<DataRow[]>(() => {
    return data.docs.map((item, idx) => ({
      id: item.id,
      rank: (page - 1) * pageSize + idx + 1,
      exchange: {
        name: item.name,
        imgUrl: item.imgUrl,
      },
      volume: item.volume,
      volumeChangeRate: item.volumeChangeRate * 100,
      makerFees: item.makerFeesRate * 100,
      takerFees: item.takerFeesRate * 100,
      openInterests: item.openInterests,
      markets: item.numberOfMarkets,
      launched: item.launchedAt * 1000,
    }));
  }, [data, page, pageSize]);

  return (
    <Paper sx={{ overflow: 'hidden', border: '1px solid', borderColor: 'common.border' }}>
      <RankingTable
        tableProps={{
          'aria-labelledby': 'heading',
        }}
        columns={columnConfigs}
        rows={tableData}
        orderByKeyMap={{
          volume: 'volume',
          volumeChangeRate: 'volumeChangeRate',
          makerFees: 'makerFeesRate',
          takerFees: 'takerFeesRate',
          markets: 'numberOfMarkets',
          launched: 'launchedAt',
        }}
      />
    </Paper>
  );
}
