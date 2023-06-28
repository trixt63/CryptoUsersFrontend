import { Avatar, AvatarGroup, Box, Paper } from '@mui/material';
import { compactNumber, formatNumber, isNumeric } from '@travalendingpool/utils';
import { useMemo } from 'react';
import { Link } from 'src/components/primitives/Link';
import RankingTable, { RankingTableColumn } from 'src/components/RankingTable';
import ChangeRate from '../components/ChangeRate';
import { NoData } from '../components/common';
import { useDeFiRankingContext, useRankingPaginationContext } from '../context';

type DataRow = {
  id: string;
  rank: number;
  dapp: {
    name: string;
    imgUrl: string;
  };
  category: string;
  chains: string[];
  tvl: number;
  tvlChangeRate: number;
  users: number;
  txn: number;
};

const columnConfigs: RankingTableColumn<keyof DataRow, DataRow>[] = [
  { title: 'Rank', name: 'rank', cellProps: { width: 80, align: 'center' } },
  {
    title: 'DApp',
    name: 'dapp',
    sticky: true,
    cellProps: { sx: { fontWeight: 600 } },
    headProps: { sx: { fontWeight: 500 } },
    render: (row) => (
      <Box
        component={Link}
        href={`/ranking/defi/${row.id}`}
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          color: 'inherit',
          '&:hover': {
            color: 'primary.main',
          },
        }}
      >
        <Avatar src={row['dapp'].imgUrl} alt={row['dapp'].name} sx={{ width: 28, height: 28, mr: 1.5 }} />
        {row['dapp'].name}
      </Box>
    ),
  },
  {
    title: 'Category',
    name: 'category',
    render: (row) => {
      return row['category'] ?? <NoData />;
    },
  },
  {
    title: 'Chains',
    name: 'chains',
    render: (row) => {
      return (
        <AvatarGroup max={4} sx={{ display: 'inline-flex' }}>
          {row['chains'].map((chain) => {
            return (
              <Avatar
                key={chain}
                src={`/images/chains/${Number(chain)}.png`}
                alt={chain}
                sx={{ width: 30, height: 30 }}
              >
                ?
              </Avatar>
            );
          })}
        </AvatarGroup>
      );
    },
  },
  {
    title: 'TVL',
    name: 'tvl',
    sortable: true,
    cellProps: { align: 'right' },
    render: (row) => {
      return isNumeric(row['tvl']) ? '$' + compactNumber(row['tvl']) : <NoData />;
    },
  },
  {
    title: 'TVL Change',
    name: 'tvlChangeRate',
    sortable: true,
    cellProps: { align: 'right' },
    render: (row) => {
      return <ChangeRate rate={row['tvlChangeRate']} />;
    },
  },
  {
    title: 'Users',
    name: 'users',
    sortable: true,
    cellProps: { align: 'right' },
    render: (row) => {
      return formatNumber(row['users'], { fallback: <NoData /> });
    },
  },
  {
    title: 'TXN',
    name: 'txn',
    sortable: true,
    cellProps: { align: 'right', sx: { pr: 4 } },
    render: (row) => {
      return formatNumber(row['txn'], { fallback: <NoData /> });
    },
  },
];

export default function RankingTableDetail() {
  const { data } = useDeFiRankingContext();
  const { page, pageSize } = useRankingPaginationContext();

  const tableData = useMemo<DataRow[]>(() => {
    return data.docs.map((item, idx) => ({
      id: item.id,
      rank: (page - 1) * pageSize + idx + 1,
      dapp: {
        name: item.name,
        imgUrl: item.imgUrl,
      },
      category: item.category,
      chains: item.chains,
      tvl: item.tvl,
      tvlChangeRate: item.tvlChangeRate * 100,
      users: item.numberOfUsers,
      txn: item.numberOfTransactions,
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
          users: 'numberOfUsers',
          txn: 'numberOfTransactions',
          tvl: 'tvl',
        }}
      />
    </Paper>
  );
}
