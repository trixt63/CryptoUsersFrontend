import { Container } from '@mui/system';
import { Box, Button, Grid, Paper, Theme, Typography, useMediaQuery } from '@mui/material';
import ApplicationsTabs from './ApplicationsTabs';
import BasicTable from "src/modules/home-v2/introduction/BasicTable";

export default function Introduction() {
  // const { intro } = useHomeContext();
  // const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  // const { statistic } = useHomeContext();

  return (
    <Box component="section" sx={{ py: 10 }}>
      <Container>
        <BasicTable />
        {/*<RankingBanner />*/}
        <Box sx={{ mt: 4 }}>
          <ApplicationsTabs />
        </Box>
      </Container>
    </Box>
  );
}
