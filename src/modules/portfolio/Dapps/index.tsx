import { Box, Grid } from '@mui/material';
import Allocations from './Allocations';
import TotalValueLockedAndAPR from './TotalValueLockedAndAPR';
import { useFetchDApps } from './hook';
import DAppsList from './DappsList';

export default function Dapps() {
  useFetchDApps();
  return (
    <Box sx={{ width: '100%' }}>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12} md={3}>
          <TotalValueLockedAndAPR />
        </Grid>
        <Grid item xs={12} md={9}>
          <Allocations />
        </Grid>
      </Grid>
      <Box sx={{ my: 2.5 }}>
        <DAppsList />
      </Box>
    </Box>
  );
}
