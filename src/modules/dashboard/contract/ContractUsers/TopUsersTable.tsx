import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { formatAddress, formatNumber } from '@travalendingpool/utils';
import moment from 'moment';
import { useMemo } from 'react';
import { Link } from 'src/components/primitives/Link';
import { useDashboardContractUsers } from 'src/contexts/dashboard';
import { StyledTableRow } from '../../shared/table';

export default function TopUsersTable() {
  const { data } = useDashboardContractUsers();

  const topUsers = useMemo(() => data.users.sort((a, b) => b.tvl - a.tvl).slice(0, 20), [data.users]);

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <StyledTableRow>
              <TableCell>#</TableCell>
              <TableCell>Address</TableCell>
              <TableCell align="right">TVL</TableCell>
              <TableCell align="right">Percentage</TableCell>
              <TableCell align="right">Last Active</TableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {topUsers.slice(0, 20).map((user, idx) => (
              <StyledTableRow
                key={user.id}
                sx={{
                  '&:not(:first-of-type)': {
                    borderTop: '1px solid',
                    borderColor: 'common.border',
                  },
                }}
              >
                <TableCell>{idx + 1}</TableCell>
                <TableCell>
                  <Link underline="hover" href={`/address/${user.address}`}>
                    {formatAddress(user.address)}
                  </Link>
                </TableCell>
                <TableCell align="right">{formatNumber(user.tvl, { fractionDigits: 2, prefix: '$' })}</TableCell>
                <TableCell align="right">{formatNumber(user.percentage, { fractionDigits: 2, suffix: '%' })}</TableCell>
                <TableCell align="right" sx={{ color: 'primary.main' }}>
                  {moment(user.lastActiveAt * 1000).fromNow()}
                </TableCell>
              </StyledTableRow>
            ))}
            {topUsers.length === 0 && (
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
    </>
  );
}
