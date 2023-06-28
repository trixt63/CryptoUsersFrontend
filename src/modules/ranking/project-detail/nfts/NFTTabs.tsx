import { Box, Tab, Theme, useMediaQuery } from '@mui/material';
import { useState } from 'react';
import { StyledRankingTab } from '../../TabCategory';
import ProjectTokens from '../components/ProjectTokens';
import NFTStats from './NFTStats';

export default function NFTTabs() {
  const [activeTab, setActiveTab] = useState<string>('NFTStats');
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const handleTabChange = (_: unknown, tab: string) => {
    setActiveTab(tab);
  };
  return (
    <Box sx={{ mt: 2 }}>
      <StyledRankingTab value={activeTab} variant="scrollable" scrollButtons="auto" onChange={handleTabChange}>
        <Tab value="NFTStats" label={'NFT Stats'} />
        <Tab value="about" label={'About'} />
        {smDown && <Tab value="tokens" label={'Tokens'} />}
      </StyledRankingTab>
      <Box>
        {activeTab === 'NFTStats' && <NFTStats />}
        {activeTab === 'about' && <Box sx={{ mt: 2, color: 'text.secondary' }}>Coming soon...</Box>}
        {smDown && activeTab === 'tokens' && <ProjectTokens />}
      </Box>
    </Box>
  );
}
