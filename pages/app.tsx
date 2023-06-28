import { Box, Grid } from '@mui/material';
import Highcharts from 'highcharts';
import heatmapInit from 'highcharts/modules/heatmap';
import treemapInit from 'highcharts/modules/treemap';
import Head from 'next/head';
import { useEffect } from 'react';
import Header from 'src/components/Header';
import CryptoHeatMap from 'src/modules/app-center/CryptoHeatMap';
import LatestTransaction from 'src/modules/app-center/LatestTransaction';
import MostVisitedContract from 'src/modules/app-center/MostVisitedContract';
import TopTokens from 'src/modules/app-center/TopTokens';
import TransactionDappHistory from 'src/modules/app-center/TransactionDappHistory';
import { fetchAll } from 'src/redux/app-center';
import { useAppDispatch } from 'src/redux/hook';
// import exportingInit from 'highcharts/modules/exporting';
//
import 'react-datepicker/dist/react-datepicker.css';

if (typeof Highcharts === 'object') {
  // exportingInit(Highcharts);
  heatmapInit(Highcharts);
  treemapInit(Highcharts);
}

export default function AppCenter() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAll({ chainId: '0x38' }));
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>Explorer - Blockchain Tracker And More</title>
      </Head>
      <Header />
      <Box sx={{ px: { xs: 2, xsm: 4 }, position: 'relative', pb: 3, pt: 3 }}>
        <Grid
          container
          columnSpacing={4}
          rowSpacing={4}
          sx={{
            '.MuiGrid-item': {
              '> div': {
                height: '100%',
              },
            },
          }}
        >
          <Grid item xs={12} sm={6}>
            <CryptoHeatMap />
          </Grid>
          <Grid item xs={12} sm={6}>
            <LatestTransaction />
          </Grid>
          <Grid item xs={12}>
            <TransactionDappHistory />
          </Grid>
          <Grid item xs={12} sm={6}>
            <MostVisitedContract />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TopTokens />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

// export async function getServerSideProps() {
// const a = await fetch(`${API_ROOT}/home/transaction-dapp-history?chain_id=${0x38}&limit=${10}`);
// console.log(a);
// return {
//   props: {},
// };
// }
