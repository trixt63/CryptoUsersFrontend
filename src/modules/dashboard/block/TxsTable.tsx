import {
  Box,
  Pagination,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import { formatAddress, formatNumber } from '@travalendingpool/utils';
import moment from 'moment';
import { useMemo, useState } from 'react';
import { Link } from 'src/components/primitives/Link';
import { useDashboardBlockTransactions } from 'src/contexts/dashboard';
import { utcFormat } from '../utils';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  th: {
    padding: theme.spacing(2, 1.5),
    backgroundColor: theme.palette.background.primary,
    color: theme.palette.text.secondary,
  },
  td: {
    padding: theme.spacing(2, 1.5),
  },
  'th, td': {
    '&:first-of-type': {
      paddingLeft: theme.spacing(5),
    },
    '&:last-of-type': {
      paddingRight: theme.spacing(5),
    },
  },
  '&:hover': {
    td: {
      backgroundColor: theme.palette.background.secondary,
    },
  },
}));

export default function TxsTable() {
  const { data } = useDashboardBlockTransactions();

  const [page, setPage] = useState(1);
  const [pageSize] = useState(25);
  const pageCount = Math.ceil(data.transactions.length / pageSize);

  const from = (page - 1) * pageSize;
  const to = page * pageSize;

  const showTxs = useMemo(() => {
    return data.transactions.slice(from, to);
  }, [data.transactions, from, to]);

  return (
    <Box sx={{ mx: -3 }}>
      <TableContainer>
        <Table>
          <TableHead>
            <StyledTableRow>
              <TableCell>Tx Hash</TableCell>
              <TableCell>Method</TableCell>
              <TableCell>Timestamp</TableCell>
              <TableCell>From</TableCell>
              <TableCell>To</TableCell>
              <TableCell>Value</TableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {showTxs.map((tx) => (
              <StyledTableRow
                key={tx.id}
                sx={{
                  '&:not(:first-of-type)': {
                    borderTop: '1px solid',
                    borderColor: 'common.border',
                  },
                }}
              >
                <TableCell>
                  <Link
                    variant="body1"
                    href={`/tx/${tx.id}`}
                    className="text-truncate"
                    maxWidth={130}
                    display="block"
                    underline="hover"
                  >
                    {tx.hash}
                  </Link>
                </TableCell>
                <TableCell>
                  <Tooltip title={<span style={{ textTransform: 'capitalize' }}>{tx.method}</span>}>
                    <Typography className="text-truncate" sx={{ textTransform: 'capitalize', maxWidth: 120 }}>
                      {tx.method}
                    </Typography>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Tooltip title={utcFormat(tx.timestamp * 1000)}>
                    <Typography>{moment(tx.timestamp * 1000).fromNow()}</Typography>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Link variant="body1" underline="hover" href={`/wallet/${tx.fromAddress}`}>
                    {formatAddress(tx.fromAddress)}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link variant="body1" underline="hover" href={`/wallet/${tx.fromAddress}`}>
                    {formatAddress(tx.toAddress)}
                  </Link>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={500}>{formatNumber(tx.value, { fractionDigits: 6 })} BNB</Typography>
                </TableCell>
              </StyledTableRow>
            ))}
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
          {from + 1}-{to} of {data.transactions.length}
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
    </Box>
  );
}
