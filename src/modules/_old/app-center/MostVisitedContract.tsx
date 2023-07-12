import { Box, IconButton, Skeleton, Typography } from '@mui/material';
import { CHAINS } from '@travalendingpool/connection';
import { formatAddress, formatNumber } from '@travalendingpool/utils';
import Copy from 'src/components/CopyButton/Copy';
import { Link } from 'src/components/primitives/Link';
import { BlockExplorerIcon, EarthIcon } from 'src/icons';
import { useAppSelector } from 'src/redux/hook';
import { ApiMostVisitedContract } from 'src/services/home-api/data-types';
import { HeaderWrapper, ItemWrapper, Wrapper } from './common';
import { useStatus } from './hooks/useStatus';

const MostVisitedContractItem = ({ item, rank }: { item: ApiMostVisitedContract; rank: number }) => {
  const chainId = '0x38';

  return (
    <ItemWrapper>
      <Typography component="div" className="rank">
        {rank}
      </Typography>
      {/* problem with flex overflow https://stackoverflow.com/questions/36230944/prevent-flex-items-from-overflowing-a-container */}
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
      <Typography component="div" sx={{ minWidth: 120, textAlign: 'right' }} fontWeight={500}>
        {formatNumber(item.calls)}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          minWidth: 120,
          justifyContent: 'flex-end',
          pr: 2,
        }}
      >
        {item.url && (
          <IconButton
            size="small"
            LinkComponent={Link}
            href={item.url}
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            <EarthIcon fontSize="small" sx={{ color: 'text.primary' }} />
          </IconButton>
        )}
        <IconButton
          size="small"
          LinkComponent={Link}
          href={`${CHAINS[Number(chainId)].blockExplorerUrls[0]}/address/${item.address}`}
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          <BlockExplorerIcon fontSize="small" sx={{ color: 'text.primary' }} />
        </IconButton>
      </Box>
    </ItemWrapper>
  );
};

const MostVisitedContractItemSkeleton = () => {
  return (
    <ItemWrapper>
      <Box sx={{ px: 1 }}>
        <Skeleton width={32} height={32} variant="circular" />
      </Box>
      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
        <Skeleton width={180} sx={{ mb: 0.25 }} />
        <Skeleton width={100} />
      </Box>
      <Box sx={{ minWidth: 120 }}>
        <Skeleton width={100} />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          minWidth: 120,
        }}
      >
        <Skeleton variant="circular" width={30} height={30} />
      </Box>
    </ItemWrapper>
  );
};

export default function MostVisitedContract() {
  const data = useAppSelector((state) => state.appCenterSlice.mostVisitedContracts);
  const { isLoading, isReady } = useStatus();

  return (
    <Wrapper title="Most Called Contracts" contentSx={{ px: 0, pt: 0 }}>
      <Box className="custom-scrollbar" sx={{ overflow: 'auto' }}>
        <Box sx={{ minWidth: 500 }}>
          <HeaderWrapper sx={{ mb: 1 }}>
            <Typography component="div" variant="body2" sx={{ minWidth: 50, textAlign: 'center' }} className="head">
              #
            </Typography>
            <Typography component="div" variant="body2" sx={{ minWidth: 0, flexGrow: 1 }} className="head">
              Contract
            </Typography>
            <Typography component="div" variant="body2" sx={{ minWidth: 120, textAlign: 'right' }} className="head">
              Called
            </Typography>
            <Typography component="div" variant="body2" sx={{ minWidth: 120 }} className="head" />
          </HeaderWrapper>
          {isLoading && (
            <>
              <MostVisitedContractItemSkeleton />
              <MostVisitedContractItemSkeleton />
              <MostVisitedContractItemSkeleton />
              <MostVisitedContractItemSkeleton />
              <MostVisitedContractItemSkeleton />
            </>
          )}
          {isReady &&
            data.map((item, idx) => {
              return <MostVisitedContractItem key={item.address} item={item} rank={idx + 1} />;
            })}
        </Box>
      </Box>
    </Wrapper>
  );
}
