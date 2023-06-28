import { Box, IconButton, Skeleton, Typography } from '@mui/material';
import { CHAINS } from '@travalendingpool/connection';
import { formatAddress, formatNumber } from '@travalendingpool/utils';
import Copy from 'src/components/CopyButton/Copy';
import { Link } from 'src/components/primitives/Link';
import { BlockExplorerIcon } from 'src/icons';
import { useAppSelector } from 'src/redux/hook';
import { ApiTopToken } from 'src/services/home-api/data-types';
import formatNumberAfterComma from 'src/utils';
import { HeaderWrapper, ItemWrapper, Wrapper } from './common';
import { useStatus } from './hooks/useStatus';

const TopTokensItem = ({ item, rank }: { item: ApiTopToken; rank: number }) => {
  const chainId = '0x38';

  return (
    <ItemWrapper>
      <Typography component="div" className="rank">
        {rank}
      </Typography>
      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
        <Box mb={0.25} sx={{ display: 'flex', alignItems: 'baseline' }}>
          <Typography
            component={Link}
            href={`/visualization?q=${item.address}&chainId=${chainId}`}
            color="text.primary"
            underline="hover"
            className="text-truncate"
          >
            {item.name}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography component="span" variant="small" color="text.secondary" sx={{ mr: 1 }}>
            {formatAddress(item.address)}
          </Typography>
          <Copy
            text={item.address}
            IconProps={{
              sx: {
                fontSize: '0.75rem',
                color: 'text.secondary',
              },
            }}
          />
        </Box>
      </Box>
      <Box sx={{ minWidth: 180 }}>
        <Typography color="text.primary" className="text-truncate" mb={0.25} fontWeight={500}>
          ${formatNumberAfterComma(item.price)}
        </Typography>
        <Typography component="span" variant="small" color="text.secondary">
          MC: ${formatNumber(item.market_cap, { fractionDigits: 2 })}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', minWidth: 120, pr: 2 }}>
        <IconButton
          size="small"
          LinkComponent={Link}
          href={`${CHAINS[Number(chainId)].blockExplorerUrls[0]}/address/${item.address}`}
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          <BlockExplorerIcon sx={{ color: 'text.primary' }} fontSize="small" />
        </IconButton>
      </Box>
    </ItemWrapper>
  );
};

export const TopTokensItemSkeleton = () => {
  return (
    <ItemWrapper>
      <Box sx={{ px: 1 }}>
        <Skeleton width={32} height={32} variant="circular" />
      </Box>
      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
        <Skeleton width={180} sx={{ mb: 0.25 }} />
        <Skeleton width={100} />
      </Box>
      <Box sx={{ minWidth: 180 }}>
        <Skeleton width={'40%'} />
        <Skeleton width={'80%'} />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          minWidth: 120,
          pr: 2,
        }}
      >
        <Skeleton variant="circular" width={30} height={30} />
      </Box>
    </ItemWrapper>
  );
};

export default function TopTokens() {
  const data = useAppSelector((state) => state.appCenterSlice.topTokens);
  const { isLoading, isReady } = useStatus();

  return (
    <Wrapper title="Top Tokens" contentSx={{ px: 0, pt: 0 }}>
      <Box className="custom-scrollbar" sx={{ overflow: 'auto' }}>
        <Box sx={{ minWidth: 500 }}>
          <HeaderWrapper sx={{ mb: 1 }}>
            <Typography component="div" variant="body2" sx={{ minWidth: 50, textAlign: 'center' }} className="head">
              #
            </Typography>
            <Typography component="div" variant="body2" sx={{ minWidth: 0, flexGrow: 1 }} className="head">
              Token
            </Typography>
            <Typography component="div" variant="body2" sx={{ minWidth: 180 }} className="head">
              Price
            </Typography>
            <Typography component="div" variant="body2" sx={{ minWidth: 120 }} className="head" />
          </HeaderWrapper>
          {isLoading && (
            <>
              <TopTokensItemSkeleton />
              <TopTokensItemSkeleton />
              <TopTokensItemSkeleton />
              <TopTokensItemSkeleton />
              <TopTokensItemSkeleton />
            </>
          )}
          {isReady &&
            data.map((item, idx) => {
              return <TopTokensItem key={item.address} item={item} rank={idx + 1} />;
            })}
        </Box>
      </Box>
    </Wrapper>
  );
}
