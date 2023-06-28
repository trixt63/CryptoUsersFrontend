import { Avatar, Box, Paper } from '@mui/material';
import { formatNumber } from '@travalendingpool/utils';
import { useMemo } from 'react';
import { Link } from 'src/components/primitives/Link';
import RankingTable, { RankingTableColumn } from 'src/components/RankingTable';
import ChangeRate from '../components/ChangeRate';
import { NoData } from '../components/common';
import { useRankingPaginationContext, useTokensRankingContext } from '../context';

type DataRow = {
  id: string;
  rank: number;
  token: {
    name: string;
    imgUrl: string;
  };
  score: number;
  volume: number;
  marketCap: number;
  price: number;
  priceChangeRate: number;
  holder: number;
};

const columnConfigs: RankingTableColumn<keyof DataRow, DataRow>[] = [
  { title: 'Rank', name: 'rank', cellProps: { width: 80, align: 'center' } },
  {
    title: 'Token',
    name: 'token',
    sticky: true,
    cellProps: { sx: { fontWeight: 600 } },
    headProps: { sx: { fontWeight: 500 } },
    render: (row) => (
      <Box
        component={Link}
        href={`/token/${row.id}`}
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          color: 'inherit',
          '&:hover': {
            color: 'primary.main',
          },
        }}
      >
        <Avatar src={row['token'].imgUrl} alt={row['token'].name} sx={{ width: 28, height: 28, mr: 1.5 }} />
        {row['token'].name}
      </Box>
    ),
  },
  {
    title: 'Score',
    name: 'score',
    sortable: true,
    cellProps: { align: 'right' },
    render: (row) => {
      return formatNumber(row['score']);
    },
  },
  {
    title: 'Price',
    name: 'price',
    sortable: true,
    cellProps: { align: 'right', sx: { minWidth: 120 } },
    render: (row) => {
      return formatNumber(row['price'], { fractionDigits: 4, prefix: '$', fallback: <NoData /> });
    },
  },
  {
    title: 'Price Change',
    name: 'priceChangeRate',
    sortable: true,
    cellProps: { align: 'right', width: 180 },
    render: (row) => {
      return <ChangeRate rate={row['priceChangeRate']} />;
    },
  },
  {
    title: 'Market Cap',
    name: 'marketCap',
    sortable: true,
    cellProps: { align: 'right' },
    render: (row) => {
      return formatNumber(row['marketCap'], { fractionDigits: 0, prefix: '$', fallback: <NoData /> });
    },
  },
  {
    title: 'Volume',
    name: 'volume',
    sortable: true,
    cellProps: { align: 'right' },
    render: (row) => {
      return formatNumber(row['volume'], { fractionDigits: 0, prefix: '$', fallback: <NoData /> });
    },
  },
  {
    title: 'Holders',
    name: 'holder',
    sortable: true,
    cellProps: { align: 'right', sx: { pr: 4 } },
    render: (row) => {
      return formatNumber(row['holder'], { fallback: <NoData /> });
    },
  },
];

export default function RankingTableDetail() {
  const { data } = useTokensRankingContext();
  const { page, pageSize } = useRankingPaginationContext();

  const tableData = useMemo<DataRow[]>(() => {
    return data.docs.map((item, idx) => ({
      id: item.id,
      rank: (page - 1) * pageSize + idx + 1,
      token: {
        name: item.name,
        imgUrl: item.imgUrl,
      },
      score: item.tokenHealth,
      volume: item.volume,
      // volumeChangeRate: item.volumeChangeRate * 100,
      marketCap: item.marketCap,
      price: item.price,
      priceChangeRate: item.priceChangeRate * 100,
      holder: item.numberOfHolders,
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
          score: 'tokenHealth',
          holder: 'numberOfHolders',
        }}
      />
    </Paper>
  );
}
