import { Avatar, Box, Button, Paper } from '@mui/material';
import { compactNumber, formatNumber, isNumeric } from '@travalendingpool/utils';
import { useMemo } from 'react';
import { Link } from 'src/components/primitives/Link';
import RankingTable from 'src/components/RankingTable';
import { NoData } from 'src/modules/ranking/components/common';
import { useHomeContext } from '../context';

interface TableWrapperProps {
  children: React.ReactNode;
  explorePath: string;
}

function TableWrapper({ children, explorePath }: TableWrapperProps) {
  return (
    <Paper sx={{ overflow: 'hidden', border: '1px solid', borderColor: 'common.border' }}>
      {children}
      <Box sx={{ textAlign: 'right', pt: 1, pb: 2, px: 4 }}>
        <Button variant="contained" color="primary" sx={{ width: 120 }} href={explorePath}>
          Explore
        </Button>
      </Box>
    </Paper>
  );
}

export function TopCexesTable() {
  const { cexes } = useHomeContext();

  const tableData = useMemo(() => {
    return cexes.docs.map((item, idx) => ({
      id: item.id,
      rank: idx + 1,
      exchange: {
        name: item.name,
        imgUrl: item.imgUrl,
      },
      volume: item.spotVolume,
      users: item.numberOfUsers,
      realUsers: item.numberOfRealUsers,
    }));
  }, [cexes]);

  return (
    <TableWrapper explorePath="/homepage/cexes">
      <RankingTable
        tableProps={{
          'aria-label': 'Top Spot Exchanges',
        }}
        columns={[
          // { title: 'Rank', name: 'rank', cellProps: { width: 80, align: 'center' } },
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
                <Avatar
                  src={row['exchange'].imgUrl}
                  alt={row['exchange'].name}
                  sx={{ width: 28, height: 28, mr: 1.5 }}
                />
                {row['exchange'].name}
              </Box>
            ),
          },
          {
            title: 'Trading Volume',
            name: 'volume',
            cellProps: { align: 'right' },
            render: (row) => {
              return formatNumber(row['volume'], { prefix: '$', fractionDigits: 0, fallback: <NoData /> });
            },
          },
          {
            title: 'Users',
            name: 'users',
            cellProps: { align: 'right' },
            render: (row) => {
              return formatNumber(row['users'], { fallback: <NoData /> });
            },
          },
          {
            title: 'Real Users',
            name: 'realUsers',
            cellProps: { align: 'right' },
            render: (row) => {
              return formatNumber(row['realUsers'], { fallback: <NoData /> });
            },
          }
        ]}
        rows={tableData}
      />
    </TableWrapper>
  );
}

export function TopDexesTable() {
  const { dexes } = useHomeContext();

  const tableData = useMemo(() => {
    return dexes.docs.map((item, idx) => ({
      id: item.id,
      rank: idx + 1,
      dapp: {
        name: item.name,
        imgUrl: item.imgUrl,
      },
      category: item.category,
      tvl: item.tvl,
      users: item.numberOfUsers,
      realUsers: item.numberOfRealUsers,
    }));
  }, [dexes]);

  return (
    <TableWrapper explorePath="/ranking/defi">
      <RankingTable
        tableProps={{
          'aria-label': 'Top DeFi',
        }}
        columns={[
          // { title: 'Rank', name: 'rank', cellProps: { width: 80, align: 'center' } },
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
            title: 'TVL',
            name: 'tvl',
            cellProps: { align: 'right' },
            render: (row) => {
              return isNumeric(row['tvl']) ? '$' + compactNumber(row['tvl']) : <NoData />;
            },
          },
          {
            title: 'Users',
            name: 'users',
            cellProps: { align: 'right' },
            render: (row, key) => {
              return formatNumber(row[key], { fallback: <NoData /> });
            },
          },
          {
            title: 'Real Users',
            name: 'realUsers',
            cellProps: { align: 'right' },
            render: (row, key) => {
              return formatNumber(row[key], { fallback: <NoData /> });
            },
          },
          // {
          //   title: 'TXN',
          //   name: 'txn',
          //   cellProps: { align: 'right', sx: { pr: 4 } },
          //   render: (row, key) => {
          //     return formatNumber(row[key], { fallback: <NoData /> });
          //   },
          // },
        ]}
        rows={tableData}
      />
    </TableWrapper>
  );
}

