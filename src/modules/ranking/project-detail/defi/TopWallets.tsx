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
import { Link } from 'src/components/primitives/Link';
import { getEntityUrl } from 'src/utils';
import { useProjectDexWalletsList, useProjectParams } from 'src/contexts/project';

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
export default function TopWallets() {
  const numShow = 25;
  const data = useProjectDexWalletsList();
  const projectParams = useProjectParams();

  const sortedData = data;

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <StyledTableRow>
            <TableCell>#</TableCell>
            <TableCell>Trader wallets</TableCell>
            {/*<TableCell>Social accounts</TableCell>*/}
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {sortedData?.map((wallet, index: number) => (
            <StyledTableRow
              key={wallet.id}
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
                <Typography
                  variant="body1"
                  className="text-truncate"
                  sx={{ textTransform: 'capitalize', maxWidth: 120 }}
                  color="primary"
                >
                  {/*<Link variant="body1" underline="hover" href={getEntityUrl('google.com')}>*/}
                  <Link underline="hover" href="https://google.com">
                    {formatAddress(wallet.address)}
                  </Link>
                </Typography>
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
