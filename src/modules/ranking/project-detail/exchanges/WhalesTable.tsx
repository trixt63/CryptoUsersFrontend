import {
  Box,
  BoxProps,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { compactNumber, formatAddress, formatNumber } from '@travalendingpool/utils';
import { StyledTableRow } from 'src/modules/dashboard/shared/table';
import { ApiTokenHolderType } from 'src/services/_old/dashboard-api/data-types';
import { useMemo } from 'react';
import { CheckIcon } from 'src/icons';
import { useDashboardTokenHolders } from 'src/contexts/dashboard';
import { Link } from 'src/components/primitives/Link';
import { getEntityUrl } from 'src/utils';
import { fetchDashboardTokenHolders, fetchDashboardTokenIntro } from 'src/services/_old/dashboard-api';

function Tags(props: BoxProps) {
  return (
    <Box
      {...props}
      sx={{
        ...props.sx,
        '>*:not(:last-of-type)': {
          mr: 1,
        },
      }}
    />
  );
}

// copy from TokenTable
export default function WhalesTable() {
  const numShow = 25;
  // const { data } = useDashboardTokenHolders();
  const data = {
    id: 'binance',
    numberOfHolders: 784742,
    numberOfTopHolders: 500,
    holders: Array(30).fill({
      id: '0xf977814e90da44bfa03b6295a0616a897441acec',
      address: '0xf977814e90da44bfa03b6295a0616a897441acec',
      // "type": "wallet",
      estimatedBalance: 75034499.975,
      ownedBy: '0x1111111111111111111111111111111111111111',
      // "socialNetworks": 'Kathleen_Dav1s',
      socialNetworks: {
        telegram: 'https://t.me/binanceexchange',
        twitter: 'https://twitter.com/binance',
      },
    }),
  };

  const sortedData = useMemo(() => {
    return data.holders
      .sort((a, b) => {
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
            <TableCell>Wallet</TableCell>
            <TableCell>Estimated balance</TableCell>
            <TableCell>Owned by</TableCell>
            <TableCell>Social accounts</TableCell>
            {/*<TableCell>Contract</TableCell>*/}
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
                  {index + 1}
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
              {/*<TableCell>*/}
              {/*  <Typography*/}
              {/*    variant="body1"*/}
              {/*    className="text-truncate"*/}
              {/*    sx={{ textTransform: 'capitalize', maxWidth: 120 }}*/}
              {/*  >*/}
              {/*    {compactNumber(holder.estimatedBalance)}*/}
              {/*  </Typography>*/}
              {/*</TableCell>*/}
              <TableCell>
                <Typography
                  variant="body1"
                  className="text-truncate"
                  sx={{ textTransform: 'capitalize', maxWidth: 120 }}
                >
                  {`$${formatNumber(holder.estimatedBalance)}`}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  variant="body1"
                  className="text-truncate"
                  sx={{ textTransform: 'capitalize', maxWidth: 120 }}
                  color="primary"
                >
                  {formatAddress(holder.ownedBy)}
                </Typography>
              </TableCell>
              <TableCell>
                <Tags>
                  {Object.entries(holder.socialNetworks).map(([name, link]) => (
                    <Chip
                      key={name}
                      label={name}
                      color="secondary"
                      clickable
                      component={'a'}
                      href={link}
                      target={'_blank'}
                      rel="noopener noreferrer"
                      sx={{ textTransform: 'capitalize' }}
                    />
                  ))}
                </Tags>
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
