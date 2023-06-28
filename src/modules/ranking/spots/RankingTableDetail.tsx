import { Avatar, Box, Paper, Typography } from '@mui/material';
import { formatNumber } from '@travalendingpool/utils';
import { useMemo } from 'react';
import { Link } from 'src/components/primitives/Link';
import RankingTable, { RankingTableColumn } from 'src/components/RankingTable';
import ChangeRate from '../components/ChangeRate';
import { NoData } from '../components/common';
import { useRankingPaginationContext, useSpotsRankingContext } from '../context';

type DataRow = {
  id: string;
  rank: number;
  exchange: {
    name: string;
    imgUrl: string;
  };
  volume: number;
  volumeChangeRate: number;
  avgLiquidity: number;
  market: number;
  coin: number;
  fiat?: string[] | null;
  graph: string;
  isUp: boolean;
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
    title: 'Avg. Liquidity',
    name: 'avgLiquidity',
    sortable: true,
    cellProps: { align: 'right' },
    render: (row) => {
      return formatNumber(row['avgLiquidity'], { prefix: '$', fallback: <NoData /> });
    },
  },
  {
    title: 'Markets',
    name: 'market',
    sortable: true,
    cellProps: { align: 'right' },
    render: (row) => {
      return formatNumber(row['market'], { fallback: <NoData /> });
    },
  },
  {
    title: 'Coins',
    name: 'coin',
    sortable: true,
    cellProps: { align: 'right' },
    render: (row) => {
      return formatNumber(row['coin'], { fallback: <NoData /> });
    },
  },
  {
    title: 'Fiat Currencies Supported',
    name: 'fiat',
    cellProps: { align: 'left', sx: { pl: 4 } },
    render: (row) => {
      const fiat = row['fiat'];
      if (!fiat) return <NoData />;
      return (
        <>
          <Typography variant="small">
            <b>{fiat.slice(0, 3).join(', ')}</b>
          </Typography>
          {fiat.length > 3 && (
            <Typography variant="small" color="text.secondary">
              and +{fiat.length - 3} more
            </Typography>
          )}
        </>
      );
    },
  },
  {
    title: 'Volume Graph',
    name: 'graph',
    cellProps: { align: 'right', width: 200 },
    render: (row) => {
      return (
        row['graph'] && (
          <img
            style={{
              filter: row['isUp']
                ? 'hue-rotate(85deg) saturate(80%) brightness(0.85)'
                : 'hue-rotate(300deg) saturate(210%) brightness(0.7) contrast(170%)',
            }}
            src={row['graph']}
            alt={row['exchange'].name + ' volume history'}
            width={'100%'}
          />
        )
      );
    },
  },
];

export default function RankingTableDetail() {
  const { data } = useSpotsRankingContext();
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
      avgLiquidity: item.avgLiquidity,
      market: item.numberOfMarkets,
      coin: item.numberOfCoins,
      fiat: item.fiatSupported,
      graph: item.volumeHistoryGraph,
      isUp: item.volumeHistoryGraphIsUp,
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
          market: 'numberOfMarkets',
          coin: 'numberOfCoins',
        }}
      />
    </Paper>
  );
}