export function TopLendingsTable() {
  const { lendings } = useHomeContext();

  const tableData = useMemo(() => {
    return lendings.docs.map((item, idx) => ({
      id: item.id,
      rank: idx + 1,
      dapp: {
        name: item.name,
        imgUrl: item.imgUrl,
      },
      category: item.category,
      tvl: item.tvl,
      users: item.numberOfUsers,
      realUsers: item.numberOfRealUsers,
    }));
  }, [lendings]);

  return (
    <TableWrapper explorePath="/ranking/defi">
      <RankingTable
        tableProps={{
          'aria-label': 'Top DeFi',
        }}
        columns={[
          // { title: 'Rank', name: 'rank', cellProps: { width: 80, align: 'center' } },
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
            title: 'TVL',
            name: 'tvl',
            cellProps: { align: 'right' },
            render: (row) => {
              return isNumeric(row['tvl']) ? '$' + compactNumber(row['tvl']) : <NoData />;
            },
          },
          {
            title: 'Users',
            name: 'users',
            cellProps: { align: 'right' },
            render: (row, key) => {
              return formatNumber(row[key], { fallback: <NoData /> });
            },
          },
          {
            title: 'Real Users',
            name: 'realUsers',
            cellProps: { align: 'right' },
            render: (row, key) => {
              return formatNumber(row[key], { fallback: <NoData /> });
            },
          },
        ]}
        rows={tableData}
      />
    </TableWrapper>
  );
}

// export function TopDeFiTable() {
//   const { defi } = useHomeContext();
//
//   const tableData = useMemo(() => {
//     return defi.docs.map((item, idx) => ({
//       id: item.id,
//       rank: idx + 1,
//       dapp: {
//         name: item.name,
//         imgUrl: item.imgUrl,
//       },
//       category: item.category,
//       tvl: item.tvl,
//       users: item.numberOfUsers,
//       txn: item.numberOfTransactions,
//     }));
//   }, [defi]);
//
//   return (
//     <TableWrapper explorePath="/ranking/defi">
//       <RankingTable
//         tableProps={{
//           'aria-label': 'Top DeFi',
//         }}
//         columns={[
//           { title: 'Rank', name: 'rank', cellProps: { width: 80, align: 'center' } },
//           {
//             title: 'DApp',
//             name: 'dapp',
//             sticky: true,
//             cellProps: { sx: { fontWeight: 600 } },
//             headProps: { sx: { fontWeight: 500 } },
//             render: (row) => (
//               <Box
//                 component={Link}
//                 href={`/ranking/defi/${row.id}`}
//                 sx={{
//                   display: 'inline-flex',
//                   alignItems: 'center',
//                   color: 'inherit',
//                   '&:hover': {
//                     color: 'primary.main',
//                   },
//                 }}
//               >
//                 <Avatar src={row['dapp'].imgUrl} alt={row['dapp'].name} sx={{ width: 28, height: 28, mr: 1.5 }} />
//                 {row['dapp'].name}
//               </Box>
//             ),
//           },
//           {
//             title: 'Category',
//             name: 'category',
//             render: (row) => {
//               return row['category'] ?? <NoData />;
//             },
//           },
//           {
//             title: 'TVL',
//             name: 'tvl',
//             cellProps: { align: 'right' },
//             render: (row) => {
//               return isNumeric(row['tvl']) ? '$' + compactNumber(row['tvl']) : <NoData />;
//             },
//           },
//           {
//             title: 'Users',
//             name: 'users',
//             cellProps: { align: 'right' },
//             render: (row, key) => {
//               return formatNumber(row[key], { fallback: <NoData /> });
//             },
//           },
//           {
//             title: 'TXN',
//             name: 'txn',
//             cellProps: { align: 'right', sx: { pr: 4 } },
//             render: (row, key) => {
//               return formatNumber(row[key], { fallback: <NoData /> });
//             },
//           },
//         ]}
//         rows={tableData}
//       />
//     </TableWrapper>
//   );
// }


