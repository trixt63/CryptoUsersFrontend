import {
  Avatar,
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
import { chainSelectConfigs } from 'src/configs/networkConfig';
import { useDashboardContractTransactions } from 'src/contexts/dashboard';
import { StyledTableRow } from '../../shared/table';
import { utcFormat } from '../../utils';

export default function TxsTable() {
  const { data } = useDashboardContractTransactions();
  // const { set, get } = useSearchParams();

  // const [page, setPage] = useState(1);
  // const page = Number(get('page') ?? 1);
  // const [pageSize] = useState(25);
  // const pageCount = Math.ceil(data.numberOfTransactions / pageSize);

  // const from = (page - 1) * pageSize;
  // const to = page * pageSize;

  // const showTxs = useMemo(() => {
  //   return data.transactions.slice(from, to);
  // }, [data.transactions, from, to]);

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <StyledTableRow>
              <TableCell>Chain</TableCell>
              <TableCell>Tx Hash</TableCell>
              <TableCell>Method</TableCell>
              <TableCell>Timestamp</TableCell>
              <TableCell>From</TableCell>
              <TableCell>To</TableCell>
              <TableCell>Value</TableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {data.transactions.map((tx) => (
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
                  {/* <Typography variant="body1">{chainSelectConfigs[tx.chain].name}</Typography> */}
                  <Tooltip title={chainSelectConfigs[tx.chain].name}>
                    <Avatar
                      sx={{ width: 28, height: 28 }}
                      src={chainSelectConfigs[tx.chain].img}
                      alt={chainSelectConfigs[tx.chain].name}
                    />
                  </Tooltip>
                </TableCell>
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
                    <Typography
                      variant="body1"
                      className="text-truncate"
                      sx={{ textTransform: 'capitalize', maxWidth: 120 }}
                    >
                      {tx.method}
                    </Typography>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Tooltip title={utcFormat(tx.timestamp * 1000)}>
                    <Typography variant="body1">{moment(tx.timestamp * 1000).fromNow()}</Typography>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Link variant="body1" underline="hover" href={`/${tx.from.type}/${tx.from.id}`}>
                    {formatAddress(tx.fromAddress)}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link variant="body1" underline="hover" href={`/${tx.to.type}/${tx.to.id}`}>
                    {formatAddress(tx.toAddress)}
                  </Link>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={500} variant="body1">
                    {formatNumber(tx.value, { fractionDigits: 6 })} BNB
                  </Typography>
                </TableCell>
              </StyledTableRow>
            ))}
            {data.transactions.length === 0 && (
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
      {/* <Box
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
          {from + 1}-{to} of {data.numberOfTransactions}
        </Typography>
        <Pagination
          variant="text"
          shape="rounded"
          page={page}
          count={pageCount}
          onChange={(_, page) => {
            // setPage(page);
            set('page', String(page));
            // set('pageSize', String(pageSize));
          }}
          showFirstButton
          showLastButton
          size="small"
          color="primary"
          siblingCount={0}
          boundaryCount={1}
          // sx={{
          //   '.MuiPaginationItem-root': {
          //     // color: 'text.secondary',
          //     '&.Mui-selected': {
          //       backgroundColor: '#183A52',
          //     },
          //   },
          // }}
        />
      </Box> */}
    </>
  );
}
