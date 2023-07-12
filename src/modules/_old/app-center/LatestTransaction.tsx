import { Avatar, Box, Skeleton, Typography } from '@mui/material';
import { BN, formatNumber } from '@travalendingpool/utils';
import moment from 'moment';
import { Link } from 'src/components/primitives/Link';
import { useAppSelector } from 'src/redux/hook';
import { ApiTransaction } from 'src/services/home-api/data-types';
import { Wrapper } from './common';
import { useStatus } from './hooks/useStatus';

const TransactionItem = ({ item }: { item: ApiTransaction }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        py: 1.5,
        '&:not(:last-of-type)': {
          borderBottom: '1px solid',
          borderBottomColor: 'secondary.dark',
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', width: '33%', minWidth: 'fit-content', mr: 4 }}>
        <Box sx={{ mr: 2 }}>
          <Avatar variant="circular" sx={{ color: 'text.primary', bgcolor: '#4F607C' }}>
            Tx
          </Avatar>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Link
            href={`/visualization?q=${item.hash}&chainId=${'0x38'}`}
            sx={{
              maxWidth: 150,
              mb: 0.5,
            }}
            className="text-truncate"
            underline="hover"
          >
            {item.hash}
          </Link>
          <Typography color="text.secondary" variant="small">
            {moment(item.block_timestamp * 1000).fromNow()}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexGrow: 1 }}>
        <Box sx={{ mr: 4 }}>
          <Typography variant="body2" className="text-truncate" sx={{ maxWidth: 200 }}>
            From{' '}
            <Link href={`/visualization?q=${item.from_address}&chainId=${'0x38'}`} underline="hover">
              {item.from_address}
            </Link>
          </Typography>
          <Typography variant="body2" className="text-truncate" sx={{ maxWidth: 200 }}>
            To{' '}
            <Link href={`/visualization?q=${item.to_address}&chainId=${'0x38'}`} underline="hover">
              {item.to_address}
            </Link>
          </Typography>
        </Box>
        <Box>
          {/* <Box
            sx={{
              bgcolor: 'grey.800',
              pl: 2.5,
              pr: 1,
              py: 0.25,
              borderRadius: '0px 4px 4px 0px',
              position: 'relative',
              '&::after': {
                position: 'absolute',
                content: '""',
                top: 0,
                left: 0,
                // bottom: 0,
                borderTop: '11.82px solid transparent',
                borderBottom: '11.82px solid transparent',
                borderLeft: '11.82px solid',
                borderLeftColor: 'background.default',
              },
            }}
          >
          </Box> */}
          <Typography component="span" variant="body2" sx={{ whiteSpace: 'nowrap', fontWeight: 500 }}>
            {formatNumber(BN(item.value).div(1e18), { fractionDigits: 5 })} BNB
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

const TransactionItemSkeleton = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        py: 1.5,
        '&:not(:last-of-type)': {
          borderBottom: '1px solid',
          borderBottomColor: 'grey.900',
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', width: '33%', minWidth: 'fit-content', mr: 4 }}>
        <Box sx={{ mr: 2 }}>
          <Avatar variant="circular" sx={{ color: 'text.primary', bgcolor: '#4F607C' }}>
            Tx
          </Avatar>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Skeleton width={150} />
          <Skeleton width={50} />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexGrow: 1 }}>
        <Box sx={{ mr: 4 }}>
          <Skeleton width={200} />
          <Skeleton width={200} />
        </Box>
        <Box>
          <Skeleton width={50} />
        </Box>
      </Box>
    </Box>
  );
};

export default function LatestTransaction() {
  const data = useAppSelector((state) => state.appCenterSlice.latestTxs);
  const { isLoading, isReady } = useStatus();

  return (
    <Wrapper title="Latest Transactions">
      <Box
        sx={{
          maxHeight: 400,
          overflow: 'auto',
          pr: 1,
          mr: -1,
        }}
        className="custom-scrollbar"
      >
        {isLoading && (
          <>
            <TransactionItemSkeleton />
            <TransactionItemSkeleton />
            <TransactionItemSkeleton />
            <TransactionItemSkeleton />
            <TransactionItemSkeleton />
            <TransactionItemSkeleton />
          </>
        )}
        {isReady &&
          data.map((item) => {
            return <TransactionItem key={item.hash} item={item} />;
          })}
      </Box>
    </Wrapper>
  );
}
