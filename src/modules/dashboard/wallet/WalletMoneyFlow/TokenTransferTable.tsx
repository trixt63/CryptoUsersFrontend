import {
  Box,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { formatNumber } from '@travalendingpool/utils';
import { useMemo, useState } from 'react';
import { Link } from 'src/components/primitives/Link';
import { useDashboardWalletMoneyFlow } from 'src/contexts/dashboard';
import { StyledTableRow } from '../../shared/table';

export default function TokenTransferTable() {
  const { data } = useDashboardWalletMoneyFlow();

  const [page, setPage] = useState(1);
  const [pageSize] = useState(25);
  const pageCount = Math.ceil(data.tokens.length / pageSize);

  const from = (page - 1) * pageSize;
  const to = page * pageSize;

  const dataShow = useMemo(() => {
    return data.tokens.slice(from, to);
  }, [data.tokens, from, to]);

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <StyledTableRow>
              <TableCell>#</TableCell>
              <TableCell>Token</TableCell>
              <TableCell>In</TableCell>
              <TableCell>Out</TableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {dataShow.map((item, idx) => (
              <StyledTableRow key={item.id}>
                <TableCell>{(page - 1) * pageSize + idx + 1}</TableCell>
                <TableCell>
                  <Link variant="body1" href={`/token/${item.id}`} underline="hover">
                    {item.name} ({item.symbol.toUpperCase()})
                  </Link>
                </TableCell>
                <TableCell>
                  {formatNumber(item.input.amount)} {item.symbol.toUpperCase()}&nbsp;&nbsp;
                  <Typography component="span" color="text.secondary" variant="body2">
                    {formatNumber(item.input.valueInUSD, { fractionDigits: 4, prefix: '$' })}
                  </Typography>
                </TableCell>
                <TableCell>
                  {formatNumber(item.output.amount)} {item.symbol.toUpperCase()}&nbsp;&nbsp;
                  <Typography component="span" color="text.secondary" variant="body2">
                    {formatNumber(item.output.valueInUSD, { fractionDigits: 4, prefix: '$' })}
                  </Typography>
                </TableCell>
              </StyledTableRow>
            ))}
            {data.tokens.length === 0 && (
              <TableRow>
                <TableCell colSpan={4}>
                  <Typography variant="body1" color="text.secondary" align="center">
                    No data
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', xsm: 'row' },
          justifyContent: { xs: 'center', xsm: 'flex-end' },
          pt: 4,
          px: 3,
          alignItems: 'center',
        }}
      >
        <Typography color="text.secondary" sx={{ mb: { xs: 2, xsm: 0 }, mr: { xsm: 2 } }}>
          {from + 1}-{to} of {data.tokens.length}
        </Typography>
        <Pagination
          variant="text"
          shape="rounded"
          page={page}
          count={pageCount}
          onChange={(_, page) => {
            setPage(page);
          }}
          showFirstButton
          showLastButton
          size="small"
          color="primary"
          siblingCount={0}
          boundaryCount={0}
          // sx={{
          //   '.MuiPaginationItem-root': {
          //     // color: 'text.secondary',
          //     '&.Mui-selected': {
          //       backgroundColor: '#183A52',
          //     },
          //   },
          // }}
        />
      </Box>
    </>
  );
}
