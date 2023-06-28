import { Box } from '@mui/material';
import RankingPagination from '../components/RankingPagination';
// import TimeSelect from '../components/TimeSelect';
import RankingTableDetail from './RankingTableDetail';

export default function Derivatives() {
  return (
    <>
      <Box sx={{ py: 2, display: 'flex', justifyContent: 'flex-end', '>:not(:last-of-type)': { mr: 2 } }} />
      {/* <TimeSelect /> */}
      <RankingTableDetail />
      <RankingPagination />
    </>
  );
}
