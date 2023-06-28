import { Container } from '@mui/system';
import TokenChain from './TokenChain';
import { compactNumber } from '@travalendingpool/utils';
import { Box, Button, Grid, Paper, Theme, Typography, useMediaQuery } from '@mui/material';
import IntroBgImg from 'public/images/intro_bg.png';
import { useHomeContext } from '../context';
import ApplicationsTabs from './ApplicationsTabs';
import RankingTabs from "src/modules/home-v2/ranking/RankingTabs";


export default function Introduction() {
  // const { intro } = useHomeContext();
  // const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  const { statistic } = useHomeContext();

  return (
    <Box component="section" sx={{ py: 10 }}>
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} md={5}>
            <Typography variant="h1" component="h2" color="secondary.main" mb={2}>
              RANKING
            </Typography>
            <Typography>Explore the whole blockchain world with our all-in-one ranking platform.</Typography>
          </Grid>
          <Grid item xs={12} md={7}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <Paper sx={{ p: 4 }}>
                  <Typography
                    color="primary.main"
                    variant="h1"
                    component="p"
                    sx={{ textTransform: 'lowercase', fontWeight: 700 }}
                  >
                    {compactNumber(statistic.numberOfDApps)}
                  </Typography>
                  <Typography>DApps</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Paper sx={{ p: 4 }}>
                  <Typography
                    color="primary.main"
                    variant="h1"
                    component="p"
                    sx={{ textTransform: 'lowercase', fontWeight: 700 }}
                  >
                    {compactNumber(statistic.numberOfContracts)}
                  </Typography>
                  <Typography>Contracts</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Paper sx={{ p: 4 }}>
                  <Typography
                    color="primary.main"
                    variant="h1"
                    component="p"
                    sx={{ textTransform: 'lowercase', fontWeight: 700 }}
                  >
                    {compactNumber(statistic.numberOfProtocols)}
                  </Typography>
                  <Typography>Protocols</Typography>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box sx={{ mt: 4 }}>
          <ApplicationsTabs />
        </Box>
      </Container>
    </Box>
  );
}
