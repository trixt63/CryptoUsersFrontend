import { Box, Grid } from '@mui/material';
import { useEffect } from 'react';
import { useAuthorization } from 'src/hooks/useAuthorization';
import { useAppDispatch, useAppSelector } from 'src/redux/hook';
import { fetchCreditScoreAndBalance } from 'src/redux/portfolio/assets-slice';
import { useWeb3React } from 'src/wagmi';
import NetworkAllocation from './Allocations/NetworkAllocation';
import TokenAllocation from './Allocations/TokenAllocation';
import BalanceAndCreditScore from './BalanceAndCreditScore';
import BalanceHistory from './BalanceHistory';
import { useFetchUserAssets } from './hooks';
import Tokens from './Tokens';

export default function Assets() {
  const dispatch = useAppDispatch();
  const { address } = useWeb3React();
  const { auth } = useAuthorization();
  const chain = useAppSelector((state) => state.portfolio.configSlice.chainId);

  useFetchUserAssets();

  useEffect(() => {
    if (address && chain && auth.authenticated) {
      dispatch(fetchCreditScoreAndBalance({ address, chain, history: true }));
    }
    // why address is not included in dependencies
    // bc: address changed => auth changed
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chain, auth.authenticated]);

  return (
    <Box mb={5}>
      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid item xs={12} sm={3}>
          <BalanceAndCreditScore />
        </Grid>
        <Grid item xs={12} sm={9}>
          <BalanceHistory />
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={{ mt: 0.5 }}>
        <Grid item xs={12} sm={6}>
          <TokenAllocation />
        </Grid>
        <Grid item xs={12} sm={6}>
          <NetworkAllocation />
        </Grid>
      </Grid>
      <Box sx={{ my: 2.5 }}>
        <Tokens />
      </Box>
    </Box>
  );
}
