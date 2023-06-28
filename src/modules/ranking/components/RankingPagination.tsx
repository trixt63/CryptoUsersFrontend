import { Box, Pagination as MuiPagination } from '@mui/material';
import useSearchParams from 'src/hooks/useSearchParams';
import { useRankingPaginationContext } from '../context';

export default function RankingPagination() {
  const { page, pageSize, total } = useRankingPaginationContext();
  const { set } = useSearchParams();
  const count = Math.ceil(total / pageSize);
  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
      <MuiPagination
        page={Math.min(page, count)}
        count={count}
        onChange={(_, page) => {
          set('page', String(page));
        }}
        color="primary"
        // shape="rounded"
        // size="small"
      />
    </Box>
  );
}
