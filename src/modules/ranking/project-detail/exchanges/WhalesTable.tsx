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
import { useMemo } from 'react';
import { CheckIcon } from 'src/icons';
import { Link } from 'src/components/primitives/Link';
import { getEntityUrl } from 'src/utils';
import {useProjectExchangeWhalesList, useProjectParams} from "src/contexts/project";

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
  const data = useProjectExchangeWhalesList();
  const projectParams = useProjectParams();

  // const sortedData = useMemo(() => {
  //   return data.holders
  //     .sort((a, b) => {
  //       return b.estimatedBalance - a.estimatedBalance;
  //     })
  //     .slice(0, numShow);
  // }, [data]);
  const sortedData = data;

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <StyledTableRow>
            <TableCell>#</TableCell>
            <TableCell>Deposit wallets</TableCell>
            <TableCell>User wallets</TableCell>
            <TableCell>Social accounts</TableCell>
            {/*<TableCell>Contract</TableCell>*/}
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {sortedData?.map((walletsGroup, index: number) => (
            <StyledTableRow
              key={walletsGroup.id}
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
                  {/*index col*/}
                  {index + 1}
                </Typography>
              </TableCell>
              <TableCell>
                {walletsGroup.depositWallets.map((walletAddress: string) => (
                  <Typography
                    variant="body1"
                    className="text-truncate"
                    sx={{ textTransform: 'capitalize', maxWidth: 120 }}
                    color="primary"
                  >
                       <Link variant="body1" underline="hover" href={getEntityUrl('google.com')}>
                        {formatAddress(walletAddress)}
                      </Link>
                  </Typography>
                ))}
              </TableCell>
              <TableCell>
                {walletsGroup.userWallets.map((wallet: string) => (
                  <Typography
                    variant="body1"
                    className="text-truncate"
                    sx={{ textTransform: 'capitalize', maxWidth: 120 }}
                    color="primary"
                  >
                       <Link variant="body1" underline="hover" href={getEntityUrl('google.com')}>
                        {formatAddress(wallet)}
                      </Link>
                  </Typography>
                ))}
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
              {/*<TableCell>*/}
              {/*  <Typography*/}
              {/*    variant="body1"*/}
              {/*    className="text-truncate"*/}
              {/*    sx={{ textTransform: 'capitalize', maxWidth: 120 }}*/}
              {/*  >*/}
              {/*    {`$${formatNumber(walletsGroup.estimatedBalance)}`}*/}
              {/*  </Typography>*/}
              {/*</TableCell>*/}
              {/*<TableCell>*/}
              {/*  <Typography*/}
              {/*    variant="body1"*/}
              {/*    className="text-truncate"*/}
              {/*    sx={{ textTransform: 'capitalize', maxWidth: 120 }}*/}
              {/*    color="primary"*/}
              {/*  >*/}
              {/*    {formatAddress(walletsGroup.ownedBy)}*/}
              {/*  </Typography>*/}
              {/*</TableCell>*/}
              <TableCell>
                <Tags>
                  {Object.entries(walletsGroup.socialNetworks).map(([name, link]) => (
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
