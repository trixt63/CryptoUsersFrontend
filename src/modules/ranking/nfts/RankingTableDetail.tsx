import { Avatar, Box, Paper } from '@mui/material';
import { formatNumber } from '@travalendingpool/utils';
import { useMemo } from 'react';
import { Link } from 'src/components/primitives/Link';
import RankingTable, { RankingTableColumn } from 'src/components/RankingTable';
import ChangeRate from '../components/ChangeRate';
import { NoData } from '../components/common';
import { useNFTsRankingContext, useRankingPaginationContext } from '../context';

type DataRow = {
  id: string;
  rank: number;
  collection: {
    name: string;
    imgUrl: string;
  };
  volume: number;
  volumeChangeRate: number;
  price: number;
  priceChangeRate: number;
  owner: number;
  items: number;
};
const columnConfigs: RankingTableColumn<keyof DataRow, DataRow>[] = [
  { title: 'Rank', name: 'rank', cellProps: { width: 80, align: 'center' } },
  {
    title: 'Collection',
    name: 'collection',
    sticky: true,
    cellProps: { sx: { fontWeight: 600 } },
    headProps: { sx: { fontWeight: 500 } },
    render: (row) => (
      <Box
        component={Link}
        href={`/ranking/nfts/${row.id}`}
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          color: 'inherit',
          '&:hover': {
            color: 'primary.main',
          },
        }}
      >
        <Avatar src={row['collection'].imgUrl} alt={row['collection'].name} sx={{ width: 28, height: 28, mr: 1.5 }} />
        {row['collection'].name}
      </Box>
    ),
  },
  {
    title: 'Volume',
    name: 'volume',
    sortable: true,
    cellProps: { align: 'right' },
    render: (row) => {
      return formatNumber(row['volume'], { prefix: '$', fractionDigits: 0, fallback: <NoData /> });
    },
  },
  {
    title: 'Volume Change',
    name: 'volumeChangeRate',
    sortable: true,
    cellProps: { align: 'right' },
    render: (row) => {
      return <ChangeRate rate={row['volumeChangeRate']} />;
    },
  },
  {
    title: 'Price',
    name: 'price',
    sortable: true,
    cellProps: { align: 'right' },
    render: (row) => {
      return formatNumber(row['price'], { fractionDigits: 4, prefix: '$', fallback: <NoData /> });
    },
  },
  {
    title: 'Price Change',
    name: 'priceChangeRate',
    sortable: true,
    cellProps: { align: 'right' },
    render: (row) => {
      return <ChangeRate rate={row['priceChangeRate']} />;
    },
  },
  {
    title: 'Owners',
    name: 'owner',
    sortable: true,
    cellProps: { align: 'right' },
    render: (row, key) => {
      return formatNumber(row[key], { fallback: <NoData /> });
    },
  },
  {
    title: 'Items',
    name: 'items',
    sortable: true,
    cellProps: { align: 'right', sx: { pr: 4 } },
    render: (row, key) => {
      return formatNumber(row[key], { fallback: <NoData /> });
    },
  },
];
export default function RankingTableDetail() {
  const { data } = useNFTsRankingContext();
  const { page, pageSize } = useRankingPaginationContext();

  const tableData = useMemo<DataRow[]>(() => {
    return data.docs.map((item, idx) => ({
      id: item.id,
      rank: (page - 1) * pageSize + idx + 1,
      collection: {
        name: item.name,
        imgUrl: item.imgUrl,
      },
      volume: item.volume,
      volumeChangeRate: item.volumeChangeRate * 100,
      price: item.price,
      priceChangeRate: item.priceChangeRate * 100,
      owner: item.numberOfOwners,
      items: item.numberOfItems,
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
          owner: 'numberOfOwners',
          items: 'numberOfItems',
        }}
      />
    </Paper>
  );
}
