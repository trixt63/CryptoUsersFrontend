import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { formatNumber } from '@travalendingpool/utils';
import { useMemo } from 'react';
import { useDashboardTokenExchanges } from 'src/contexts/dashboard';
import { StyledTableRow } from '../../shared/table';
import { Link } from 'src/components/primitives/Link';
import { getEntityUrl } from 'src/utils';

type exchangeDataType = {
  name: string;
  id: string;
  price: number;
  tradingVolume: number;
  type: string;
  projectType: string;
  isDex: boolean;
  pair: string;
};
export default function TokenExchange() {
  const { data } = useDashboardTokenExchanges();
  const sortedData = useMemo(() => {
    return data.exchanges.sort((a: exchangeDataType, b: exchangeDataType) => {
      return b.tradingVolume - a.tradingVolume;
    });
  }, [data.exchanges]);
  return (
    <Paper variant="border" sx={{ p: 3 }}>
      <Typography>Exchanges in the last 24h</Typography>
      <Box sx={{ mx: -3 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <StyledTableRow>
                <TableCell>#</TableCell>
                <TableCell>Exchange</TableCell>
                <TableCell>Pair</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Trading Volume</TableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {sortedData?.map((exchange, index: number) => (
                <StyledTableRow
                  key={exchange.id}
                  sx={{
                    '&:not(:first-of-type)': {
                      borderTop: '1px solid',
                      borderColor: 'common.border',
                    },
                  }}
                >
                  <TableCell>
                    <Typography
                      variant="body1"
                      className="text-truncate"
                      sx={{ textTransform: 'capitalize', maxWidth: 120 }}
                    >
                      {index}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      className="text-truncate"
                      sx={{ textTransform: 'capitalize', maxWidth: 120 }}
                      color="primary"
                    >
                      <Link variant="body1" underline="hover" href={getEntityUrl(exchange)}>
                        {exchange.name}
                      </Link>
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      className="text-truncate"
                      sx={{ textTransform: 'capitalize', maxWidth: 120 }}
                    >
                      {exchange.pair}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      className="text-truncate"
                      sx={{ textTransform: 'capitalize', maxWidth: 120 }}
                    >
                      {`$${formatNumber(exchange.price)}`}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      className="text-truncate"
                      sx={{ textTransform: 'capitalize', maxWidth: 120 }}
                      color="primary"
                    >
                      {`${formatNumber(exchange.tradingVolume)}`}
                    </Typography>
                  </TableCell>
                </StyledTableRow>
              ))}
              {sortedData.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7}>
                    <Typography variant="body1" color="text.secondary" align="center">
                      No data
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Paper>
  );
}