// export function TopNFTsTable() {
//   const { nfts } = useHomeContext();
//
//   const tableData = useMemo(() => {
//     return nfts.docs.map((item, idx) => ({
//       id: item.id,
//       rank: idx + 1,
//       collection: {
//         name: item.name,
//         imgUrl: item.imgUrl,
//       },
//       volume: {
//         value: item.volume,
//         changeRate: item.volumeChangeRate * 100,
//       },
//       price: {
//         value: item.price,
//         changeRate: item.priceChangeRate,
//       },
//       owner: item.numberOfOwners,
//       items: item.numberOfItems,
//     }));
//   }, [nfts]);
//
//   return (
//     <TableWrapper explorePath="/ranking/nfts">
//       <RankingTable
//         tableProps={{
//           'aria-label': 'Top NFTs',
//         }}
//         columns={[
//           { title: 'Rank', name: 'rank', cellProps: { width: 80, align: 'center' } },
//           {
//             title: 'Collection',
//             name: 'collection',
//             sticky: true,
//             cellProps: { sx: { fontWeight: 600 } },
//             headProps: { sx: { fontWeight: 500 } },
//             render: (row) => (
//               <Box
//                 component={Link}
//                 href={`/ranking/nfts/${row.id}`}
//                 sx={{
//                   display: 'inline-flex',
//                   alignItems: 'center',
//                   color: 'inherit',
//                   '&:hover': {
//                     color: 'primary.main',
//                   },
//                 }}
//               >
//                 <Avatar
//                   src={row['collection'].imgUrl}
//                   alt={row['collection'].name}
//                   sx={{ width: 28, height: 28, mr: 1.5 }}
//                 />
//                 {row['collection'].name}
//               </Box>
//             ),
//           },
//           {
//             title: 'Volume',
//             name: 'volume',
//             cellProps: { align: 'right' },
//             render: (row) => {
//               return formatNumber(row['volume'].value, { prefix: '$', fractionDigits: 0, fallback: <NoData /> });
//             },
//           },
//           {
//             title: 'Price',
//             name: 'price',
//             cellProps: { align: 'right' },
//             render: (row) => {
//               return formatNumber(row['price'].value, { prefix: '$', fractionDigits: 4, fallback: <NoData /> });
//             },
//           },
//           {
//             title: 'Owner',
//             name: 'owner',
//             cellProps: { align: 'right' },
//             render: (row) => {
//               return formatNumber(row['owner'], { fallback: <NoData /> });
//             },
//           },
//           {
//             title: 'Items',
//             name: 'items',
//             cellProps: { align: 'right', sx: { pr: 4 } },
//             render: (row) => {
//               return formatNumber(row['items'], { fallback: <NoData /> });
//             },
//           },
//         ]}
//         rows={tableData}
//       />
//     </TableWrapper>
//   );
// }
//
// export function TopTokensTable() {
//   const { tokens } = useHomeContext();
//
//   const tableData = useMemo(() => {
//     return tokens.docs.map((item, idx) => ({
//       id: item.id,
//       rank: idx + 1,
//       token: {
//         id: item.id,
//         name: item.name,
//         imgUrl: item.imgUrl,
//       },
//       score: item.tokenHealth,
//       volume: item.volume,
//       marketCap: item.marketCap,
//       price: {
//         value: item.price,
//         changeRate: item.priceChangeRate,
//       },
//       holder: item.numberOfHolders,
//     }));
//   }, [tokens]);
//
//   return (
//     <TableWrapper explorePath="/ranking/tokens">
//       <RankingTable
//         tableProps={{
//           'aria-label': 'Top Tokens',
//         }}
//         columns={[
//           { title: 'Rank', name: 'rank', cellProps: { width: 80, align: 'center' } },
//           {
//             title: 'Token',
//             name: 'token',
//             sticky: true,
//             cellProps: { sx: { fontWeight: 600 } },
//             headProps: { sx: { fontWeight: 500 } },
//             render: (row) => (
//               <Box
//                 component={Link}
//                 href={`/token/${row['token'].id}`}
//                 sx={{
//                   display: 'inline-flex',
//                   alignItems: 'center',
//                   color: 'inherit',
//                   '&:hover': {
//                     color: 'primary.main',
//                   },
//                 }}
//               >
//                 <Avatar src={row['token'].imgUrl} alt={row['token'].name} sx={{ width: 28, height: 28, mr: 1.5 }} />
//                 {row['token'].name}
//               </Box>
//             ),
//           },
//           {
//             title: 'Score',
//             name: 'score',
//             cellProps: { align: 'right' },
//             render: (row) => {
//               return formatNumber(row['score']);
//             },
//           },
//           {
//             title: 'Price',
//             name: 'price',
//             cellProps: { align: 'right' },
//             render: (row) => {
//               return formatNumber(row['price'].value, { prefix: '$', fractionDigits: 4, fallback: <NoData /> });
//             },
//           },
//           {
//             title: 'Market Cap',
//             name: 'marketCap',
//             cellProps: { align: 'right' },
//             render: (row) => {
//               return formatNumber(row['marketCap'], { prefix: '$', fractionDigits: 0, fallback: <NoData /> });
//             },
//           },
//           {
//             title: 'Volume',
//             name: 'volume',
//             sortable: true,
//             cellProps: { align: 'right' },
//             render: (row) => {
//               return formatNumber(row['volume'], { fractionDigits: 0, prefix: '$', fallback: <NoData /> });
//             },
//           },
//           {
//             title: 'Holder',
//             name: 'holder',
//             cellProps: { align: 'right', sx: { pr: 4 } },
//             render: (row) => {
//               return formatNumber(row['holder'], { fallback: <NoData /> });
//             },
//           },
//         ]}
//         rows={tableData}
//       />
//     </TableWrapper>
//   );
// }
//
// export function TopSpotTable() {
//   const { spots } = useHomeContext();
//
//   const tableData = useMemo(() => {
//     return spots.docs.map((item, idx) => ({
//       id: item.id,
//       rank: idx + 1,
//       exchange: {
//         name: item.name,
//         imgUrl: item.imgUrl,
//       },
//       volume: {
//         value: item.volume,
//         changeRate: item.volumeChangeRate * 100,
//       },
//       avgLiquidity: item.avgLiquidity,
//       market: item.numberOfMarkets,
//       coin: item.numberOfCoins,
//     }));
//   }, [spots]);
//
//   return (
//     <TableWrapper explorePath="/ranking/spots">
//       <RankingTable
//         tableProps={{
//           'aria-label': 'Top Spot Exchanges',
//         }}
//         columns={[
//           { title: 'Rank', name: 'rank', cellProps: { width: 80, align: 'center' } },
//           {
//             title: 'Exchange',
//             name: 'exchange',
//             sticky: true,
//             cellProps: { sx: { fontWeight: 600 } },
//             headProps: { sx: { fontWeight: 500 } },
//             render: (row) => (
//               <Box
//                 component={Link}
//                 href={`/ranking/exchanges/${row.id}`}
//                 sx={{
//                   display: 'inline-flex',
//                   alignItems: 'center',
//                   color: 'inherit',
//                   '&:hover': {
//                     color: 'primary.main',
//                   },
//                 }}
//               >
//                 <Avatar
//                   src={row['exchange'].imgUrl}
//                   alt={row['exchange'].name}
//                   sx={{ width: 28, height: 28, mr: 1.5 }}
//                 />
//                 {row['exchange'].name}
//               </Box>
//             ),
//           },
//           {
//             title: 'Trading Volume',
//             name: 'volume',
//             cellProps: { align: 'right' },
//             render: (row) => {
//               return formatNumber(row['volume'].value, { prefix: '$', fractionDigits: 0, fallback: <NoData /> });
//             },
//           },
//           {
//             title: 'Avg. Liquidity',
//             name: 'avgLiquidity',
//             cellProps: { align: 'right' },
//             render: (row) => {
//               return formatNumber(row['avgLiquidity'], { prefix: '$', fractionDigits: 2, fallback: <NoData /> });
//             },
//           },
//           {
//             title: 'Market',
//             name: 'market',
//             cellProps: { align: 'right' },
//             render: (row) => {
//               return formatNumber(row['market'], { fallback: <NoData /> });
//             },
//           },
//           {
//             title: 'Coin',
//             name: 'coin',
//             cellProps: { align: 'right', sx: { pr: 4 } },
//             render: (row) => {
//               return formatNumber(row['coin'], { fallback: <NoData /> });
//             },
//           },
//         ]}
//         rows={tableData}
//       />
//     </TableWrapper>
//   );
// }
//
// export function TopDerivativesTable() {
//   const { derivatives } = useHomeContext();
//
//   const tableData = useMemo(() => {
//     return derivatives.docs.map((item, idx) => ({
//       id: item.id,
//       rank: idx + 1,
//       exchange: {
//         name: item.name,
//         imgUrl: item.imgUrl,
//       },
//       volume: {
//         value: item.volume,
//         changeRate: item.volumeChangeRate * 100,
//       },
//       makerFees: item.makerFeesRate * 100,
//       takerFees: item.takerFeesRate * 100,
//       openInterests: item.openInterests,
//     }));
//   }, [derivatives]);
//
//   return (
//     <TableWrapper explorePath="/ranking/derivatives">
//       <RankingTable
//         tableProps={{
//           'aria-label': 'Top Derivative Exchange',
//         }}
//         columns={[
//           { title: 'Rank', name: 'rank', cellProps: { width: 80, align: 'center' } },
//           {
//             title: 'Exchange',
//             name: 'exchange',
//             sticky: true,
//             cellProps: { sx: { fontWeight: 600 } },
//             headProps: { sx: { fontWeight: 500 } },
//             render: (row) => (
//               <Box
//                 component={Link}
//                 href={`/ranking/exchanges/${row.id}`}
//                 sx={{
//                   display: 'inline-flex',
//                   alignItems: 'center',
//                   color: 'inherit',
//                   '&:hover': {
//                     color: 'primary.main',
//                   },
//                 }}
//               >
//                 <Avatar
//                   src={row['exchange'].imgUrl}
//                   alt={row['exchange'].name}
//                   sx={{ width: 28, height: 28, mr: 1.5 }}
//                 />
//                 {row['exchange'].name}
//               </Box>
//             ),
//           },
//           {
//             title: 'Trading Volume',
//             name: 'volume',
//             cellProps: { align: 'right' },
//             render: (row) => {
//               return formatNumber(row['volume'].value, { prefix: '$', fractionDigits: 0, fallback: <NoData /> });
//             },
//           },
//           {
//             title: 'Maker Fees',
//             name: 'makerFees',
//             cellProps: { align: 'right' },
//             render: (row) => {
//               return formatNumber(row['makerFees'], { suffix: '%', fractionDigits: 4, fallback: <NoData /> });
//             },
//           },
//           {
//             title: 'Taker Fees',
//             name: 'takerFees',
//             cellProps: { align: 'right' },
//             render: (row) => {
//               return formatNumber(row['takerFees'], { suffix: '%', fractionDigits: 4, fallback: <NoData /> });
//             },
//           },
//           {
//             title: 'Open Interests',
//             name: 'openInterests',
//             cellProps: { align: 'right', sx: { pr: 4 } },
//             render: (row) => {
//               return formatNumber(row['openInterests'], { fractionDigits: 2, prefix: '$', fallback: <NoData /> });
//             },
//           },
//         ]}
//         rows={tableData}
//       />
//     </TableWrapper>
//   );
// }
