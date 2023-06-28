import {
  Avatar,
  Box,
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

import { Link } from 'src/components/primitives/Link';
import { useDashboardTokenTransfers } from 'src/contexts/dashboard';
import { utcFormat } from '../../utils';
import { getEntityUrl } from 'src/utils';
import { chainSelectConfigs } from 'src/configs/networkConfig';

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

export default function TransfersTable() {
  const { data } = useDashboardTokenTransfers();
  return (
    <Box sx={{ mx: -3 }}>
      <TableContainer>
        <Table>
          <TableHead>
            <StyledTableRow>
              <TableCell>Chain</TableCell>
              <TableCell>Tx Hash</TableCell>
              <TableCell>Timestamp</TableCell>
              <TableCell>From</TableCell>
              <TableCell>To</TableCell>
              <TableCell>Value</TableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {data.transfers.map((transfer) => (
              <StyledTableRow
                key={transfer.id}
                sx={{
                  '&:not(:first-of-type)': {
                    borderTop: '1px solid',
                    borderColor: 'common.border',
                  },
                }}
              >
                <TableCell>
                  <Tooltip title={transfer.token.name}>
                    <Avatar
                      sx={{ width: 28, height: 28 }}
                      src={chainSelectConfigs[transfer.chain].img}
                      alt={chainSelectConfigs[transfer.chain].name}
                    />
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Link
                    variant="body1"
                    href={`/tx/${transfer.id}`}
                    className="text-truncate"
                    maxWidth={130}
                    display="block"
                    underline="hover"
                  >
                    {transfer.transactionHash}
                  </Link>
                </TableCell>
                <TableCell>
                  <Tooltip title={utcFormat(transfer.timestamp * 1000)}>
                    <Typography>{moment(transfer.timestamp * 1000).fromNow()}</Typography>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Link variant="body1" underline="hover" href={getEntityUrl(transfer.from)}>
                    {formatAddress(transfer.fromAddress)}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link variant="body1" underline="hover" href={getEntityUrl(transfer.to)}>
                    {formatAddress(transfer.toAddress)}
                  </Link>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={500}>{formatNumber(transfer.value, { fractionDigits: 6 })}</Typography>
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
