import { styled, Tab, Tabs as MuiTabs } from '@mui/material';
import { Link } from 'src/components/primitives/Link';

export const StyledRankingTab = styled(MuiTabs)(({ theme }) => ({
  '.MuiTab-root': {
    fontSize: theme.typography.subtitle1.fontSize,
    fontWeight: 500,
    py: 1.5,
    color: theme.palette.secondary.main,
    '&.Mui-selected': {
      color: theme.palette.primary.main,
      fontWeight: 700,
    },
  },
  '.MuiTabs-indicator': {
    background: 'linear-gradient(to right, #EDF8FF, #469DD6)',
    height: 4,
    borderRadius: '16px',
  },
}));

export type RankingCategory = 'defi' | 'nfts' | 'tokens' | 'spots' | 'derivatives';

export default function TabCategory({ active }: { active: RankingCategory }) {
  return (
    <StyledRankingTab
      value={active}
      variant="scrollable"
      scrollButtons="auto"
      aria-label="Ranking tabs DeFi, NFTs, Tokens, Spot, Derivatives"
    >
      <Tab value="defi" label="DeFi" href="/ranking/defi" LinkComponent={Link} />
      <Tab value="nfts" label="NFTs" href="/ranking/nfts" LinkComponent={Link} />
      <Tab value="tokens" label="Tokens" href="/ranking/tokens" LinkComponent={Link} />
      <Tab value="spots" label="Spots" href="/ranking/spots" LinkComponent={Link} />
      <Tab value="derivatives" label="Derivatives" href="/ranking/derivatives" LinkComponent={Link} />
    </StyledRankingTab>
  );
}
