import {
  Avatar,
  Box,
  Link,
  Paper,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { formatAddress, formatNumber } from '@travalendingpool/utils';
import Empty from 'src/components/Empty';
import { useDashboardTransactionTransfers } from 'src/contexts/dashboard';
import TransactionLayout from './TransactionLayout';

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  '.MuiTableCell-head': {
    backgroundColor: '#0E1D27',
    // padding: theme.spacing(1.5, 2),
    color: theme.palette.text.secondary,
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: theme.spacing(1.5, 2),
  fontSize: '1rem',
}));

const tableHeadConfigs = [
  { name: 'From', firstCell: true },
  { name: 'To', firstCell: false },
  { name: 'Quantity', firstCell: false },
  { name: 'Token', firstCell: false },
];

export default function TransfersTransaction() {
  const { data, transactionHash, explorerUrl, chain } = useDashboardTransactionTransfers();

  return (
    <TransactionLayout
      header={{
        name: 'Transaction',
        value: `#${formatAddress(transactionHash)}`,
        valueCopy: String(transactionHash),
        externalLink: explorerUrl,
        chains: [chain],
      }}
    >
      <Paper sx={{ p: 3 }}>
        <Typography sx={{ fontWeight: 500, color: 'secondary.main' }}>Tokens Transferred</Typography>
        <Box sx={{ mx: -3 }}>
          <TableContainer sx={{ mt: 2 }}>
            <Table>
              <StyledTableHead>
                <TableRow>
                  {tableHeadConfigs.map((item) => (
                    <StyledTableCell key={item.name} sx={{ pl: item.firstCell ? 3 : 2 }}>
                      {item.name}
                    </StyledTableCell>
                  ))}
                </TableRow>
              </StyledTableHead>
              {data.transfers.length > 0 && (
                <TableBody>
                  {data.transfers.map((item, index) => (
                    <TableRow key={index}>
                      <StyledTableCell sx={{ color: 'primary.main', pl: 3 }}>
                        <Link href={`/wallet/${item.fromAddress}`} underline="hover">
                          {formatAddress(item.fromAddress)}
                        </Link>
                      </StyledTableCell>
                      <StyledTableCell sx={{ color: 'primary.main' }}>
                        <Link href={`/wallet/${item.toAddress}`} underline="hover">
                          {formatAddress(item.toAddress)}
                        </Link>
                      </StyledTableCell>
                      <StyledTableCell>{formatNumber(item.value, { fractionDigits: 2 })}</StyledTableCell>
                      <StyledTableCell>
                        <Stack direction="row" spacing={1}>
                          <Avatar sx={{ width: 20, height: 20 }} src={item.token.imgUrl} alt={item.token.name} />
                          <Typography sx={{ ml: 0.5, fontWeight: 500 }}>
                            {item.token.name} <Typography component="span">({item.token.symbol})</Typography>
                          </Typography>
                        </Stack>
                      </StyledTableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>
            {data.transfers.length == 0 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Empty />
              </Box>
            )}
          </TableContainer>
        </Box>
      </Paper>
    </TransactionLayout>
  );
}
