import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { compactNumber, formatAddress, formatNumber } from '@travalendingpool/utils';
import { StyledTableRow } from '../../shared/table';
import { ApiTokenHolderType } from 'src/services/_old/dashboard-api/data-types';
import { useMemo } from 'react';
import { CheckIcon } from 'src/icons';
import { useDashboardTokenHolders } from 'src/contexts/dashboard';
import { Link } from 'src/components/primitives/Link';
import { getEntityUrl } from 'src/utils';

export default function TokenTable() {
  const numShow = 25;
  const { data } = useDashboardTokenHolders();
  const sortedData = useMemo(() => {
    return data.holders
      .sort((a: ApiTokenHolderType, b: ApiTokenHolderType) => {
        return b.estimatedBalance - a.estimatedBalance;
      })
      .slice(0, numShow);
  }, [data]);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <StyledTableRow>
            <TableCell>#</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Value</TableCell>
            <TableCell>Percentage</TableCell>
            <TableCell>Contract</TableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {sortedData?.map((holder, index: number) => (
            <StyledTableRow
              key={holder.id}
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
                  <Link variant="body1" underline="hover" href={getEntityUrl(holder)}>
                    {formatAddress(holder.address)}
                  </Link>
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="body1"
                  className="text-truncate"
                  sx={{ textTransform: 'capitalize', maxWidth: 120 }}
                >
                  {compactNumber(holder.estimatedBalance)}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="body1"
                  className="text-truncate"
                  sx={{ textTransform: 'capitalize', maxWidth: 120 }}
                >
                  {`$${formatNumber(holder.value)}`}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="body1"
                  className="text-truncate"
                  sx={{ textTransform: 'capitalize', maxWidth: 120 }}
                  color="primary"
                >
                  {`${formatNumber(holder.percentage, { fractionDigits: 2 })}%`}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="body1"
                  className="text-truncate"
                  sx={{ textTransform: 'capitalize', maxWidth: 120 }}
                >
                  {holder.type === 'contract' ? <CheckIcon /> : ''}
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
  );
}
