import { Box } from '@mui/material';
import RankingPagination from '../components/RankingPagination';
// import TimeSelect from '../components/TimeSelect';
import RankingTableDetail from './RankingTableDetail';

export default function Tokens() {
  return (
    <>
      <Box sx={{ py: 2 }} />
      {/* <TimeSelect /> */}
      <RankingTableDetail />
      <RankingPagination />
    </>
  );
}
